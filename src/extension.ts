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
  let config = createConfig();
  let ecs = new EasyCodingStandard(config);

  const outputChannel = new Output(
    window.createOutputChannel("EasyCodingStandard")
  );

  workspace.onDidChangeConfiguration(() => {
    config = createConfig();
    ecs = new EasyCodingStandard(config);
  });

  // TODO: Add progress bar
  context.subscriptions.push(
    commands.registerCommand("extension.ecs-version", async () => {
      // TODO: Refactor enable check
      if (!config.enable) {
        window.showWarningMessage("EasyCodingStandard is disabled");
        return;
      }

      const { stdout } = await ecs.version();
      outputChannel.send(stdout);
    })
  );

  // TODO: Refactor command subscriptions to reduce repetition
  context.subscriptions.push(
    commands.registerTextEditorCommand("extension.ecs-check", async editor => {
      if (!config.enable) {
        window.showWarningMessage("EasyCodingStandard is disabled");
        return;
      }

      const currentFile = editor.document.uri.fsPath;

      const { stdout } = await ecs.check(currentFile);

      outputChannel.send(stdout);
    })
  );

  context.subscriptions.push(
    commands.registerTextEditorCommand("extension.ecs-fix", async editor => {
      if (!config.enable) {
        window.showWarningMessage("EasyCodingStandard is disabled");
        return;
      }

      const currentFile = editor.document.uri.fsPath;

      const { stdout } = await ecs.fix(currentFile);

      outputChannel.send(stdout);
    })
  );

  context.subscriptions.push(
    commands.registerCommand("extension.ecs-check-folder", async folder => {
      if (!config.enable) {
        window.showWarningMessage("EasyCodingStandard is disabled");
        return;
      }

      const { stdout } = await ecs.check(folder.fsPath);

      outputChannel.send(stdout);
    })
  );

  context.subscriptions.push(
    commands.registerCommand("extension.ecs-fix-folder", async folder => {
      if (!config.enable) {
        window.showWarningMessage("EasyCodingStandard is disabled");
        return;
      }

      const { stdout } = await ecs.fix(folder.fsPath);

      outputChannel.send(stdout);
    })
  );

  context.subscriptions.push(
    commands.registerCommand("extension.ecs-check-file", async file => {
      if (!config.enable) {
        window.showWarningMessage("EasyCodingStandard is disabled");
        return;
      }

      const { stdout } = await ecs.check(file.fsPath);

      outputChannel.send(stdout);
    })
  );

  context.subscriptions.push(
    commands.registerCommand("extension.ecs-fix-file", async file => {
      if (!config.enable) {
        window.showWarningMessage("EasyCodingStandard is disabled");
        return;
      }

      const { stdout } = await ecs.fix(file.fsPath);

      outputChannel.send(stdout);
    })
  );

  context.subscriptions.push(ecs);
}

export function deactivate() {}
