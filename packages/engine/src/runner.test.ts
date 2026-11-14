// T-002 C8: the scripted-customer runner (requirements D15).
import { describe, expect, it } from "vitest";
import { UnscriptedQuestionError, runScripted } from "./runner";
import { SCENARIOS } from "./scenarios";

describe("runScripted (C8)", () => {
  it("records every question asked, in order, and ends with a result", () => {
    const scenario = SCENARIOS.find((s) => s.id === "S2");
    if (!scenario) throw new Error("S2 missing");
    const run = runScripted(scenario.facts);
    expect(run.questionsAsked).toEqual([
      "usesAi",
      "role",
      "interaction",
      "writesOwnText",
      "onMarketBeforeAug2026",
    ]);
    expect(run.result.legalContentVersion).toBe("2026.11");
    expect(run.result.obligations.length).toBeGreaterThan(0);
  });

  it("throws when the engine asks a fact the script does not answer", () => {
    expect(() => runScripted({ usesAi: "yes" })).toThrow(UnscriptedQuestionError);
    expect(() => runScripted({ usesAi: "yes" })).toThrow(/role/);
  });

  it("gives identical output for the same script, every time", () => {
    for (const scenario of SCENARIOS) {
      expect(runScripted(scenario.facts), scenario.id).toEqual(runScripted(scenario.facts));
    }
  });
});
