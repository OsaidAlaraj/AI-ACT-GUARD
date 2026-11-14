// The legal test's fixed step order (requirements D13.1; design brief "Decision Path" §2).
// The question flow, the reasoning memo, the report and the expert view all follow this order.

export const LEGAL_TEST_STEPS = [
  "start",
  "prohibited",
  "role",
  "high-risk",
  "exemption",
  "transparency",
  "literacy",
  "verdict",
] as const;

export type LegalTestStep = (typeof LEGAL_TEST_STEPS)[number];

/** The only verdict values a step may carry (D5, D6). Never a score. */
export type StepVerdict = "applies" | "does-not-apply" | "cannot-tell";

export type Role = "provider" | "deployer" | "both";

/** Words the product must never use, in any output (PRODUCT.md "Capabilities and Constraints"). */
export const BANNED_WORDING = [
  "compliant",
  "certified",
  "approved",
  "conformity assessment",
  "CE",
  "legal advice",
  "guaranteed",
] as const;

/**
 * Returns every banned term found in `text`, matched as whole words, case-insensitively,
 * except "CE", which matches only in capitals so ordinary words are not flagged.
 * "not legal advice" is the required disclaimer and is allowed.
 */
export function findBannedWording(text: string): string[] {
  const withoutDisclaimer = text.replace(/\bnot legal advice\b/gi, "");
  // Terms are plain words (a test asserts no regex metacharacters), so no escaping is needed.
  return BANNED_WORDING.filter((term) => {
    const flags = term === "CE" ? "" : "i";
    return new RegExp(`\\b${term}\\b`, flags).test(withoutDisclaimer);
  });
}
