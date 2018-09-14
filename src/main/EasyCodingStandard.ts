import * as execa from "execa";
import { IConfig } from "../utilities/IConfig";

export class EasyCodingStandard {
  constructor(private config: IConfig) {}

  check(fileName: string) {
    return execa(
      this.config.executablePath,
      [
        "check",
        fileName,
        ...this.pickRules(),
        "--no-progress-bar",
        "--no-ansi"
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
    return ["--level", this.config.checkerSets.join(" ")];
  }

  dispose() {}
}
