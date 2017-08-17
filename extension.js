const path = require('path');
const vscode = require('vscode');

function showRelatedFiles() {
    const separator = path.sep;
    const { levelsToPreserve } = vscode.workspace.getConfiguration('quickPickRelatedFiles');

    const { fileName } = vscode.window.activeTextEditor.document;
    const fileNameParts = fileName.split(separator);
    const prefilledText = fileNameParts.slice(fileNameParts.length - 1 - levelsToPreserve).join(separator);

    vscode.commands.executeCommand('workbench.action.quickOpen', prefilledText);
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('quickPickRelatedFiles.show', showRelatedFiles));
}

module.exports.activate = activate;
