import * as vscode from "vscode";
import { getExtensionConfiguration } from "./config";
import { findClass } from "./core";
import { Logger } from "./logger";

let saveTimer: Timer;
const logger = new Logger("Tailwind Class Genie");

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
      logger.log(
        `Attempting to switch class: ${fullClass} in direction: ${direction}`
      );

      const nextClass = findClass(fullClass, direction);

      logger.log(`Next class: ${nextClass}`);

      editor.edit((editBuilder) => {
        editBuilder.replace(
          new vscode.Range(position.line, start, position.line, end),
          nextClass
        );
      });

      trySave(editor);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        return undefined;
      }
    }
  }

  return undefined;
};

async function trySave(editor: vscode.TextEditor): Promise<void> {
  const config = getExtensionConfiguration();

  const autoSave = config.get("autoSave");
  const autoSaveDelay = config.get("autoSaveDelay");

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

export function activate(context: vscode.ExtensionContext) {
  logger.log("Tailwind Class Genie activated");

  const switchClassDown = vscode.commands.registerCommand(
    "tailwind-class-genie.switchClassDown",
    switchClassFn.bind(null, "down")
  );

  const switchClassUp = vscode.commands.registerCommand(
    "tailwind-class-genie.switchClassUp",
    switchClassFn.bind(null, "up")
  );

  context.subscriptions.push(
    switchClassDown,
    switchClassUp,
    logger.outputChannel
  );
}

export function deactivate() {}
