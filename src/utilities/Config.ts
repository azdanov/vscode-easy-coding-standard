import { WorkspaceConfiguration } from "vscode";
import { homedir } from "os";

import { resolve, sep } from "path";

export class Config {
  static create = (config: WorkspaceConfiguration, rootDir: string) => {
    const enable = config.get("enable", false);

    const onSave = config.get("onSave", false);

    const checkerSets = config.get("checkerSets", ["psr2"]);

    let executablePath = config.get("executablePath", "ecs");

    if (executablePath.startsWith("~")) {
      // TODO: Support Windows
      executablePath = executablePath.replace(/^~\//, `${homedir()}${sep}`);
    } else {
      // TODO: Need a robust checking of given path
      executablePath = resolve(rootDir, executablePath);
    }

    return { enable, onSave, executablePath, checkerSets };
  };
}
