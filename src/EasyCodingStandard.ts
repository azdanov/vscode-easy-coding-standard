import * as execa from "execa";

export enum CheckerSets {
  "clean-code" = "clean-code",
  "common" = "common",
  "php70" = "php70",
  "php71" = "php71",
  "psr2" = "psr2",
  "psr12" = "psr12",
  "symfony" = "symfony",
  "symfony-risky" = "symfony-risky",
  "symplify" = "symplify"
}

export interface EasyCodingStandardProps {
  checkerSets: CheckerSets[];
  configPath: string;
  enable: boolean;
  executablePath: string;
  onSave: boolean;
}

export class EasyCodingStandard {
  constructor(private config: EasyCodingStandardProps) {}

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

  private pickRules = () => {
    if (this.config.configPath) {
      return ["--config", this.config.configPath];
    }
    return ["--level", this.config.checkerSets.join(" ")];
  };

  dispose() {}
}
