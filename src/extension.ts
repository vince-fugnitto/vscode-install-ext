
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-install-ext.installExtension', async () => {
		const openDialogOptions: vscode.OpenDialogOptions = {
			canSelectMany: false,
			filters: { 'vsix': ['vsix'] },
			openLabel: 'Install Extension'
		};
		const uri = await vscode.window.showOpenDialog(openDialogOptions);
		if (!uri) {
			vscode.window.showInformationMessage('No ".vsix" file opened');
		}
		try {
			await vscode.commands.executeCommand('workbench.extensions.installExtension', uri![0]);
			vscode.window.showInformationMessage('Extension successfully installed.');
		} catch (e) {
			vscode.window.showErrorMessage(`Error installing extension: ${e}`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
