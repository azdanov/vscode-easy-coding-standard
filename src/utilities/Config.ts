import { WorkspaceConfiguration } from "vscode";
import { homedir } from "os";
import { resolve, sep } from "path";
import { existsSync } from "fs";
import { RuleSet, IConfig } from "./IConfig";
import { NoRulesetsFound, NoExecutableFound } from "./errors";

export class Config {
  static create = (
    config: WorkspaceConfiguration,
    rootDir: string
  ): IConfig => {
    const enable = config.get("enable", true);
    const onSave = config.get("onSave", false);
    const ruleSet = config.get("ruleSet", RuleSet[""]);

    let configPath = config.get("configPath", "easy-coding-standard.yml");
    let executablePath = config.get("executablePath", "ecs");

    configPath = Config.normalizePath(configPath, rootDir);
    executablePath = Config.normalizePath(executablePath, rootDir);

    return { enable, onSave, executablePath, ruleSet, configPath };
  };

  static verify = (config: IConfig) => {
    if (!config.enable) {
      return;
    }

    if (Config.executableInvalid(config)) {
      throw new NoExecutableFound(
        `Executable not found: ${config.executablePath}`
      );
    }

    if (Config.rulesetInvalid(config)) {
      throw new NoRulesetsFound();
    }
  };

  private static normalizePath = (path: string, rootDir: string) => {
    if (path.startsWith("~")) {
      // TODO: Support Windows
      return path.replace(/^~\//, `${homedir()}${sep}`);
    }

    if (path.length > 0) {
      // TODO: Need a robust checking of given path
      return resolve(rootDir, path);
    }

    return "";
  };

  private static executableInvalid(config: IConfig) {
    return !existsSync(config.executablePath);
  }

  private static rulesetInvalid(config: IConfig) {
    return !existsSync(config.configPath) && config.ruleSet.length === 0;
  }
}
