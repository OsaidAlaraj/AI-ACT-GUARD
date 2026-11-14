// In-memory LegalKnowledgePort (T-002 C1). The db adapter can replace it with no engine change.
import type { LegalKnowledgePort, Provision } from "../ports";

export function createInMemoryKnowledge(
  provisions: readonly Provision[],
  version: string,
): LegalKnowledgePort {
  const byId = new Map(provisions.map((provision) => [provision.id, provision] as const));
  return {
    version: () => Promise.resolve(version),
    getProvision: (id) => Promise.resolve(byId.get(id)),
  };
}
