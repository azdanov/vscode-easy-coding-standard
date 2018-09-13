import { commands, ExtensionContext, window, workspace } from "vscode";
import { EasyCodingStandard } from "./EasyCodingStandard";
import { Config } from "./utilities/Config";
import { Output } from "./utilities/Output";

export function activate(context: ExtensionContext) {
  const workspaceConfig = workspace.getConfiguration(
    "ecs",
    window.activeTextEditor && window.activeTextEditor.document.uri
  );

  const rootDir =
    (workspace.workspaceFolders && workspace.workspaceFolders[0].uri.fsPath) ||
    process.cwd();

  const config = Config.create(workspaceConfig, rootDir);

  const ecs = new EasyCodingStandard(config.executablePath);

  const outputChannel = new Output(
    window.createOutputChannel("EasyCodingStandard")
  );

  context.subscriptions.push(
    commands.registerCommand("extension.ecs-version", async () => {
      const editor = window.activeTextEditor;
      if (!editor) {
        return;
      }

      const doc = editor.document;

      if (doc.languageId === "php") {
        const { stdout } = await ecs.version();
        window.showInformationMessage(stdout.trim());
      }
    })
  );

  context.subscriptions.push(
    commands.registerCommand("extension.ecs-check", async () => {
      const editor = window.activeTextEditor;
      if (!editor) {
        return;
      }

      const currentFile =
        window.activeTextEditor && window.activeTextEditor.document.uri.fsPath;

      const doc = editor.document;

      if (doc.languageId === "php") {
        let message: string;

        const { stdout } = await ecs.check(currentFile!, config.checkerSets);
        message = stdout.trim();

        outputChannel.send(message);
      }
    })
  );
  context.subscriptions.push(ecs);
}

export function deactivate() {}
