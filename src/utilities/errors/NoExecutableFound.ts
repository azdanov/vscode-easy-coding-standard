export class NoExecutableFound extends Error {
  constructor(message: string = "Executable not found") {
    super(message);
  }
}
