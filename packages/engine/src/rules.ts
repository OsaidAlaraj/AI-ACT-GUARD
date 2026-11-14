// Obligation rules (T-002, adr-004): one per obligation, evaluated from the answers.
// Conditions follow the verbatim law in the knowledge base, read with the Commission's guidelines.
import type { Answers } from "./facts";
import type { LegalTestStep, StepVerdict } from "./legal-test";
import type { RuleId } from "./scenarios";

export interface ObligationResult {
  readonly ruleId: RuleId;
  readonly step: LegalTestStep;
  readonly verdict: StepVerdict;
  readonly reason: string;
  readonly missingFacts: readonly string[];
  readonly citations: readonly string[];
  readonly appliesFrom?: string;
  readonly currentTextFrom?: string;
  readonly vendorQuestion?: string;
}

export interface Rule {
  readonly id: RuleId;
  readonly step: LegalTestStep;
  readonly provisionIds: readonly string[];
}

export const RULES: readonly Rule[] = [
  {
    id: "50-1",
    step: "transparency",
    provisionIds: ["AIA-Art50-1", "AIA-Art50-5", "AIA-Art3-1", "EC-G50-2026"],
  },
  {
    id: "50-2",
    step: "transparency",
    provisionIds: ["AIA-Art50-2", "AIA-Art111-4", "EC-G50-2026"],
  },
  {
    id: "50-3",
    step: "transparency",
    provisionIds: ["AIA-Art50-3", "AIA-Art50-5", "AIA-Art3-39", "AIA-Art3-40"],
  },
  { id: "50-4a", step: "transparency", provisionIds: ["AIA-Art50-4", "AIA-Art50-5"] },
  { id: "50-4b", step: "transparency", provisionIds: ["AIA-Art50-4", "AIA-Art50-5"] },
  {
    id: "Art4",
    step: "literacy",
    provisionIds: ["AIA-Art4", "AIA-Art113", "AIA-Art3-1", "EC-AILQA-2026"],
  },
];

const ART50_FROM = "2026-08-02";
const ART50_2_TRANSITION = "2026-12-02";
const ART4_FROM = "2025-02-02";
const ART4_CURRENT_TEXT_FROM = "2026-07-27";

const NOT_AI = "The tool is not an AI system, so this duty does not apply.";
const DEPLOYER_DUTY =
  "Doesn’t apply to you: this is the duty of the business that uses the tool (its deployer).";

type Outcome = Omit<ObligationResult, "ruleId" | "step" | "citations">;

const known = (value: string | undefined): boolean => value !== undefined && value !== "unknown";
const providerSide = (role: string | undefined) => role === "provider" || role === "both";
const deployerSide = (role: string | undefined) => role === "deployer" || role === "both";
const staffUseIt = (interaction: string | undefined) =>
  interaction === "staff-direct" || interaction === "staff-assist-reviewed";
const missing = (answers: Answers, ids: readonly string[]): string[] =>
  ids.filter((id) => !known(answers[id]));

const doesNotApply = (reason: string, extra: Partial<Outcome> = {}): Outcome => ({
  verdict: "does-not-apply",
  reason,
  missingFacts: [],
  ...extra,
});

const applies = (reason: string, appliesFrom?: string, missingFacts: string[] = []): Outcome => ({
  verdict: "applies",
  reason,
  missingFacts,
  ...(appliesFrom ? { appliesFrom } : {}),
});

const cannotTell = (missingFacts: string[]): Outcome => ({
  verdict: "cannot-tell",
  reason: "We can’t tell yet: we need to know more about this tool.",
  missingFacts,
});

function rule50_1(a: Answers): Outcome {
  if (a.usesAi === "no") return doesNotApply(NOT_AI);
  if (staffUseIt(a.interaction) && a.aiObvious === "yes") {
    return doesNotApply(
      "It is obvious to your staff that they are using an AI, so no notice is needed.",
    );
  }
  if (a.role === "deployer") {
    return doesNotApply(
      "Doesn’t apply to you: telling people they are dealing with an AI is your provider’s duty.",
      {
        vendorQuestion:
          "Does your tool tell people that they are dealing with an AI, at the latest when they first interact with it?",
      },
    );
  }
  const directAndNotObvious =
    a.interaction === "public-direct" || (staffUseIt(a.interaction) && a.aiObvious === "no");
  if (providerSide(a.role) && a.usesAi === "yes" && directAndNotObvious) {
    return applies(
      "As its provider, you must design the tool so that people using it are told it is an AI.",
      ART50_FROM,
    );
  }
  const needed = missing(a, ["usesAi", "role", "interaction"]);
  if (staffUseIt(a.interaction) && !known(a.aiObvious)) needed.push("aiObvious");
  return cannotTell(needed);
}

