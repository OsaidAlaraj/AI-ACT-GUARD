# packages/gateway — the model gateway

**Responsibility:** implement the engine's `ModelPort` for Anthropic, OpenAI and Mistral through the
Vercel AI SDK (requirements D7). The only package allowed to import `ai` or `@ai-sdk/*`
(dependency-cruiser enforces it).

**Belongs here:** provider selection from `AAG_MODEL_PROVIDER` / `AAG_MODEL_ID`, structured output,
usage and cost accounting, retries and timeouts, call and spend caps for harness runs. **Does not:**
legal logic, prompt wording decisions (the engine owns what is asked), storage.

**Change warnings:**

- Model ids are pinned; never default to "latest". Stable verdicts depend on it (D13.4).
- Temperature stays 0 for engine calls.
- Before Phase 1 this package moves to the EU routes (D7 table); keep provider details here so that
  move touches nothing else.
- Unit tests never call a real provider; real calls happen only in the runtime harness with its caps
  (adr-002).
