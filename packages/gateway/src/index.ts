// The single model gateway (requirements D7, adr-001). The only package allowed to import
// model SDKs (enforced by .dependency-cruiser.cjs). Implements the engine's ModelPort.
import type { ModelPort, ModelRequest, ModelResponse } from "@aag/engine";
import { anthropic } from "@ai-sdk/anthropic";
import { mistral } from "@ai-sdk/mistral";
import { openai } from "@ai-sdk/openai";
import { Output, generateText, jsonSchema, type LanguageModel } from "ai";

export const PROVIDERS = ["anthropic", "openai", "mistral"] as const;
export type Provider = (typeof PROVIDERS)[number];

export interface GatewayConfig {
  readonly provider: Provider;
  /** Pinned model id, e.g. "claude-sonnet-5-5". Pinning keeps verdicts stable (D13). */
  readonly modelId: string;
}

/** Reads the gateway config from the environment (AAG_MODEL_PROVIDER, AAG_MODEL_ID). */
export function configFromEnv(env: Readonly<Record<string, string | undefined>>): GatewayConfig {
  const provider = env.AAG_MODEL_PROVIDER;
  const modelId = env.AAG_MODEL_ID;
  if (!provider || !isProvider(provider)) {
    throw new Error(
      `AAG_MODEL_PROVIDER must be one of ${PROVIDERS.join(", ")}; got "${provider ?? ""}"`,
    );
  }
  if (!modelId) {
    throw new Error("AAG_MODEL_ID must name a pinned model id");
  }
  return { provider, modelId };
}

export function isProvider(value: string): value is Provider {
  return (PROVIDERS as readonly string[]).includes(value);
}

function languageModel(config: GatewayConfig): LanguageModel {
  switch (config.provider) {
    case "anthropic":
      return anthropic(config.modelId);
    case "openai":
      return openai(config.modelId);
    case "mistral":
      return mistral(config.modelId);
  }
}

/** Creates the ModelPort the engine uses. Temperature 0 for repeatable verdicts (D13.4). */
export function createModelGateway(config: GatewayConfig): ModelPort {
  const model = languageModel(config);
  return {
    async complete(request: ModelRequest): Promise<ModelResponse> {
      const result = await generateText({
        model,
        system: request.system,
        prompt: request.prompt,
        temperature: 0,
        output: Output.object({ schema: jsonSchema(request.jsonSchema) }),
      });
      return {
        json: result.output,
        model: `${config.provider}:${config.modelId}`,
        usage: {
          inputTokens: result.usage.inputTokens ?? 0,
          outputTokens: result.usage.outputTokens ?? 0,
        },
      };
    },
  };
}
