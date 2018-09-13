import { EasyCodingStandard } from "../EasyCodingStandard";
import "jest-extended";

// TODO: Abort testing on windows, or find a way to run composer

describe("EasyCodingStandard", async () => {
  const testFile = `${process.cwd()}/src/__fixtures__/src/index.php`;
  const formatFile = `${process.cwd()}/src/__fixtures__/src/format.php`;
  const config = {
    enable: false,
    onSave: false,
    executablePath: `${process.cwd()}/src/__fixtures__/vendor/bin/ecs`
  };

  it("should create an instance of EasyCodingStandard", () => {
    const ecs = new EasyCodingStandard(config.executablePath);

    expect(ecs).toBeObject();
  });

  it("should have a dispose method", () => {
    const ecs = new EasyCodingStandard(config.executablePath);

    expect(ecs.dispose).toBeFunction();
    expect(ecs.dispose()).toBe(undefined);
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

  it("should fail when a checker is present", async () => {
    const ecs = new EasyCodingStandard(config.executablePath);

    const { stdout } = await ecs.check(formatFile, ["psr2"]);
    expect(stdout).toInclude("[WARNING]");
  });
});
