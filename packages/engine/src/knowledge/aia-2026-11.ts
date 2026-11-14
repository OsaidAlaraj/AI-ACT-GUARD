// Legal knowledge base, version 2026.11 (T-002 C1). Law texts verbatim from the Official Journal
// (Publications Office Cellar copies of Reg. 2024/1689 and Reg. 2026/1744); guidance as summaries.
import type { Provision } from "../ports";

export const LEGAL_CONTENT_VERSION = "2026.11";

export const PROVISIONS_2026_11: readonly Provision[] = [
  {
    id: "AIA-Art3-1",
    title: "Article 3(1): definition of 'AI system'",
    text: "‘AI system’ means a machine-based system that is designed to operate with varying levels of autonomy and that may exhibit adaptiveness after deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments;",
    binding: true,
    appliesFrom: "2025-02-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art3-3",
    title: "Article 3(3): definition of 'provider'",
    text: "‘provider’ means a natural or legal person, public authority, agency or other body that develops an AI system or a general-purpose AI model or that has an AI system or a general-purpose AI model developed and places it on the market or puts the AI system into service under its own name or trademark, whether for payment or free of charge;",
    binding: true,
    appliesFrom: "2025-02-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art3-4",
    title: "Article 3(4): definition of 'deployer'",
    text: "‘deployer’ means a natural or legal person, public authority, agency or other body using an AI system under its authority except where the AI system is used in the course of a personal non-professional activity;",
    binding: true,
    appliesFrom: "2025-02-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art3-39",
    title: "Article 3(39): definition of 'emotion recognition system'",
    text: "‘emotion recognition system’ means an AI system for the purpose of identifying or inferring emotions or intentions of natural persons on the basis of their biometric data;",
    binding: true,
    appliesFrom: "2025-02-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art3-40",
    title: "Article 3(40): definition of 'biometric categorisation system'",
    text: "‘biometric categorisation system’ means an AI system for the purpose of assigning natural persons to specific categories on the basis of their biometric data, unless it is ancillary to another commercial service and strictly necessary for objective technical reasons;",
    binding: true,
    appliesFrom: "2025-02-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art3-60",
    title: "Article 3(60): definition of 'deep fake'",
    text: "‘deep fake’ means AI-generated or manipulated image, audio or video content that resembles existing persons, objects, places, entities or events and would falsely appear to a person to be authentic or truthful;",
    binding: true,
    appliesFrom: "2025-02-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art4",
    title: "Article 4: AI literacy (as replaced by Regulation (EU) 2026/1744, Article 1(5))",
    text: "1. Providers and deployers of AI systems shall take measures to support the development of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf, taking into account their technical knowledge, experience, education and training and the context the AI systems are to be used in, and considering the persons or groups of persons on whom the AI systems are to be used. This obligation does not require providers or deployers to guarantee any specific level of AI literacy of any individual.\n2. The Commission and the Member States shall support and facilitate the efforts of providers and deployers of AI systems, in particular SMEs, in fulfilling their obligation under paragraph 1 of this Article. For that purpose, the Commission shall publish practical examples of how to comply with that obligation on the single information platform referred to in Article 62(3), point (b).\n3. The Board shall adopt recommendations, taking into account European competence frameworks, to support the Commission and Member States in the promotion of AI literacy required under paragraph 1, including by setting out common objectives.",
    binding: true,
    appliesFrom: "2025-02-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2026/1744/oj",
  },
  {
    id: "AIA-Art50-1",
    title: "Article 50(1): AI systems that interact directly with people",
    text: "1. Providers shall ensure that AI systems intended to interact directly with natural persons are designed and developed in such a way that the natural persons concerned are informed that they are interacting with an AI system, unless this is obvious from the point of view of a natural person who is reasonably well-informed, observant and circumspect, taking into account the circumstances and the context of use. This obligation shall not apply to AI systems authorised by law to detect, prevent, investigate or prosecute criminal offences, subject to appropriate safeguards for the rights and freedoms of third parties, unless those systems are available for the public to report a criminal offence.",
    binding: true,
    appliesFrom: "2026-08-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art50-2",
    title: "Article 50(2): marking of AI-generated content",
    text: "2. Providers of AI systems, including general-purpose AI systems, generating synthetic audio, image, video or text content, shall ensure that the outputs of the AI system are marked in a machine-readable format and detectable as artificially generated or manipulated. Providers shall ensure their technical solutions are effective, interoperable, robust and reliable as far as this is technically feasible, taking into account the specificities and limitations of various types of content, the costs of implementation and the generally acknowledged state of the art, as may be reflected in relevant technical standards. This obligation shall not apply to the extent the AI systems perform an assistive function for standard editing or do not substantially alter the input data provided by the deployer or the semantics thereof, or where authorised by law to detect, prevent, investigate or prosecute criminal offences.",
    binding: true,
    appliesFrom: "2026-08-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art50-3",
    title: "Article 50(3): emotion recognition and biometric categorisation",
    text: "3. Deployers of an emotion recognition system or a biometric categorisation system shall inform the natural persons exposed thereto of the operation of the system, and shall process the personal data in accordance with Regulations (EU) 2016/679 and (EU) 2018/1725 and Directive (EU) 2016/680, as applicable. This obligation shall not apply to AI systems used for biometric categorisation and emotion recognition, which are permitted by law to detect, prevent or investigate criminal offences, subject to appropriate safeguards for the rights and freedoms of third parties, and in accordance with Union law.",
    binding: true,
    appliesFrom: "2026-08-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art50-4",
    title: "Article 50(4): deep fakes and AI-generated text on matters of public interest",
    text: "4. Deployers of an AI system that generates or manipulates image, audio or video content constituting a deep fake, shall disclose that the content has been artificially generated or manipulated. This obligation shall not apply where the use is authorised by law to detect, prevent, investigate or prosecute criminal offence. Where the content forms part of an evidently artistic, creative, satirical, fictional or analogous work or programme, the transparency obligations set out in this paragraph are limited to disclosure of the existence of such generated or manipulated content in an appropriate manner that does not hamper the display or enjoyment of the work.\nDeployers of an AI system that generates or manipulates text which is published with the purpose of informing the public on matters of public interest shall disclose that the text has been artificially generated or manipulated. This obligation shall not apply where the use is authorised by law to detect, prevent, investigate or prosecute criminal offences or where the AI-generated content has undergone a process of human review or editorial control and where a natural or legal person holds editorial responsibility for the publication of the content.",
    binding: true,
    appliesFrom: "2026-08-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art50-5",
    title: "Article 50(5): how and when the information is given",
    text: "5. The information referred to in paragraphs 1 to 4 shall be provided to the natural persons concerned in a clear and distinguishable manner at the latest at the time of the first interaction or exposure. The information shall conform to the applicable accessibility requirements.",
    binding: true,
    appliesFrom: "2026-08-02",
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "AIA-Art111-4",
    title:
      "Article 111(4): systems placed on the market before 2 August 2026 (added by Regulation (EU) 2026/1744, Article 1(39)(b))",
    text: "4. Providers of AI systems, including general-purpose AI systems, generating synthetic audio, image, video or text content, that have been placed on the market before 2 August 2026 shall take the necessary steps in order to comply with Article 50(2) by 2 December 2026.",
    binding: true,
    sourceUrl: "http://data.europa.eu/eli/reg/2026/1744/oj",
  },
  {
    id: "AIA-Art113",
    title:
      "Article 113: entry into force and application (third paragraph as amended by Regulation (EU) 2026/1744, Article 1(40))",
    text: "This Regulation shall enter into force on the twentieth day following that of its publication in the Official Journal of the European Union.\nIt shall apply from 2 August 2026.\nHowever:\n(a) Chapters I and II shall apply from 2 February 2025, with the exception of Article 5(1), first subparagraph, points (ba) and (bb), and Article 5(1a) and (1b) which shall apply from 2 December 2026;\n(b) Chapter III Section 4, Chapter V, Chapter VII and Chapter XII and Article 78 shall apply from 2 August 2025, with the exception of Article 101;\n(c) Chapter III, Sections 1, 2, and 3, with the exception of Article 6(5), shall apply from: (i) 2 December 2027 as regards AI systems classified as high-risk pursuant to Article 6(2) and Annex III; and (ii) 2 August 2028 as regards AI systems classified as high-risk pursuant to Article 6(1) and Annex I;\n(d) Articles 102 to 110 shall apply from 27 July 2026.",
    binding: true,
    sourceUrl: "http://data.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    id: "EC-G50-2026",
    title:
      "Commission Guidelines on the transparency obligations under Article 50, C(2026) 5054 final (summary, non-binding)",
    text: "Summary of the Commission's non-binding guidelines of 20 July 2026. Paras 10-11 and 15: a company that develops an AI system, or has it developed, and places it on the market or puts it into service under its own name is its provider; one company can be both provider and deployer. Para. 30: Article 50(1) needs four elements together: an AI system, intended to interact, directly, with natural persons; rule-based quick replies are not AI systems, and tools that help customer service staff write replies they review and send are not direct interaction with the customer. Para. 45: the 'obvious' exception is read restrictively and cannot be relied upon where the general public or consumers that include vulnerable persons may use the system. Para. 90: the assistive-editing exception in Article 50(2) covers standard editing that does not generate new content. Paras 135 and 138: the Article 50(4) text exception needs real human review or editorial control (superficial checks do not count) and a person holding editorial responsibility. Para. 153: Article 50 applies from 2 August 2026; only Article 50(2) has a transition, to 2 December 2026, which the guidelines read as covering generative systems placed on the market or put into service before 2 August 2026 (the binding text of Article 111(4) names only placing on the market).",
    binding: false,
    sourceUrl:
      "https://ai-act-service-desk.ec.europa.eu/sites/default/files/2026-07/guidelines_on_the_implementation_of_the_transparency_obligations_for_certain_ai_systems_under_article_50_of_the_ai_act_bzptwqhk0ikg1dtlddap41psfy_131215.pdf",
  },
  {
    id: "EC-AILQA-2026",
    title:
      "Commission AI literacy questions and answers, updated 20 October 2026 (summary, non-binding)",
    text: "Summary of the Commission's non-binding questions and answers on AI literacy: after Regulation (EU) 2026/1744, Article 4 still binds providers and deployers of AI systems to take measures that support the AI literacy of their staff and others using AI on their behalf. It sets no required level, no duty to measure knowledge and no certificate; measures should fit the people involved and the context of use.",
    binding: false,
    sourceUrl: "https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers",
  },
];
