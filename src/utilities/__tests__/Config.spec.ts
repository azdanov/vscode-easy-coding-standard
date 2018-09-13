import { Config } from "../Config";
import "jest-extended";

describe("Config", () => {
  let workspaceConfig: any;
  let executablePath: string;
  const rootDir = "/test";

  beforeEach(() => {
    executablePath = "vendor/bin/ecs";
    workspaceConfig = {
      get: jest.fn((section: string) => {
        switch (section) {
          case "checkerSets":
            return ["prs2"];
          case "executablePath":
            return executablePath;
          default:
            return true;
        }
      })
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it("should return a valid configuration file", () => {
    const config = Config.create(workspaceConfig, rootDir);

    expect(config).toMatchInlineSnapshot(`
Object {
  "checkerSets": Array [
    "prs2",
  ],
  "enable": true,
  "executablePath": "/test/vendor/bin/ecs",
  "onSave": true,
}
`);
    expect(config).toBeObject();
  });

  it("should return enabled option", () => {
    const config = Config.create(workspaceConfig, rootDir);

    expect(config.enable).toBeBoolean();
  });

  it("should return onSave option", () => {
    const config = Config.create(workspaceConfig, rootDir);

    expect(config.onSave).toBeBoolean();
  });

  it("should return executablePath option", () => {
    const config = Config.create(workspaceConfig, rootDir);

    expect(config.executablePath).toBeString();
    expect(config.executablePath).toBe(`${rootDir}/${executablePath}`);
  });

  it("should return an absolute path when given relative to home", () => {
    const { Config } = require("../Config");

    jest.mock("os", () => ({ homedir: () => "/home" }));
    executablePath = "~/.composer/vendor/bin/ecs";

    const config = Config.create(workspaceConfig, rootDir);

    expect(config.executablePath).toBeString();
    expect(config.executablePath).toBe("/home/.composer/vendor/bin/ecs");
  });
});
