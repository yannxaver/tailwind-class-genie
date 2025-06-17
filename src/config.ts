import * as vscode from "vscode";

export function getExtensionConfiguration(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration("tailwind-class-genie");
}
