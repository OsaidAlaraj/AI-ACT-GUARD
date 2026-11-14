// The chatbot fact catalogue (T-002, adr-004), ordered by legal-test step, then question order.
// The order matters: the engine asks the first fact that is relevant given the answers so far.
import type { LegalTestStep } from "./legal-test";

export interface FactOption {
  readonly value: string;
  readonly label: string;
}

export interface Fact {
  readonly id: string;
  readonly step: LegalTestStep;
  readonly question: string;
  readonly why: string;
  readonly options: readonly FactOption[];
}

/** Answers keyed by fact id. An unanswered fact is absent; "I don't know" is "unknown". */
export type Answers = Readonly<Record<string, string>>;

const UNKNOWN: FactOption = { value: "unknown", label: "I don’t know" };

const yesNo = (yes: string, no: string): FactOption[] => [
  { value: "yes", label: yes },
  { value: "no", label: no },
  UNKNOWN,
];

export const FACTS: readonly Fact[] = [
  {
    id: "usesAi",
    step: "start",
    question: "Does the tool use AI to work out its replies?",
    why: "The AI Act only covers AI systems: systems that infer from their input how to generate outputs (Article 3(1)). A bot that uses machine learning to pick a fixed answer is still an AI system.",
    options: [
      { value: "yes", label: "Yes, it uses AI or machine learning to work out its replies" },
      { value: "no", label: "No, it only follows fixed rules a person wrote" },
      UNKNOWN,
    ],
  },
  {
    id: "role",
    step: "role",
    question: "What is your business’s role for this tool?",
    why: "Some duties fall on the provider who develops the tool, others on the deployer who uses it (Article 3(3) and 3(4)). Running your own system makes you its deployer too. Renaming or rebranding another company’s tool alone does not make you its provider.",
    options: [
      {
        value: "provider",
        label:
          "We developed it (or had it developed), or substantially changed someone else’s (e.g. retrained it), and offer it to other organisations; we do not run it ourselves",
      },
      {
        value: "deployer",
        label: "We use a tool someone else developed, without substantially changing it",
      },
      {
        value: "both",
        label:
          "We developed it (or had it developed or substantially changed), and we also run it ourselves, e.g. on our own website",
      },
      UNKNOWN,
    ],
  },
  {
    id: "interaction",
    step: "transparency",
    question: "Who uses the tool directly?",
    why: "People who interact with an AI system directly must be told it is AI (Article 50(1)). Customers who only receive replies your staff reviewed are not talking to the AI, but your staff using the tool are.",
    options: [
      { value: "public-direct", label: "The public or customers talk to it directly" },
      { value: "staff-direct", label: "Only our staff talk to it directly" },
      {
        value: "staff-assist-reviewed",
        label: "Our staff use it to draft replies, which they review and send",
      },
      UNKNOWN,
    ],
  },
  {
    id: "aiObvious",
    step: "transparency",
    question: "Would your staff obviously know they are using an AI?",
    why: "No notice is needed where it is obvious to a reasonably well-informed person that they are dealing with an AI (Article 50(1)). The Commission reads this exception narrowly, for example for trained, AI-literate staff.",
    options: yesNo("Yes, it is obvious to them", "No, or not always"),
  },
  {
    id: "writesOwnText",
    step: "transparency",
    question: "Does the tool write its own content?",
    why: "Providers of tools that generate text, audio, images or video must mark the output as AI-generated (Article 50(2)), unless the tool only does standard editing.",
    options: [
      { value: "generates", label: "It writes new text (or audio, images or video) itself" },
      { value: "selects-only", label: "It only picks from answers people wrote" },
      {
        value: "assistive-editing",
        label: "It only polishes or corrects text the user wrote, without adding new content",
      },
      UNKNOWN,
    ],
  },
  {
    id: "onMarketBeforeAug2026",
    step: "transparency",
    question:
      "Was it placed on the market (made available to other organisations) before 2 August 2026?",
    why: "Generators placed on the market before 2 August 2026 have until 2 December 2026 to mark their output (Article 111(4)). A tool only used in-house does not get this extra time.",
    options: yesNo("Yes", "No"),
  },
  {
    id: "emotionOrBiometric",
    step: "transparency",
    question:
      "Does the tool work out people’s emotions or intentions, or sort people into categories, from biometric data such as their face or voice?",
    why: "Deployers of emotion recognition or biometric categorisation systems must tell the people exposed to them (Article 50(3)). These systems work from biometric data, not from typed text alone (Article 3(39) and 3(40)).",
    options: yesNo("Yes", "No, or only from typed text"),
  },
  {
    id: "deepfake",
    step: "transparency",
    question:
      "Does the tool create or change images, audio or video so that real people, objects, places or events appear authentic when they are not?",
    why: "Deployers must disclose deep fakes (Article 50(4)).",
    options: yesNo("Yes", "No"),
  },
  {
    id: "publicInterestText",
    step: "transparency",
    question:
      "Do you publish text from the tool to inform the public on matters of public interest?",
    why: "Deployers must disclose AI-generated text published to inform the public on matters of public interest (Article 50(4)).",
    options: yesNo("Yes", "No"),
  },
  {
    id: "humanEditorialControl",
    step: "transparency",
    question:
      "Before publication, does a person review that text properly, and does a named person or organisation take editorial responsibility for it?",
    why: "The disclosure duty for public-interest text does not apply where the text had real human review or editorial control and someone holds editorial responsibility (Article 50(4)). A quick surface check does not count.",
    options: [
      {
        value: "yes",
        label:
          "Both: a person reviews it properly before publication, and a named person or organisation takes editorial responsibility",
      },
      { value: "no", label: "No, or only a quick surface check" },
      UNKNOWN,
    ],
  },
];
