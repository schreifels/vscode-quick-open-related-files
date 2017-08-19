const path = require('path');
const vscode = require('vscode');

function stripExtension(basename) {
    let extension;

    while (extension = path.extname(basename)) {
        basename = path.basename(basename, extension);
    }

    return basename;
}

function buildPrefix(currentFilename, workspaceFolder, separator, config) {
    if (workspaceFolder && currentFilename.indexOf(workspaceFolder) === 0) {
        currentFilename = currentFilename.slice(workspaceFolder.length);
    }

    let filenameParts = currentFilename.split(separator);
    const index = filenameParts.length - 1 - config.levelsToPreserve;
    const boundedIndex = Math.min(Math.max(index, 1), filenameParts.length - 1);
    filenameParts = filenameParts.slice(boundedIndex);

    if (config.transformations) {
        config.transformations.forEach((transformation) => {
            if (transformation === '{EXTENSION}') {
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
