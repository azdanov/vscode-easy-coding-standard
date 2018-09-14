import { WorkspaceConfiguration } from "vscode";
import { homedir } from "os";

import { resolve, sep } from "path";
import { CheckerSets } from "../EasyCodingStandard";

export class Config {
  static create = (config: WorkspaceConfiguration, rootDir: string) => {
    const enable = config.get("enable", false);

    const onSave = config.get("onSave", false);

    const checkerSets = config.get("checkerSets", [CheckerSets.psr2]);

    let configPath = config.get("configPath", "easy-coding-standard.yml");

    let executablePath = config.get("executablePath", "ecs");

    configPath = Config.normalizePath(configPath, rootDir);
    executablePath = Config.normalizePath(executablePath, rootDir);

    return { enable, onSave, executablePath, checkerSets, configPath };
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
}
