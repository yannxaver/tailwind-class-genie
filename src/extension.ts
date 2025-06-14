import * as vscode from "vscode";
import { findClass } from "./core";
import { getConfigs } from "./config";

let saveTimer: Timer;
let outputChannel: vscode.OutputChannel;

const switchClassFn = async (direction: "up" | "down") => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const position = editor.selection.active;
    const line = editor.document.lineAt(position.line);
    const lineText = line.text;

    let start = position.character;
    let end = position.character;

    const delimiters = [" ", '"', "'", ",", ":", ";", "`"];

    while (start > 0 && !delimiters.includes(lineText[start - 1])) {
      start--;
    }

    while (end < lineText.length && !delimiters.includes(lineText[end])) {
      end++;
    }

    const fullClass = lineText.substring(start, end);
    try {
      outputChannel.appendLine(
        `Attempting to switch class: ${fullClass} in direction: ${direction}`
      );

      const nextClass = findClass(fullClass, direction);

      outputChannel.appendLine(`Next class: ${nextClass}`);

      editor.edit((editBuilder) => {
        editBuilder.replace(
          new vscode.Range(position.line, start, position.line, end),
          nextClass
        );
      });

      trySave(editor);
    } catch (error) {
      if (error instanceof Error) {
        showErrorMessage(error);
        return undefined;
      }
    }
  }

  return undefined;
};

async function trySave(editor: vscode.TextEditor): Promise<void> {
  const configs = getConfigs();

  const autoSave = configs.get("autoSave");
  const autoSaveDelay = configs.get("autoSaveDelay");

  if (autoSave) {
    if (autoSaveDelay && typeof autoSaveDelay === "number") {
      clearTimeout(saveTimer);

      saveTimer = setTimeout(async () => {
        await editor.document.save();
      }, autoSaveDelay);
    } else {
      await editor.document.save();
    }
  }
}

function showErrorMessage(error: Error): void {
  const configs = getConfigs();

  const isSilent = configs.get<boolean>("silent");

  outputChannel.appendLine(`Error: ${error.message}`);

  if(!isSilent) {
    vscode.window.showErrorMessage(error.message);
  }
}

export function activate(context: vscode.ExtensionContext) {
  outputChannel = vscode.window.createOutputChannel("Tailwind Class Genie");
  outputChannel.appendLine("Tailwind Class Genie activated");

  const switchClassDown = vscode.commands.registerCommand(
    "tailwind-class-genie.switchClassDown",
    switchClassFn.bind(null, "down")
  );

  const switchClassUp = vscode.commands.registerCommand(
    "tailwind-class-genie.switchClassUp",
    switchClassFn.bind(null, "up")
  );

  context.subscriptions.push(switchClassDown, switchClassUp, outputChannel);
}

export function deactivate() {}
