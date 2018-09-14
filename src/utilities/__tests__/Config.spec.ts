import { Config } from "../Config";
import "jest-extended";

describe("Config", () => {
  let workspaceConfig: any;
  let executablePath: string;
  let configPath: string;
  const rootDir = "/test";

  beforeEach(() => {
    executablePath = "vendor/bin/ecs";
    configPath = "easy-coding-standard.yml";
    workspaceConfig = {
      get: jest.fn((section: string) => {
        switch (section) {
          case "configPath":
            return configPath;
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
  "configPath": "/test/easy-coding-standard.yml",
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

  it("should return configPath option", () => {
    const config = Config.create(workspaceConfig, rootDir);

    expect(config.configPath).toBeString();
    expect(config.configPath).toBe(`${rootDir}/${configPath}`);
  });

  it("should return an absolute path for executable when given a relative path", () => {
    const { Config } = require("../Config");

    jest.mock("os", () => ({ homedir: () => "/home" }));
    executablePath = "~/.composer/vendor/bin/ecs";

    const config = Config.create(workspaceConfig, rootDir);

    expect(config.executablePath).toBeString();
    expect(config.executablePath).toBe("/home/.composer/vendor/bin/ecs");
  });

  it("should return an absolute path for config when given a relative path", () => {
    const { Config } = require("../Config");

    jest.mock("os", () => ({ homedir: () => "/home" }));
    configPath = `~/easy-coding-standard.yml`;

    const config = Config.create(workspaceConfig, rootDir);

    expect(config.configPath).toBeString();
    expect(config.configPath).toBe("/home/easy-coding-standard.yml");
  });
});
