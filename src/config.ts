import * as vscode from "vscode";

export function getConfigs(): vscode.WorkspaceConfiguration{
  return vscode.workspace.getConfiguration(
    "tailwind-class-genie"
  );
}
