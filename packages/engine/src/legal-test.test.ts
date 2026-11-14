import { describe, expect, it } from "vitest";
import { BANNED_WORDING, LEGAL_TEST_STEPS, findBannedWording } from "./legal-test.js";

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

  it("does not flag 'CE' inside ordinary words or in lower case", () => {
    expect(findBannedWording("Once the service is live, check the source.")).toEqual([]);
  });

  it("matches case-insensitively for word terms", () => {
    expect(findBannedWording("COMPLIANT and Certified")).toEqual(["compliant", "certified"]);
  });
});
