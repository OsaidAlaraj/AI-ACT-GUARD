// T-001 C1: the legal knowledge base resolves the prototype's provisions, versioned.
import { describe, expect, it } from "vitest";
import { LEGAL_CONTENT_VERSION, PROVISIONS_2026_11 } from "./aia-2026-11";
import { createInMemoryKnowledge } from "./in-memory";

const LAW_IDS = [
  "AIA-Art3-1",
  "AIA-Art3-3",
  "AIA-Art3-4",
  "AIA-Art3-39",
  "AIA-Art3-40",
  "AIA-Art4",
  "AIA-Art50-1",
  "AIA-Art50-2",
  "AIA-Art50-3",
  "AIA-Art50-4",
  "AIA-Art50-5",
  "AIA-Art111-4",
  "AIA-Art113",
];
const GUIDANCE_IDS = ["EC-G50-2026", "EC-AILQA-2026"];

const kb = createInMemoryKnowledge(PROVISIONS_2026_11, LEGAL_CONTENT_VERSION);

describe("legal knowledge base 2026.11 (C1)", () => {
  it("reports its legal-content version", async () => {
    expect(await kb.version()).toBe("2026.11");
  });

  it("resolves every law provision as binding, with an official source", async () => {
    for (const id of LAW_IDS) {
      const provision = await kb.getProvision(id);
      expect(provision, id).toBeDefined();
      expect(provision?.binding, id).toBe(true);
      expect(provision?.title.length, id).toBeGreaterThan(0);
      expect(provision?.text.length, id).toBeGreaterThan(40);
      expect(provision?.sourceUrl, id).toMatch(/^http:\/\/data\.europa\.eu\/eli\/reg\/202[46]\//);
    }
  });

  it("resolves the Commission guidance as non-binding, with its source", async () => {
    for (const id of GUIDANCE_IDS) {
      const provision = await kb.getProvision(id);
      expect(provision, id).toBeDefined();
      expect(provision?.binding, id).toBe(false);
      expect(provision?.title.length, id).toBeGreaterThan(0);
      expect(provision?.text.length, id).toBeGreaterThan(80);
      expect(provision?.sourceUrl, id).toMatch(
        /^https:\/\/(ai-act-service-desk|digital-strategy)\.ec\.europa\.eu\//,
      );
    }
  });

  it("holds the operative wording verbatim", async () => {
    const quotes: Record<string, string> = {
      "AIA-Art50-1":
        "unless this is obvious from the point of view of a natural person who is reasonably well-informed, observant and circumspect",
      "AIA-Art50-5": "at the latest at the time of the first interaction or exposure",
      "AIA-Art4":
        "This obligation does not require providers or deployers to guarantee any specific level of AI literacy of any individual.",
      "AIA-Art3-3": "under its own name or trademark, whether for payment or free of charge",
      "AIA-Art3-4":
        "except where the AI system is used in the course of a personal non-professional activity",
      "AIA-Art3-39":
        "identifying or inferring emotions or intentions of natural persons on the basis of their biometric data",
      "AIA-Art111-4":
        "shall take the necessary steps in order to comply with Article 50(2) by 2 December 2026",
      "AIA-Art113":
        "2 December 2027 as regards AI systems classified as high-risk pursuant to Article 6(2) and Annex III",
    };
    for (const [id, quote] of Object.entries(quotes)) {
      expect((await kb.getProvision(id))?.text, id).toContain(quote);
    }
  });

  it("dates Article 50 from 2 August 2026 and Article 4 from 2 February 2025", async () => {
    for (const id of ["AIA-Art50-1", "AIA-Art50-2", "AIA-Art50-3", "AIA-Art50-4", "AIA-Art50-5"]) {
      expect((await kb.getProvision(id))?.appliesFrom, id).toBe("2026-08-02");
    }
    // Article 4 has applied since 2 Feb 2025 (Art. 113(a)); only its wording changed on 27 Jul 2026.
    expect((await kb.getProvision("AIA-Art4"))?.appliesFrom).toBe("2025-02-02");
    expect((await kb.getProvision("AIA-Art4"))?.text).toContain(
      "support the development of AI literacy",
    );
  });

  it("returns undefined for an id it does not hold", async () => {
    expect(await kb.getProvision("AIA-Art999")).toBeUndefined();
  });
});
