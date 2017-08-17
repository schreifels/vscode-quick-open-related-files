const path = require('path');
const vscode = require('vscode');

function buildPrefix(currentFilename, projectPath, separator, config) {
    const { levelsToPreserve } = config;

    if (currentFilename.indexOf(projectPath) === 0) {
        currentFilename = currentFilename.slice(projectPath.length);
    }

    const filenameParts = currentFilename.split(separator);

    const index = filenameParts.length - 1 - levelsToPreserve;
    const boundedIndex = Math.min(Math.max(index, 1), filenameParts.length - 1);
    return filenameParts.slice(boundedIndex).join(separator);
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
