// T-001 C4–C7: verdicts follow the law and the guidance, cite only the knowledge base, and use no
// banned wording.
import { describe, expect, it } from "vitest";
import { LEGAL_CONTENT_VERSION, PROVISIONS_2026_11 } from "./knowledge/aia-2026-11";
import { createInMemoryKnowledge } from "./knowledge/in-memory";
import { FACTS } from "./facts";
import { findBannedWording } from "./legal-test";
import { RULES, evaluateRules } from "./rules";
import { runScripted } from "./runner";
import { SCENARIOS, type RuleId } from "./scenarios";

describe("scenario table (C4, C5)", () => {
  for (const scenario of SCENARIOS) {
    it(`${scenario.id}: ${scenario.title}`, () => {
      const obligations = evaluateRules(scenario.facts);
      for (const [ruleId, expected] of Object.entries(scenario.expected)) {
        const actual = obligations.find((o) => o.ruleId === (ruleId as RuleId));
        expect(actual, `${scenario.id} ${ruleId}`).toBeDefined();
        expect(actual?.verdict, `${scenario.id} ${ruleId} verdict`).toBe(expected.verdict);
        expect(actual?.appliesFrom, `${scenario.id} ${ruleId} appliesFrom`).toBe(
          expected.appliesFrom,
        );
        expect(actual?.missingFacts, `${scenario.id} ${ruleId} missingFacts`).toEqual(
          expected.missingFacts ?? [],
        );
      }
    });
  }

  it("gives Article 4 its current-wording date when it applies", () => {
    const art4 = evaluateRules({ role: "deployer", usesAi: "yes" }).find(
      (o) => o.ruleId === "Art4",
    );
    expect(art4?.currentTextFrom).toBe("2026-07-27");
  });

  it("tells a deployer that Article 50(1) is the provider's duty and gives a vendor question", () => {
    const rule = evaluateRules({ role: "deployer", usesAi: "yes" }).find(
      (o) => o.ruleId === "50-1",
    );
    expect(rule?.verdict).toBe("does-not-apply");
    expect(rule?.reason).toMatch(/provider/i);
    expect(rule?.vendorQuestion?.length ?? 0).toBeGreaterThan(20);
  });

  it("covers every rule in every scenario", () => {
    const ruleIds = RULES.map((r) => r.id).sort();
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.expected).sort(), scenario.id).toEqual(ruleIds);
    }
  });
});

describe("citations (C6)", () => {
  it("every citable provision resolves in the knowledge base", async () => {
    const kb = createInMemoryKnowledge(PROVISIONS_2026_11, LEGAL_CONTENT_VERSION);
    const cited = new Set(RULES.flatMap((rule) => rule.provisionIds));
    expect(cited.size).toBeGreaterThan(0);
    for (const id of cited) {
      expect(await kb.getProvision(id), id).toBeDefined();
    }
  });

  it("every obligation in a result carries its rule's citations", () => {
    for (const scenario of SCENARIOS) {
      for (const obligation of runScripted(scenario.facts).result.obligations) {
        const rule = RULES.find((r) => r.id === obligation.ruleId);
        expect(obligation.citations, `${scenario.id} ${obligation.ruleId}`).toEqual(
          rule?.provisionIds,
        );
      }
    }
  });
});

