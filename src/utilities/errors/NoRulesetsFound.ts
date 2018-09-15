export class NoRulesetsFound extends Error {
  constructor(
    message: string = "No rules are active. Please select a predefined ruleset or provide the path to a configuration file."
  ) {
    super(message);
  }
}
