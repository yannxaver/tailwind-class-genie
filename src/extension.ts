import * as vscode from "vscode";
import {
  classTypeLookUpTable,
  classTypeToClassTypeOptionsMap,
} from "./classes";

const switchClassFn = (direction: "up" | "down") => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const position = editor.selection.active;
    const line = editor.document.lineAt(position.line);
    const lineText = line.text;

    let start = position.character;
    let end = position.character;

    const delimiters = [" ", '"', "'", ","];

    while (start > 0 && !delimiters.includes(lineText[start - 1])) {
      start--;
    }

    while (end < lineText.length && !delimiters.includes(lineText[end])) {
      end++;
    }

    const fullClass = lineText.substring(start, end);

    const classType = classTypeLookUpTable[fullClass];
    if (!classType) {
      return vscode.window.showInformationMessage(
        `Class "${fullClass}" is not a supported class`
      );
    }

    const classTypeOptions = classTypeToClassTypeOptionsMap[classType];
    if (!classTypeOptions) {
      return vscode.window.showInformationMessage(
        `Internal error: classTypeOptions is undefined for classType "${classType}"`
      );
    }

    const currentClassIndex = classTypeOptions.findIndex(
      (option) => option === fullClass
    );
    let nextClassIndex = currentClassIndex + (direction === "up" ? 1 : -1);
    if (nextClassIndex < 0) {
      nextClassIndex = classTypeOptions.length - 1;
    } else if (nextClassIndex >= classTypeOptions.length) {
      nextClassIndex = 0;
    }
    const nextClass = classTypeOptions[nextClassIndex];

    editor.edit((editBuilder) => {
      editBuilder.replace(
        new vscode.Range(position.line, start, position.line, end),
        nextClass
      );
    });
  }
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
