import { WorkspaceConfiguration } from "vscode";
import { homedir } from "os";
import { resolve, sep } from "path";
import { existsSync } from "fs";
import { CheckerSet, IConfig } from "./IConfig";
import { NoCheckersFound, NoExecutableFound } from "./errors";

export class Config {
  static create = (
    config: WorkspaceConfiguration,
    rootDir: string
  ): IConfig => {
    const enable = config.get("enable", false);
    const onSave = config.get("onSave", false);
    const checkerSets = config.get("checkerSets", [CheckerSet.psr2]);

    let configPath = config.get("configPath", "easy-coding-standard.yml");
    let executablePath = config.get("executablePath", "ecs");

    configPath = Config.normalizePath(configPath, rootDir);
    executablePath = Config.normalizePath(executablePath, rootDir);

    return { enable, onSave, executablePath, checkerSets, configPath };
  };

  static verify = (config: IConfig) => {
    if (Config.executableInvalid(config)) {
      throw new NoExecutableFound(
        `Executable not found: ${config.executablePath}`
      );
    }

    if (Config.checkersInvalid(config)) {
      throw new NoCheckersFound();
    }

    return true;
  };

  private static normalizePath = (path: string, rootDir: string) => {
    let normalizedPath = path;

    if (normalizedPath.startsWith("~")) {
      // TODO: Support Windows
      normalizedPath = normalizedPath.replace(/^~\//, `${homedir()}${sep}`);
    } else {
      // TODO: Need a robust checking of given path
      normalizedPath = resolve(rootDir, normalizedPath);
    }

    return normalizedPath;
  };

  private static executableInvalid(config: IConfig) {
    return !existsSync(config.executablePath);
  }

  private static checkersInvalid(config: IConfig) {
    return !existsSync(config.configPath) && config.checkerSets.length === 0;
  }
}
