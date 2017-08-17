const vscode = require('vscode');

function showRelatedFiles() {
  const { fileName } = vscode.window.activeTextEditor.document;
  const fileNameParts = fileName.split('/');
  const prefilledText = fileNameParts[fileNameParts.length - 1];
  vscode.commands.executeCommand('workbench.action.quickOpen', prefilledText);
}

function activate(context) {
  context.subscriptions.push(vscode.commands.registerCommand('quickPickRelatedFiles.show', showRelatedFiles));
}

module.exports.activate = activate;
