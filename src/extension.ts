import * as vscode from "vscode";
import { findClass } from "./core";

const switchClassFn = (direction: "up" | "down") => {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const position = editor.selection.active;
    const line = editor.document.lineAt(position.line);
    const lineText = line.text;

    let start = position.character;
    let end = position.character;

    const delimiters = [" ", '"', "'", ",", ":"];

    while (start > 0 && !delimiters.includes(lineText[start - 1])) {
      start--;
    }

    while (end < lineText.length && !delimiters.includes(lineText[end])) {
      end++;
    }

    const fullClass = lineText.substring(start, end);

    try {
      const nextClass = findClass(fullClass, direction);
      editor.edit((editBuilder) => {
        editBuilder.replace(
          new vscode.Range(position.line, start, position.line, end),
          nextClass
        );
      });
    } catch (error) {
      if (error instanceof Error) {
        return vscode.window.showErrorMessage(error.message);
      }
    }
  }

  return undefined;
};

export function activate(context: vscode.ExtensionContext) {
  const switchClassDown = vscode.commands.registerCommand(
    "tailwind-class-switcher.switchClassDown",
    switchClassFn.bind(null, "down")
  );

  const switchClassUp = vscode.commands.registerCommand(
    "tailwind-class-switcher.switchClassUp",
    switchClassFn.bind(null, "up")
  );

  context.subscriptions.push(switchClassDown, switchClassUp);
}

export function deactivate() {}
