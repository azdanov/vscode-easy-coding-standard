import { commands, ExtensionContext, window, workspace } from "vscode";
import { EasyCodingStandard } from "./EasyCodingStandard";
import { Config } from "./utilities/Config";

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

  context.subscriptions.push(
    commands.registerCommand("extension.ecs-version", async () => {
      const editor = window.activeTextEditor;
      if (!editor) {
        return;
      }

      const doc = editor.document;

      if (doc.languageId === "php") {
        const { stdout } = await ecs.version();
        window.showInformationMessage(stdout);
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
        try {
          const { stdout } = await ecs.check(currentFile!, config.checkerSets);
          message = stdout;
        } catch (err) {
          message = err;
        }
        const outputChannel = window.createOutputChannel("EasyCodingStandard");

        outputChannel.show();

        const title = `${new Date().toLocaleString()}:`;

        outputChannel.appendLine(title);
        outputChannel.appendLine("-".repeat(title.length));
        outputChannel.appendLine(`${message}\n`);
      }
    })
  );
  context.subscriptions.push(ecs);
}

export function deactivate() {}
