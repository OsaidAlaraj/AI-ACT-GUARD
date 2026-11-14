// T-001 C2, C3, C7, C9: the engine chooses the next question and marks unassessed steps.
import { describe, expect, it } from "vitest";
import { nextStep } from "./assessment";
import { FACTS, type Answers } from "./facts";
import { findBannedWording } from "./legal-test";
import { evaluateRules, resultKey } from "./rules";
import { runScripted } from "./runner";
import { SCENARIOS } from "./scenarios";

/** Every complete answer path through nextStep, each with the facts it asked. */
function allPaths(): { answers: Answers; asked: string[] }[] {
  const done: { answers: Answers; asked: string[] }[] = [];
  const walk = (answers: Answers, asked: string[]) => {
    const step = nextStep(answers);
    if (step.kind === "result") {
      done.push({ answers, asked });
      return;
    }
    for (const option of step.fact.options) {
      walk({ ...answers, [step.fact.id]: option.value }, [...asked, step.fact.id]);
    }
  };
  walk({}, []);
  return done;
}

function canChange(answers: Answers, factId: string): boolean {
  const fact = FACTS.find((f) => f.id === factId);
  if (!fact) throw new Error(`unknown fact ${factId}`);
  const baseline = resultKey(evaluateRules(answers));
  return fact.options
    .filter((o) => o.value !== answers[factId])
    .some((o) => resultKey(evaluateRules({ ...answers, [factId]: o.value })) !== baseline);
}

describe("nextStep", () => {
  it("asks whether the tool uses AI first (C2)", () => {
    const step = nextStep({});
    expect(step.kind).toBe("question");
    expect(step.kind === "question" && step.fact.id).toBe("usesAi");
  });

  it("asks exactly the scenario's facts, in catalogue order (C3)", () => {
    for (const scenario of SCENARIOS) {
      const { questionsAsked } = runScripted(scenario.facts);
      expect(questionsAsked, scenario.id).toEqual(Object.keys(scenario.facts));
    }
  });

  it("on every possible answer path: each question is relevant when asked, in catalogue order, never twice (C3)", () => {
    const order = FACTS.map((f) => f.id);
    const paths = allPaths();
    expect(paths.length).toBeGreaterThan(100);
    for (const { answers, asked } of paths) {
      const label = JSON.stringify(answers);
      expect(new Set(asked).size, label).toBe(asked.length);
      const positions = asked.map((id) => order.indexOf(id));
      expect(
        positions.every((p, i) => i === 0 || p > (positions[i - 1] ?? -1)),
        label,
      ).toBe(true);
      // Relevant when asked: given only the answers before it, at least two options differ.
      asked.forEach((factId, index) => {
        const before: Record<string, string> = {};
        for (const earlier of asked.slice(0, index)) {
          const value = answers[earlier];
          if (value !== undefined) before[earlier] = value;
        }
        expect(canChange(before, factId), `${label}: "${factId}" not relevant when asked`).toBe(
          true,
        );
      });
    }
  });

  it("produces no banned wording on any answer path (C7)", () => {
    for (const { answers } of allPaths()) {
      for (const obligation of evaluateRules(answers)) {
        expect(findBannedWording(obligation.reason), obligation.reason).toEqual([]);
        if (obligation.vendorQuestion) {
          expect(findBannedWording(obligation.vendorQuestion)).toEqual([]);
        }
      }
    }
  });

  it("offers 'I don't know' on every question", () => {
    for (const fact of FACTS) {
      expect(
        fact.options.map((o) => o.value),
        fact.id,
      ).toContain("unknown");
    }
  });

  it("marks unassessed steps, never judges them (C9)", () => {
    for (const scenario of SCENARIOS) {
      const { result } = runScripted(scenario.facts);
      for (const id of ["prohibited", "high-risk", "exemption"]) {
        const step = result.steps.find((s) => s.step === id);
        expect(step, `${scenario.id} ${id}`).toEqual({ step: id, status: "not-assessed" });
      }
      for (const id of ["role", "transparency", "literacy"]) {
        const step = result.steps.find((s) => s.step === id);
        expect(step?.status, `${scenario.id} ${id}`).toBe("assessed");
      }
      expect(
        result.obligations.every((o) => o.step === "transparency" || o.step === "literacy"),
      ).toBe(true);
    }
  });
});
