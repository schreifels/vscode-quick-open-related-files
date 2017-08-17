const vscode = require('vscode');

function quickOpen() {
  const { fileName } = vscode.window.activeTextEditor.document;
  const fileNameParts = fileName.split('/');
  const prefilledText = fileNameParts[fileNameParts.length - 1];
  vscode.commands.executeCommand('workbench.action.quickOpen', prefilledText);
}

function activate(context) {
  context.subscriptions.push(vscode.commands.registerCommand('extension.sayHello', quickOpen));
}

module.exports.activate = activate;
