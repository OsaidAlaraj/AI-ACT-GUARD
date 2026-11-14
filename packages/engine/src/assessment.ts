// The engine chooses the next question (T-002, adr-004). Relevance is derived from the rules:
// a fact is asked only if, given the answers so far, at least two of its options change a result.
import { FACTS, type Answers, type Fact } from "./facts";
import { LEGAL_CONTENT_VERSION } from "./knowledge/aia-2026-11";
import { LEGAL_TEST_STEPS, type LegalTestStep } from "./legal-test";
import { evaluateRules, resultKey, type ObligationResult } from "./rules";

export type StepResult =
  | { readonly step: LegalTestStep; readonly status: "not-assessed" }
  | { readonly step: LegalTestStep; readonly status: "assessed" };

export interface AssessmentResult {
  readonly legalContentVersion: string;
  readonly steps: readonly StepResult[];
  readonly obligations: readonly ObligationResult[];
}

export type NextStep =
  | { readonly kind: "question"; readonly fact: Fact }
  | { readonly kind: "result"; readonly result: AssessmentResult };

/** Steps this version does not assess; they are marked, never given a verdict. */
const NOT_ASSESSED: readonly LegalTestStep[] = ["prohibited", "high-risk", "exemption"];

function isRelevant(answers: Answers, fact: Fact): boolean {
  const results = new Set(
    fact.options.map((option) => resultKey(evaluateRules({ ...answers, [fact.id]: option.value }))),
  );
  return results.size >= 2;
}

export function nextStep(answers: Answers): NextStep {
  const fact = FACTS.find((f) => answers[f.id] === undefined && isRelevant(answers, f));
  if (fact) return { kind: "question", fact };
  return {
    kind: "result",
    result: {
      legalContentVersion: LEGAL_CONTENT_VERSION,
      steps: LEGAL_TEST_STEPS.map((step) =>
        NOT_ASSESSED.includes(step)
          ? { step, status: "not-assessed" as const }
          : { step, status: "assessed" as const },
      ),
      obligations: evaluateRules(answers),
    },
  };
}