describe("unknown answers give can't tell yet, never a guess (C5)", () => {
  const verdictOf = (answers: Record<string, string>, ruleId: RuleId) =>
    evaluateRules(answers).find((o) => o.ruleId === ruleId);

  const cases: {
    name: string;
    answers: Record<string, string>;
    rule: RuleId;
    missing: string[];
  }[] = [
    {
      name: "emotion recognition, role unknown",
      answers: { usesAi: "yes", role: "unknown", emotionOrBiometric: "yes" },
      rule: "50-3",
      missing: ["role"],
    },
    {
      name: "emotion recognition, AI unknown",
      answers: { usesAi: "unknown", role: "deployer", emotionOrBiometric: "yes" },
      rule: "50-3",
      missing: ["usesAi"],
    },
    {
      name: "emotion recognition, the fact itself unknown",
      answers: { usesAi: "yes", role: "deployer", emotionOrBiometric: "unknown" },
      rule: "50-3",
      missing: ["emotionOrBiometric"],
    },
    {
      name: "deepfake, role unknown",
      answers: { usesAi: "yes", role: "unknown", deepfake: "yes" },
      rule: "50-4a",
      missing: ["role"],
    },
    {
      name: "public-interest text, editorial control unknown",
      answers: {
        usesAi: "yes",
        role: "deployer",
        publicInterestText: "yes",
        humanEditorialControl: "unknown",
      },
      rule: "50-4b",
      missing: ["humanEditorialControl"],
    },
    {
      name: "public-interest text, role unknown",
      answers: {
        usesAi: "yes",
        role: "unknown",
        publicInterestText: "yes",
        humanEditorialControl: "no",
      },
      rule: "50-4b",
      missing: ["role"],
    },
    {
      name: "public-interest text, AI unknown",
      answers: {
        usesAi: "unknown",
        role: "deployer",
        publicInterestText: "yes",
        humanEditorialControl: "no",
      },
      rule: "50-4b",
      missing: ["usesAi"],
    },
    {
      name: "staff tool, obviousness unknown",
      answers: {
        usesAi: "yes",
        role: "provider",
        interaction: "staff-direct",
        aiObvious: "unknown",
      },
      rule: "50-1",
      missing: ["aiObvious"],
    },
    {
      name: "Article 4, AI unknown",
      answers: { usesAi: "unknown", role: "deployer" },
      rule: "Art4",
      missing: ["usesAi"],
    },
  ];

  for (const c of cases) {
    it(c.name, () => {
      const result = verdictOf(c.answers, c.rule);
      expect(result?.verdict).toBe("cannot-tell");
      expect(result?.missingFacts).toEqual(c.missing);
      expect(result?.appliesFrom).toBeUndefined();
    });
  }

  it("applies deployer duties to a business that both built and runs the tool", () => {
    const result = verdictOf({ usesAi: "yes", role: "both", emotionOrBiometric: "yes" }, "50-3");
    expect(result?.verdict).toBe("applies");
  });

  it("treats a staff drafting tool like any staff tool: not obvious means it applies", () => {
    const result = verdictOf(
      {
        usesAi: "yes",
        role: "provider",
        interaction: "staff-assist-reviewed",
        aiObvious: "no",
      },
      "50-1",
    );
    expect(result?.verdict).toBe("applies");
    expect(result?.appliesFrom).toBe("2026-08-02");
  });
});

describe("every rule cites binding law", () => {
  it("cites at least one binding provision from the knowledge base", () => {
    const binding = new Set(PROVISIONS_2026_11.filter((p) => p.binding).map((p) => p.id));
    for (const rule of RULES) {
      expect(
        rule.provisionIds.some((id) => binding.has(id)),
        rule.id,
      ).toBe(true);
    }
  });
});

describe("Article 111(4) wording", () => {
  it("asks about placing on the market only, as the binding text does", () => {
    const fact = FACTS.find((f) => f.id === "onMarketBeforeAug2026");
    expect(fact?.question).toMatch(/placed on the market/);
    expect(fact?.question).not.toMatch(/put into service/);
  });
});

describe("wording (C7)", () => {
  it("no banned wording in any output text", () => {
    const texts: string[] = [];
    for (const fact of FACTS) {
      texts.push(fact.question, fact.why, ...fact.options.map((o) => o.label));
    }
    for (const scenario of SCENARIOS) {
      for (const obligation of runScripted(scenario.facts).result.obligations) {
        texts.push(obligation.reason);
        if (obligation.vendorQuestion) texts.push(obligation.vendorQuestion);
      }
    }
    expect(texts.length).toBeGreaterThan(50);
    for (const text of texts) {
      expect(findBannedWording(text), text).toEqual([]);
    }
  });
});
