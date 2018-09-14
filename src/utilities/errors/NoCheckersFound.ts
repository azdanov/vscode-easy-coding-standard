export class NoCheckersFound extends Error {
  constructor(
    message: string = "No checkers specified. Please provide a config path or select a predefined ruleset."
  ) {
    super(message);
  }
}
