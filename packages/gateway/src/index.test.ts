import { describe, expect, it } from "vitest";
import { PROVIDERS, configFromEnv } from "./index.js";

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
      /AAG_MODEL_PROVIDER must be one of anthropic, openai, mistral/,
    );
  });

  it("rejects a missing model id, so the model is always pinned", () => {
    expect(() => configFromEnv({ AAG_MODEL_PROVIDER: "openai" })).toThrow(/AAG_MODEL_ID/);
  });
});
