import * as execa from "execa";
import { IConfig } from "../utilities/IConfig";

export class EasyCodingStandard {
  constructor(private config: IConfig) {}

  check(fileName: string) {
    return execa(
      this.config.executablePath,
      [
        "check",
        ...this.pickRules(),
        ...EasyCodingStandard.consoleFlags(),
        fileName
      ],
      { reject: false }
    );
  }

  fix(fileName: string) {
    return execa(
      this.config.executablePath,
      [
        "check",
        "--fix",
        ...this.pickRules(),
        ...EasyCodingStandard.consoleFlags(),
        fileName
      ],
      { reject: false }
    );
  }

  version() {
    return execa(this.config.executablePath, ["--version"]);
  }

  private pickRules() {
    if (this.config.configPath) {
      return ["--config", this.config.configPath];
    }
    return ["--level", this.config.ruleSet];
  }

  private static consoleFlags() {
    return ["--no-progress-bar", "--no-ansi"];
  }

  dispose() {}
}
