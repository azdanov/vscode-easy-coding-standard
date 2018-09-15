import { NoRulesetsFound } from "..";

describe("NoRulesetsFound", () => {
  it("should create an instance of NoRulesetsFound", () => {
    expect(new NoRulesetsFound()).toBeObject();
  });

  it("should have a default message", () => {
    expect(() => {
      throw new NoRulesetsFound();
    }).toThrowErrorMatchingInlineSnapshot(
      `"No rules are active. Please select a predefined ruleset or provide the path to a configuration file."`
    );
  });
});
