const path = require('path');
const vscode = require('vscode');

function buildPrefix(currentFilename, workspaceFolder, separator, config) {
    const { levelsToPreserve } = config;

    if (workspaceFolder && currentFilename.indexOf(workspaceFolder) === 0) {
        currentFilename = currentFilename.slice(workspaceFolder.length);
    }

    const filenameParts = currentFilename.split(separator);

    const index = filenameParts.length - 1 - levelsToPreserve;
    const boundedIndex = Math.min(Math.max(index, 1), filenameParts.length - 1);
    return filenameParts.slice(boundedIndex).join(separator);
}

function showRelatedFiles() {
    const { document } = vscode.window.activeTextEditor;

    const currentFilename = document.fileName;
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri).uri.path;
    const separator = path.sep;
    const config = vscode.workspace.getConfiguration('quickPickRelatedFiles');

    const prefix = buildPrefix(currentFilename, workspaceFolder, separator, config);
    vscode.commands.executeCommand('workbench.action.quickOpen', prefix);
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('quickPickRelatedFiles.show', showRelatedFiles));
}

module.exports.buildPrefix = buildPrefix;
module.exports.activate = activate;
