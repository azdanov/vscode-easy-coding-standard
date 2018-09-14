export enum RuleSet {
  "" = "",
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

export interface IConfig {
  ruleSet: RuleSet;
  configPath: string;
  enable: boolean;
  executablePath: string;
  onSave: boolean;
}
