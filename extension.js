const path = require('path');
const vscode = require('vscode');

function buildPrefix(currentFilename, separator, config) {
    const { levelsToPreserve } = config;

    const fileNameParts = currentFilename.split(separator);
    return fileNameParts.slice(Math.max(fileNameParts.length - 1 - levelsToPreserve, 1)).join(separator);
}

function showRelatedFiles() {
    const currentFilename = vscode.window.activeTextEditor.document.fileName;
    const separator = path.sep;
    const config = vscode.workspace.getConfiguration('quickPickRelatedFiles');

    const prefix = buildPrefix(currentFilename, separator, config);
    vscode.commands.executeCommand('workbench.action.quickOpen', prefix);
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('quickPickRelatedFiles.show', showRelatedFiles));
}

module.exports.buildPrefix = buildPrefix;
module.exports.activate = activate;
