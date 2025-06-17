import * as vscode from "vscode";
import { getExtensionConfiguration } from "./config";

export class Logger {
  public outputChannel: vscode.OutputChannel;

  constructor(name: string) {
    this.outputChannel = vscode.window.createOutputChannel(name);
  }

  log(...args: string[]) {
    this.outputChannel.appendLine(`[LOG] ${args.join(",")}`);
  }

  error(...args: string[]) {
    const config = getExtensionConfiguration();
    const isSilent = config.get<boolean>("silent");

    const errMsg = `[ERROR] ${args.join(",")}`;

    this.outputChannel.appendLine(errMsg);

    if (!isSilent) {
      vscode.window.showErrorMessage(errMsg);
    }
  }
}
