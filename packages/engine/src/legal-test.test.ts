import { describe, expect, it } from "vitest";
import { BANNED_WORDING, LEGAL_TEST_STEPS, findBannedWording } from "./legal-test";

describe("legal test step order (D13.1)", () => {
  it("walks prohibited practices before role, role before high-risk, and ends at the verdict", () => {
    expect(LEGAL_TEST_STEPS).toEqual([
      "start",
      "prohibited",
      "role",
      "high-risk",
      "exemption",
      "transparency",
      "literacy",
      "verdict",
    ]);
  });
});

describe("findBannedWording", () => {
  it("flags every banned term when it appears", () => {
    for (const term of BANNED_WORDING) {
      expect(findBannedWording(`This tool is ${term} today.`)).toEqual([term]);
    }
  });

  it("allows the required disclaimer 'not legal advice'", () => {
    expect(findBannedWording("Indicative assessment, not legal advice.")).toEqual([]);
  });

  it("still flags 'legal advice' when it is not the disclaimer", () => {
    expect(findBannedWording("This report is legal advice.")).toEqual(["legal advice"]);
  });

  it("does not flag 'CE' inside ordinary words", () => {
    expect(findBannedWording("Once the service is live, check the source.")).toEqual([]);
  });

  it("flags 'CE' only in capitals, not a lower-case 'ce'", () => {
    expect(findBannedWording("The abbreviation ce means nothing here.")).toEqual([]);
    expect(findBannedWording("It carries the CE mark.")).toEqual(["CE"]);
  });

  it("keeps every banned term a plain phrase, so it is matched literally", () => {
    for (const term of BANNED_WORDING) {
      expect(term).toMatch(/^[A-Za-z ]+$/);
    }
  });

  it("matches case-insensitively for word terms", () => {
    expect(findBannedWording("COMPLIANT and Certified")).toEqual(["compliant", "certified"]);
  });
});
