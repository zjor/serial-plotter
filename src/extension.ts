import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as SerialPort from 'serialport';

const readFile = util.promisify(fs.readFile);

async function renderContent(context: vscode.ExtensionContext, panel: vscode.WebviewPanel) {
  const filename = path.join(context.extensionPath, 'content', 'index.html');
  panel.webview.html = await (await readFile(filename)).toString();
}

function startReading(panel: vscode.WebviewPanel) {
  const port = new SerialPort('/dev/cu.SLAB_USBtoUART', {
    baudRate: 115200
  }, (err: any) => console.log(err));

  port.on('data', (data: any) => {
    console.log(data);
  });
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
    startReading(panel);      

    panel.onDidDispose(() => {
    }, undefined, context.subscriptions);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
