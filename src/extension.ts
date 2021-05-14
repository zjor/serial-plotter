import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "serial-plotter" is now active!');

	let disposable = vscode.commands.registerCommand('serial-plotter.run', () => {
		const panel = vscode.window.createWebviewPanel(
      'serialPlotter', 
      'Serial Plotter', 
      vscode.ViewColumn.One, 
      {} 
    );
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
