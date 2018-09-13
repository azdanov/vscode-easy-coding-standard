import { OutputChannel } from "vscode";

export class Output {
  constructor(private outputChannel: OutputChannel) {}

  send(message: string) {
    const title = `${new Date().toLocaleString()}:`;

    this.outputChannel.show();
    this.outputChannel.appendLine(title);
    this.outputChannel.appendLine("-".repeat(title.length));
    this.outputChannel.appendLine(`${message}\n`);
  }
}
