// The engine chooses the next question (T-002, adr-004). Relevance is derived from the rules:
// a fact is asked only if, given the answers so far, at least two of its options change a result.
import { FACTS, type Answers, type Fact } from "./facts";
import { LEGAL_CONTENT_VERSION } from "./knowledge/aia-2026-11";
import { LEGAL_TEST_STEPS, type LegalTestStep } from "./legal-test";
import { evaluateRules, resultKey, type ObligationResult } from "./rules";

export interface StepResult {
  readonly step: LegalTestStep;
  readonly status: "assessed" | "not-assessed";
}

export interface AssessmentResult {
  readonly legalContentVersion: string;
  readonly steps: readonly StepResult[];
  readonly obligations: readonly ObligationResult[];
}

export type NextStep =
  | { readonly kind: "question"; readonly fact: Fact }
  | { readonly kind: "result"; readonly result: AssessmentResult };

/**
 * What this version does with each legal-test step. A Record over `LegalTestStep`, so a step added
 * to `LEGAL_TEST_STEPS` fails to compile until it is classified here, never defaulting to assessed.
 * Prohibited practices, high-risk classification and exemptions are outside T-002's scope: they
 * are marked not assessed, never given a verdict.
 */
export const STEP_STATUS: Readonly<Record<LegalTestStep, StepResult["status"]>> = {
  start: "assessed",
  prohibited: "not-assessed",
  role: "assessed",
  "high-risk": "not-assessed",
  exemption: "not-assessed",
  transparency: "assessed",
  literacy: "assessed",
  verdict: "assessed",
};

/** An answer names a fact the engine does not hold, or a value that is not one of its options. */
export class InvalidAnswerError extends Error {
  constructor(
    readonly factId: string,
    readonly value: string,
  ) {
    super(`"${value}" is not an option of fact "${factId}"`);
    this.name = "InvalidAnswerError";
  }
}

/** Fails closed: an unrecognised value would otherwise read as answered yet match no rule. */
function assertValidAnswers(answers: Answers): void {
  for (const [factId, value] of Object.entries(answers)) {
    if (value === undefined) continue;
    const fact = FACTS.find((f) => f.id === factId);
    if (!fact?.options.some((o) => o.value === value)) throw new InvalidAnswerError(factId, value);
  }
}

function isRelevant(answers: Answers, fact: Fact): boolean {
  const results = new Set(
    fact.options.map((option) => resultKey(evaluateRules({ ...answers, [fact.id]: option.value }))),
  );
  return results.size >= 2;
}

export function nextStep(answers: Answers): NextStep {
  assertValidAnswers(answers);
  const fact = FACTS.find((f) => answers[f.id] === undefined && isRelevant(answers, f));
  if (fact) return { kind: "question", fact };
  return {
    kind: "result",
    result: {
      legalContentVersion: LEGAL_CONTENT_VERSION,
      steps: LEGAL_TEST_STEPS.map((step) => ({ step, status: STEP_STATUS[step] })),
      obligations: evaluateRules(answers),
    },
  };
}
