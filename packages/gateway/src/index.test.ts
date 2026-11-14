import { describe, expect, it } from "vitest";
import { MockLanguageModelV4 } from "ai/test";
import {
  PROVIDERS,
  configFromEnv,
  createModelGatewayFor,
  resolveLanguageModel,
  type GatewayConfig,
} from "./index";

describe("configFromEnv", () => {
  it("accepts each supported provider with a pinned model id", () => {
    for (const provider of PROVIDERS) {
      expect(configFromEnv({ AAG_MODEL_PROVIDER: provider, AAG_MODEL_ID: "m-1" })).toEqual({
        provider,
        modelId: "m-1",
      });
    }
  });

  it("rejects an unknown provider instead of silently picking one", () => {
    expect(() => configFromEnv({ AAG_MODEL_PROVIDER: "gemini", AAG_MODEL_ID: "m-1" })).toThrow(
      'AAG_MODEL_PROVIDER must be one of anthropic, openai, mistral; got "gemini"',
    );
  });

  it("names a missing provider as empty, not as 'undefined'", () => {
    expect(() => configFromEnv({ AAG_MODEL_ID: "m-1" })).toThrow('got ""');
  });

  it("rejects a missing model id, so the model is always pinned", () => {
    expect(() => configFromEnv({ AAG_MODEL_PROVIDER: "openai" })).toThrow(/AAG_MODEL_ID/);
  });
});

describe("resolveLanguageModel", () => {
  it("maps each provider to that provider's model with the pinned id", () => {
    for (const provider of PROVIDERS) {
      const model = resolveLanguageModel({ provider, modelId: "pinned-1" });
      if (typeof model === "string") throw new Error("expected a model object");
      expect(model.modelId).toBe("pinned-1");
      expect(model.provider.startsWith(provider)).toBe(true);
    }
  });
});

describe("createModelGatewayFor", () => {
  const config: GatewayConfig = { provider: "anthropic", modelId: "pinned-1" };

  function mockModel(text: string) {
    return new MockLanguageModelV4({
      doGenerate: {
        content: [{ type: "text", text }],
        finishReason: { unified: "stop", raw: "stop" },
        usage: {
          inputTokens: { total: 120, noCache: 120, cacheRead: 0, cacheWrite: 0 },
          outputTokens: { total: 30, text: 30, reasoning: 0 },
        },
        warnings: [],
      },
    });
  }

  const request = {
    system: "Classify the tool.",
    prompt: "<data>website text</data>",
    jsonSchema: {
      type: "object",
      properties: { verdict: { type: "string" } },
      required: ["verdict"],
      additionalProperties: false,
    },
    purpose: "verdict",
  };

  it("returns the parsed JSON, the pinned model label and token usage", async () => {
    const model = mockModel('{"verdict":"applies"}');
    const response = await createModelGatewayFor(model, config).complete(request);
    expect(response).toEqual({
      json: { verdict: "applies" },
      model: "anthropic:pinned-1",
      usage: { inputTokens: 120, outputTokens: 30 },
    });
  });

  it("sends instructions as system, keeps data in the prompt, and uses temperature 0", async () => {
    const model = mockModel('{"verdict":"applies"}');
    await createModelGatewayFor(model, config).complete(request);
    const call = model.doGenerateCalls[0];
    expect(call?.temperature).toBe(0);
    const system = call?.prompt.find((message) => message.role === "system");
    expect(system?.content).toBe("Classify the tool.");
    expect(JSON.stringify(call?.prompt)).toContain("<data>website text</data>");
  });

  it("rejects a response that does not match the schema instead of passing it on", async () => {
    const model = mockModel('{"score":7}');
    await expect(createModelGatewayFor(model, config).complete(request)).rejects.toThrow(
      /Model response for "verdict" does not match its schema/,
    );
  });

  it("reports zero tokens when the provider gives no usage numbers", async () => {
    const model = new MockLanguageModelV4({
      doGenerate: {
        content: [{ type: "text", text: '{"verdict":"applies"}' }],
        finishReason: { unified: "stop", raw: "stop" },
        usage: {
          inputTokens: {
            total: undefined,
            noCache: undefined,
            cacheRead: undefined,
            cacheWrite: undefined,
          },
          outputTokens: { total: undefined, text: undefined, reasoning: undefined },
        },
        warnings: [],
      },
    });
    const response = await createModelGatewayFor(model, config).complete(request);
    expect(response.usage).toEqual({ inputTokens: 0, outputTokens: 0 });
  });
});