function rule50_2(a: Answers): Outcome {
  if (a.usesAi === "no") return doesNotApply(NOT_AI);
  if (a.writesOwnText === "selects-only") {
    return doesNotApply(
      "The tool only picks from answers people wrote, so it does not generate content.",
    );
  }
  if (a.writesOwnText === "assistive-editing") {
    return doesNotApply(
      "The tool only does standard editing without adding new content, which is excepted.",
    );
  }
  if (a.role === "deployer") {
    return doesNotApply("Doesn’t apply to you: marking generated content is your provider’s duty.");
  }
  if (providerSide(a.role) && a.usesAi === "yes" && a.writesOwnText === "generates") {
    const reason =
      "As its provider, you must mark the content the tool generates as AI-generated, in a machine-readable way.";
    if (a.onMarketBeforeAug2026 === "yes") return applies(reason, ART50_2_TRANSITION);
    if (a.onMarketBeforeAug2026 === "no") return applies(reason, ART50_FROM);
    return applies(
      `${reason} The date depends on whether it was placed on the market before 2 August 2026.`,
      undefined,
      ["onMarketBeforeAug2026"],
    );
  }
  return cannotTell(missing(a, ["usesAi", "role", "writesOwnText"]));
}

function deployerRule(
  a: Answers,
  factId: string,
  appliesReason: string,
  noReason: string,
): Outcome {
  if (a.usesAi === "no") return doesNotApply(NOT_AI);
  if (a.role === "provider") return doesNotApply(DEPLOYER_DUTY);
  if (a[factId] === "no") return doesNotApply(noReason);
  if (deployerSide(a.role) && a.usesAi === "yes" && a[factId] === "yes") {
    return applies(appliesReason, ART50_FROM);
  }
  return cannotTell(missing(a, ["usesAi", "role", factId]));
}

function rule50_4b(a: Answers): Outcome {
  if (a.usesAi === "no") return doesNotApply(NOT_AI);
  if (a.role === "provider") return doesNotApply(DEPLOYER_DUTY);
  if (a.publicInterestText === "no") {
    return doesNotApply(
      "You do not publish its text to inform the public on matters of public interest.",
    );
  }
  if (a.humanEditorialControl === "yes") {
    return doesNotApply(
      "The text has real human review and someone holds editorial responsibility, so the exception applies.",
    );
  }
  if (
    deployerSide(a.role) &&
    a.usesAi === "yes" &&
    a.publicInterestText === "yes" &&
    a.humanEditorialControl === "no"
  ) {
    return applies(
      "You must disclose that published public-interest text was generated or changed by AI.",
      ART50_FROM,
    );
  }
  return cannotTell(missing(a, ["usesAi", "role", "publicInterestText", "humanEditorialControl"]));
}

function ruleArt4(a: Answers): Outcome {
  if (a.usesAi === "yes") {
    return {
      ...applies(
        "Providers and deployers of AI systems must take measures to support the AI literacy of their staff and others using AI on their behalf.",
        ART4_FROM,
      ),
      currentTextFrom: ART4_CURRENT_TEXT_FROM,
    };
  }
  if (a.usesAi === "no") {
    return doesNotApply(
      "Not for this tool, as it is not an AI system. Other AI your business uses may still bring this duty in.",
    );
  }
  return cannotTell(["usesAi"]);
}

const EVALUATORS: Record<RuleId, (answers: Answers) => Outcome> = {
  "50-1": rule50_1,
  "50-2": rule50_2,
  "50-3": (a) =>
    deployerRule(
      a,
      "emotionOrBiometric",
      "You must tell people exposed to the tool that it recognises emotions or sorts people into categories.",
      "The tool does not recognise emotions or sort people into categories from biometric data.",
    ),
  "50-4a": (a) =>
    deployerRule(
      a,
      "deepfake",
      "You must disclose that deep fake content was generated or changed by AI.",
      "The tool does not create deep fakes.",
    ),
  "50-4b": rule50_4b,
  Art4: ruleArt4,
};

export function evaluateRules(answers: Answers): ObligationResult[] {
  return RULES.map((rule) => ({
    ruleId: rule.id,
    step: rule.step,
    citations: rule.provisionIds,
    ...EVALUATORS[rule.id](answers),
  }));
}

/** Comparison key for "a different result": verdicts, dates and missing facts, not wording. */
export function resultKey(obligations: readonly ObligationResult[]): string {
  return JSON.stringify(
    obligations.map((o) => [o.ruleId, o.verdict, o.appliesFrom ?? null, o.missingFacts]),
  );
}
