import * as vscode from 'vscode';
import Replacer from './Replacer'

export function activate(context: vscode.ExtensionContext) {
	const replacer = new Replacer();

	let disposable = vscode.commands.registerCommand('unescapeCharacters.replace', () => {
		replacer.triggerReplacement();
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}
