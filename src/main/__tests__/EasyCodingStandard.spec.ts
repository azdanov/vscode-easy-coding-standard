import { EasyCodingStandard } from "../EasyCodingStandard";
import "jest-extended";
import { CheckerSet, IConfig } from "../../utilities/IConfig";

// TODO: Abort testing on windows, or find a way to run composer

describe("EasyCodingStandard", async () => {
  const testFile = `${process.cwd()}/src/main/__fixtures__/src/index.php`;
  const formatFile = `${process.cwd()}/src/main/__fixtures__/src/format.php`;
  let config: IConfig;

  afterEach(() => {
    config = {
      enable: false,
      onSave: false,
      checkerSets: [CheckerSet.psr2],
      executablePath: `${process.cwd()}/src/main/__fixtures__/vendor/bin/ecs`,
      configPath: `${process.cwd()}/src/main/__fixtures__/easy-coding-standard.yml`
    };
  });

  it("should create an instance of EasyCodingStandard", () => {
    const ecs = new EasyCodingStandard(config);

    expect(ecs).toBeObject();
  });

  it("should have a dispose method", () => {
    const ecs = new EasyCodingStandard(config);

    expect(ecs.dispose).toBeFunction();
    expect(ecs.dispose()).toBe(undefined);
  });

  it("should execute EasyCodingStandard", async () => {
    const ecs = new EasyCodingStandard(config);
    const results = await ecs.version();

    expect(results.code).toBe(0);
    expect(results.stdout.length).toBeGreaterThan(0);
  });

  it("should fail when no checkers are given", async () => {
    config.checkerSets = [];
    const ecs = new EasyCodingStandard(config);

    try {
      await ecs.check(testFile);
    } catch (err) {
      expect(err.stdout).toInclude('Level "" was not found.');
    }
  });

  it("should pass when a checker is present", async () => {
    config.configPath = "";
    const ecs = new EasyCodingStandard(config);

    const { stdout } = await ecs.check(testFile);
    expect(stdout).toInclude("No errors found.");
  });

  it("should fail when a checker is present", async () => {
    const ecs = new EasyCodingStandard(config);

    const { stdout } = await ecs.check(formatFile);
    expect(stdout).toInclude("[WARNING]");
  });

  it("should prioritize config file over ", async () => {
    const ecs = new EasyCodingStandard(config);

    const { stdout } = await ecs.check(formatFile);
    expect(stdout).toInclude("[ERROR]");
  });
});
