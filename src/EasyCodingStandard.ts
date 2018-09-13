import * as execa from "execa";

export class EasyCodingStandard {
  constructor(private executablePath: string) {}

  check(fileName: string, checkerSets: string[]) {
    return execa(this.executablePath, [
      "check",
      fileName,
      "--level",
      checkerSets.join(" "),
      "--no-progress-bar"
    ]);
  }

  version() {
    console.log(this.executablePath);
    return execa(this.executablePath, ["--version"]);
  }

  dispose() {}
}
