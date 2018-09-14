import { commands, ExtensionContext, window, workspace } from "vscode";
import { EasyCodingStandard } from "./main/EasyCodingStandard";
import { Config } from "./utilities/Config";
import { Output } from "./utilities/Output";

function createConfig() {
  const workspaceConfig = workspace.getConfiguration("ecs", null);

  const rootDir =
    (workspace.workspaceFolders && workspace.workspaceFolders[0].uri.fsPath) ||
    process.cwd();

  const config = Config.create(workspaceConfig, rootDir);

  try {
    Config.verify(config);
  } catch (error) {
    window.showErrorMessage(error.message);
  }
  return config;
}

export function activate(context: ExtensionContext) {
  let ecs = new EasyCodingStandard(createConfig());

  const outputChannel = new Output(
    window.createOutputChannel("EasyCodingStandard")
  );

  workspace.onDidChangeConfiguration(() => {
    ecs = new EasyCodingStandard(createConfig());
  });

  // TODO: Add progress bar
  context.subscriptions.push(
    commands.registerCommand("extension.ecs-version", async () => {
      const { stdout } = await ecs.version();
      outputChannel.send(stdout);
    })
  );

  context.subscriptions.push(
    commands.registerCommand("extension.ecs-check", async () => {
      const editor = window.activeTextEditor;
      if (!editor || !(editor.document.languageId === "php")) {
        window.showWarningMessage(
          "This command can only be executed on a php file."
        );
        return;
      }

      const currentFile = editor.document.uri.fsPath;

      const { stdout } = await ecs.check(currentFile!);

      outputChannel.send(stdout);
    })
  );

  context.subscriptions.push(
    commands.registerCommand("extension.ecs-fix", async () => {
      const editor = window.activeTextEditor;
      if (!editor || !(editor.document.languageId === "php")) {
        window.showWarningMessage(
          "This command can only be executed on a php file."
        );
        return;
      }

      const currentFile = editor.document.uri.fsPath;

      const { stdout } = await ecs.fix(currentFile!);

      outputChannel.send(stdout);
    })
  );
  context.subscriptions.push(ecs);
}

export function deactivate() {}
