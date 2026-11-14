// Scripted-customer runner (T-002 C8, requirements D15): answers the engine's questions from a
// script keyed by fact id, so the adaptive flow can be tested end to end.
import { nextStep, type AssessmentResult } from "./assessment";
import type { Answers } from "./facts";

export class UnscriptedQuestionError extends Error {
  constructor(factId: string) {
    super(`The engine asked "${factId}", which the script does not answer`);
    this.name = "UnscriptedQuestionError";
  }
}

export interface ScriptedRun {
  readonly questionsAsked: readonly string[];
  readonly result: AssessmentResult;
}

export function runScripted(script: Answers): ScriptedRun {
  const answers: Record<string, string> = {};
  const questionsAsked: string[] = [];
  for (;;) {
    const step = nextStep(answers);
    if (step.kind === "result") return { questionsAsked, result: step.result };
    const value = script[step.fact.id];
    if (value === undefined) throw new UnscriptedQuestionError(step.fact.id);
    questionsAsked.push(step.fact.id);
    answers[step.fact.id] = value;
  }
}
