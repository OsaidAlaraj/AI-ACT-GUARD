// Ports: the interfaces the core needs from the outside world (adr-001).
// Adapters implement them (packages/gateway, packages/db). The core never imports an adapter.

/** A request for one structured model response. Settings are fixed so verdicts are stable (D13). */
export interface ModelRequest {
  /** Instructions for the model. Untrusted text (websites, documents, answers) never goes here. */
  readonly system: string;
  /** The task, with untrusted material clearly delimited as data. */
  readonly prompt: string;
  /** JSON Schema the response must satisfy. */
  readonly jsonSchema: Readonly<Record<string, unknown>>;
  /** Short label for logs and cost tracking, e.g. "next-question" or "verdict". */
  readonly purpose: string;
}

export interface ModelUsage {
  readonly inputTokens: number;
  readonly outputTokens: number;
}

export interface ModelResponse {
  /** Parsed JSON, validated against the request's schema by the adapter. */
  readonly json: unknown;
  /** Provider and model that produced it, recorded in the report's small print (D5). */
  readonly model: string;
  readonly usage: ModelUsage;
}

/** The single gateway to every AI model (requirements D7). */
export interface ModelPort {
  complete(request: ModelRequest): Promise<ModelResponse>;
}

/** One provision in the versioned legal knowledge base (D13.2). */
export interface Provision {
  /** Stable id, e.g. "AIA-Art50-1" or "AIA-AnnexIII-4". */
  readonly id: string;
  readonly title: string;
  readonly text: string;
  readonly binding: boolean;
  /** ISO date the obligation applies from, if it has one. */
  readonly appliesFrom?: string;
  readonly sourceUrl: string;
}

/** The engine cites only from here, never from model memory (D13.2). */
export interface LegalKnowledgePort {
  /** Legal-content version printed on every report, e.g. "2026.11". */
  version(): Promise<string>;
  getProvision(id: string): Promise<Provision | undefined>;
}
