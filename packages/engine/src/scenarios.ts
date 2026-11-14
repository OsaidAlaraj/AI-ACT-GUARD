// The T-001 scenario table as data (tickets/T-001-engine-chatbot-transparency.md, C4).
// Shared by the assessment, rules and runner tests. `facts` lists exactly the facts the engine
// asks in that scenario, in FACTS order, with the scripted customer's answers.
import type { StepVerdict } from "./legal-test";

export type RuleId = "50-1" | "50-2" | "50-3" | "50-4a" | "50-4b" | "Art4";

export interface ExpectedVerdict {
  readonly verdict: StepVerdict;
  readonly appliesFrom?: string;
  readonly missingFacts?: readonly string[];
}

export interface Scenario {
  readonly id: string;
  readonly title: string;
  readonly facts: Readonly<Record<string, string>>;
  readonly expected: Readonly<Record<RuleId, ExpectedVerdict>>;
}

const N: ExpectedVerdict = { verdict: "does-not-apply" };
const A = (appliesFrom: string): ExpectedVerdict => ({ verdict: "applies", appliesFrom });
const ART4 = A("2025-02-02");

export const SCENARIOS: readonly Scenario[] = [
  {
    id: "S1",
    title: "Vendor chatbot, deployer",
    facts: {
      usesAi: "yes",
      role: "deployer",
      emotionOrBiometric: "no",
      deepfake: "no",
      publicInterestText: "no",
    },
    expected: { "50-1": N, "50-2": N, "50-3": N, "50-4a": N, "50-4b": N, Art4: ART4 },
  },
  {
    id: "S2",
    title: "Chatbot product offered to other businesses, provider",
    facts: {
      usesAi: "yes",
      role: "provider",
      interaction: "public-direct",
      writesOwnText: "generates",
      onMarketBeforeAug2026: "no",
    },
    expected: {
      "50-1": A("2026-08-02"),
      "50-2": A("2026-08-02"),
      "50-3": N,
      "50-4a": N,
      "50-4b": N,
      Art4: ART4,
    },
  },
  {
    id: "S3",
    title: "Internal bot, obviously AI",
    facts: {
      usesAi: "yes",
      role: "both",
      interaction: "staff-direct",
      aiObvious: "yes",
      writesOwnText: "generates",
      onMarketBeforeAug2026: "no",
      emotionOrBiometric: "no",
      deepfake: "no",
      publicInterestText: "no",
    },
    expected: {
      "50-1": N,
      "50-2": A("2026-08-02"),
      "50-3": N,
      "50-4a": N,
      "50-4b": N,
      Art4: ART4,
    },
  },
  {
    id: "S4",
    title: "Drafting assistant, staff review, obviously AI to staff",
    facts: {
      usesAi: "yes",
      role: "both",
      interaction: "staff-assist-reviewed",
      aiObvious: "yes",
      writesOwnText: "generates",
      onMarketBeforeAug2026: "no",
      emotionOrBiometric: "no",
      deepfake: "no",
      publicInterestText: "no",
    },
    expected: {
      "50-1": N,
      "50-2": A("2026-08-02"),
      "50-3": N,
      "50-4a": N,
      "50-4b": N,
      Art4: ART4,
    },
  },
  {
    id: "S5",
    title: "Fixed rules, no AI",
    facts: { usesAi: "no" },
    expected: { "50-1": N, "50-2": N, "50-3": N, "50-4a": N, "50-4b": N, Art4: N },
  },
  {
    id: "S6",
    title: "Emotion recognition, deployer",
    facts: {
      usesAi: "yes",
      role: "deployer",
      emotionOrBiometric: "yes",
      deepfake: "no",
      publicInterestText: "no",
    },
    expected: {
      "50-1": N,
      "50-2": N,
      "50-3": A("2026-08-02"),
      "50-4a": N,
      "50-4b": N,
      Art4: ART4,
    },
  },
  {
    id: "S7",
    title: "Public-interest text, no editorial control",
    facts: {
      usesAi: "yes",
      role: "deployer",
      emotionOrBiometric: "no",
      deepfake: "no",
      publicInterestText: "yes",
      humanEditorialControl: "no",
    },
    expected: {
      "50-1": N,
      "50-2": N,
      "50-3": N,
      "50-4a": N,
      "50-4b": A("2026-08-02"),
      Art4: ART4,
    },
  },
  {
    id: "S7b",
    title: "Public-interest text, editorial control",
    facts: {
      usesAi: "yes",
      role: "deployer",
      emotionOrBiometric: "no",
      deepfake: "no",
      publicInterestText: "yes",
      humanEditorialControl: "yes",
    },
    expected: { "50-1": N, "50-2": N, "50-3": N, "50-4a": N, "50-4b": N, Art4: ART4 },
  },
  {
    id: "S8",
    title: "Role unknown",
    facts: {
      usesAi: "yes",
      role: "unknown",
      interaction: "public-direct",
      writesOwnText: "generates",
      emotionOrBiometric: "no",
      deepfake: "no",
      publicInterestText: "no",
    },
    expected: {
      "50-1": { verdict: "cannot-tell", missingFacts: ["role"] },
      "50-2": { verdict: "cannot-tell", missingFacts: ["role"] },
      "50-3": N,
      "50-4a": N,
      "50-4b": N,
      Art4: ART4,
    },
  },
  {
    id: "S9",
    title: "Interaction unknown",
    facts: {
      usesAi: "yes",
      role: "provider",
      interaction: "unknown",
      writesOwnText: "selects-only",
    },
    expected: {
      "50-1": { verdict: "cannot-tell", missingFacts: ["interaction"] },
      "50-2": N,
      "50-3": N,
      "50-4a": N,
      "50-4b": N,
      Art4: ART4,
    },
  },
  {
    id: "S10",
    title: "Generator already on the market",
    facts: {
      usesAi: "yes",
      role: "provider",
      interaction: "public-direct",
      writesOwnText: "generates",
      onMarketBeforeAug2026: "yes",
    },
    expected: {
      "50-1": A("2026-08-02"),
      "50-2": A("2026-12-02"),
      "50-3": N,
      "50-4a": N,
      "50-4b": N,
      Art4: ART4,
    },
  },
  {
    id: "S11",
    title: "Deepfakes, deployer",
    facts: {
      usesAi: "yes",
      role: "deployer",
      emotionOrBiometric: "no",
      deepfake: "yes",
      publicInterestText: "no",
    },
    expected: {
      "50-1": N,
      "50-2": N,
      "50-3": N,
      "50-4a": A("2026-08-02"),
      "50-4b": N,
      Art4: ART4,
    },
  },
  {
    id: "S12",
    title: "Text polishing only, provider",
    facts: {
      usesAi: "yes",
      role: "provider",
      interaction: "public-direct",
      writesOwnText: "assistive-editing",
    },
    expected: {
      "50-1": A("2026-08-02"),
      "50-2": N,
      "50-3": N,
      "50-4a": N,
      "50-4b": N,
      Art4: ART4,
    },
  },
  {
    id: "S13",
    title: "Generator, market-entry date unknown",
    facts: {
      usesAi: "yes",
      role: "provider",
      interaction: "public-direct",
      writesOwnText: "generates",
      onMarketBeforeAug2026: "unknown",
    },
    expected: {
      "50-1": A("2026-08-02"),
      "50-2": { verdict: "applies", missingFacts: ["onMarketBeforeAug2026"] },
      "50-3": N,
      "50-4a": N,
      "50-4b": N,
      Art4: ART4,
    },
  },
];
