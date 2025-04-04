import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.copyFolderContents",
    async (resource: vscode.Uri) => {
      if (!resource || !resource.fsPath) {
        vscode.window.showErrorMessage("No folder selected.");
        return;
      }

      const folderPath = resource.fsPath;
      const result: string[] = [];

      const walk = (dir: string) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            walk(filePath);
          } else {
            try {
              const content = fs.readFileSync(filePath, "utf8");
              result.push(`${filePath}\n${"-".repeat(50)}\n${content}\n`);
            } catch (err) {
              result.push(
                `${filePath}\n${"-".repeat(50)}\n[Error reading file: ${err}]\n`
              );
            }
          }
        }
      };

      try {
        walk(folderPath);
        const finalText = result.join("\n");
        await vscode.env.clipboard.writeText(finalText);
        vscode.window.showInformationMessage(
          "Folder contents copied to clipboard!"
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
