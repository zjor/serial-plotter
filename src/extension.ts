import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

async function renderContent(context: vscode.ExtensionContext, panel: vscode.WebviewPanel) {
  const filename = path.join(context.extensionPath, 'content', 'index.html');
  panel.webview.html = await (await readFile(filename)).toString();
}

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
    renderContent(context, panel);
    const interval = setInterval(() => {
      panel.webview.postMessage({
        data: [new Date().getTime()]
      });

    }, 1000);
    panel.onDidDispose(() => {
      clearInterval(interval);
    }, undefined, context.subscriptions);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
