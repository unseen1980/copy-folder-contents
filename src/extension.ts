import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'extension.copyFolderContents',
    async (uri: vscode.Uri | undefined, uris?: vscode.Uri[]) => {
      const selectedUris = uris && uris.length > 0 ? uris : uri ? [uri] : [];

      if (selectedUris.length === 0) {
        vscode.window.showErrorMessage('No folder selected.');
        return;
      }

      // Filter to only folders
      const folderUris = selectedUris.filter((item) => {
        try {
          return fs.statSync(item.fsPath).isDirectory();
        } catch {
          return false;
        }
      });

      if (folderUris.length === 0) {
        vscode.window.showErrorMessage('Please select a valid folder.');
        return;
      }

      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: 'Copying folder contents to clipboard...',
          cancellable: false,
        },
        async (progress) => {
          const result: string[] = [];

          const walk = (dir: string) => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
              const filePath = path.join(dir, file);
              try {
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                  walk(filePath);
                } else {
                  try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    result.push(`${filePath}\n${'-'.repeat(50)}\n${content}\n`);
                  } catch (err) {
                    result.push(
                      `${filePath}\n${'-'.repeat(50)}\n[Error reading file: ${err}]\n`
                    );
                  }
                }
              } catch (err) {
                result.push(
                  `${filePath}\n${'-'.repeat(50)}\n[Error accessing file: ${err}]\n`
                );
              }
            }
          };

          try {
            folderUris.forEach((folderUri) => {
              walk(folderUri.fsPath);
            });

            const finalText = result.join('\n');

            await vscode.env.clipboard.writeText(finalText);

            vscode.window.showInformationMessage(
              `Copied contents of ${folderUris.length} folder(s) to clipboard!`
            );
          } catch (error: any) {
            vscode.window.showErrorMessage(`Error: ${error.message || error}`);
          }

          progress.report({ increment: 100 });
        }
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
