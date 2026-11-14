// Public API of the hexagonal core (adr-001). Other packages import only from here.
export type {
  LegalKnowledgePort,
  ModelPort,
  ModelRequest,
  ModelResponse,
  ModelUsage,
  Provision,
} from "./ports";
export {
  BANNED_WORDING,
  LEGAL_TEST_STEPS,
  findBannedWording,
  type LegalTestStep,
  type Role,
  type StepVerdict,
} from "./legal-test";
export { FACTS, type Answers, type Fact, type FactOption } from "./facts";
export {
  RULES,
  evaluateRules,
  resultKey,
  type ObligationResult,
  type Rule,
  type RuleId,
} from "./rules";
export {
  STEP_STATUS,
  nextStep,
  type AssessmentResult,
  type NextStep,
  type StepResult,
} from "./assessment";
export { UnscriptedQuestionError, runScripted, type ScriptedRun } from "./runner";
export { SCENARIOS, type Scenario } from "./scenarios";
export { createInMemoryKnowledge } from "./knowledge/in-memory";
export { LEGAL_CONTENT_VERSION, PROVISIONS_2026_11 } from "./knowledge/aia-2026-11";
