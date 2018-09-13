import { EasyCodingStandard } from "../EasyCodingStandard";
import "jest-extended";

describe("EasyCodingStandard", () => {
  const testFile = `${process.cwd()}/src/__fixtures__/src/index.php`;
  const config = {
    enable: false,
    onSave: false,
    executablePath: `${process.cwd()}/src/__fixtures__/vendor/bin/ecs`
  };

  it("should create an instance of EasyCodingStandard", () => {
    const ecs = new EasyCodingStandard(config.executablePath);

    expect(ecs).toBeObject();
  });

  it("should execute EasyCodingStandard", async () => {
    const ecs = new EasyCodingStandard(config.executablePath);
    const results = await ecs.version();

    expect(results.code).toBe(0);
    expect(results.stdout.length).toBeGreaterThan(0);
  });

  it("should fail when no checkers are given", async () => {
    const ecs = new EasyCodingStandard(config.executablePath);

    try {
      await ecs.check(testFile, []);
    } catch (err) {
      expect(err.stdout).toInclude('Level "" was not found.');
    }
  });

  it("should pass when a checker is present", async () => {
    const ecs = new EasyCodingStandard(config.executablePath);

    const { stdout } = await ecs.check(testFile, ["psr2"]);
    expect(stdout).toInclude("No errors found.");
  });
});
