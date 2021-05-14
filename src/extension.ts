import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('serial-plotter.run', async () => {
    const panel = vscode.window.createWebviewPanel(
      'serialPlotter',
      'Serial Plotter',
      vscode.ViewColumn.One,
      {        
        enableScripts: true,
      }
    );

    const filename = path.join(context.extensionPath, 'content', 'index.html');
    panel.webview.html = await (await readFile(filename)).toString();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
