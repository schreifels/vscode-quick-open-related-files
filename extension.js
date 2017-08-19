const path = require('path');
const vscode = require('vscode');

function stripExtension(basename) {
    let extension;

    while (extension = path.extname(basename)) {
        basename = path.basename(basename, extension);
    }

    return basename;
}

function stripWorkspaceFolder(currentFilename, workspaceFolder) {
    if (workspaceFolder && currentFilename.indexOf(workspaceFolder) === 0) {
        return currentFilename.slice(workspaceFolder.length);
    } else {
        return currentFilename;
    }
}

function stripExcessDirectoryLevels(currentFilename, separator, directoryLevelsToPreserve) {
    const filenameParts = currentFilename.split(separator);
    const startingIndex = filenameParts.length - 1 - directoryLevelsToPreserve;
    const boundedStartingIndex = Math.min(Math.max(startingIndex, 1), filenameParts.length - 1);
    return filenameParts.slice(boundedStartingIndex).join(separator);
}

function buildPrefix(currentFilename, workspaceFolder, separator, config) {
    currentFilename = stripWorkspaceFolder(currentFilename, workspaceFolder);
    currentFilename = stripExcessDirectoryLevels(currentFilename, separator, config.directoryLevelsToPreserve);

    const filenameParts = currentFilename.split(separator);

    if (config.patternsToStrip) {
        config.patternsToStrip.forEach((pattern) => {
            if (pattern === '{EXTENSION}') {
                filenameParts[filenameParts.length - 1] = stripExtension(filenameParts[filenameParts.length - 1]);
            }
        });
    }

    return filenameParts.join(separator);
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
