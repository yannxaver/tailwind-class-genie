import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "tailwind-class-switcher" is now active!'
  );

  const getWordUnderCursorDisposable = vscode.commands.registerCommand(
    "tailwind-class-switcher.getWordUnderCursor",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const position = editor.selection.active;
        const line = editor.document.lineAt(position.line);
        const lineText = line.text;

        // Find the start and end of the current class
        let start = position.character;
        let end = position.character;

        while (start > 0 && lineText[start - 1] !== " ") {
          start--;
        }

        while (end < lineText.length && lineText[end] !== " ") {
          end++;
        }

        const fullClass = lineText.substring(start, end);
        console.log(fullClass);
        vscode.window.showInformationMessage(
          `Class under cursor: ${fullClass}`
        );
      }
    }
  );

  context.subscriptions.push(getWordUnderCursorDisposable);
}

export function deactivate() {}
