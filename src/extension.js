const path = require('path');
const vscode = require('vscode');

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

function stripExtension(currentFilename, separator) {
    const filenameParts = currentFilename.split(separator);

    let basename = filenameParts[filenameParts.length - 1];
    let extension;
    while (extension = path.extname(basename)) {
        basename = path.basename(basename, extension);
    }

    filenameParts[filenameParts.length - 1] = basename;
    return filenameParts.join(separator);
}

function stripGenericPattern(currentFilename, pattern) {
    if (pattern.startsWith('/') && pattern.endsWith('/')) {
        pattern = new RegExp(pattern.slice(1, pattern.length - 1), 'g');
        currentFilename = currentFilename.replace(pattern, '');
    } else {
        while (currentFilename.includes(pattern)) {
            currentFilename = currentFilename.replace(pattern, '');
        }
    }

    return currentFilename;
}

function stripPatterns(currentFilename, separator, patterns) {
    if (patterns) {
        patterns.forEach(function(pattern) {
            if (pattern === '{EXTENSION}') {
                currentFilename = stripExtension(currentFilename, separator);
            } else {
                currentFilename = stripGenericPattern(currentFilename, pattern);
            }
        });
    }

    return currentFilename;
}

function buildPrefix(currentFilename, workspaceFolder, separator, config) {
    currentFilename = stripWorkspaceFolder(currentFilename, workspaceFolder);
    currentFilename = stripExcessDirectoryLevels(currentFilename, separator, config.directoryLevelsToPreserve);
    currentFilename = stripPatterns(currentFilename, separator, config.patternsToStrip);

    return currentFilename;
}

function showRelatedFiles() {
    const document = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document;

    let prefix;
    if (document) {
        const currentFilename = document.fileName;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        const maybeWorkspaceFolder = workspaceFolder ? workspaceFolder.uri.path : '';
        const separator = path.sep;
        const config = vscode.workspace.getConfiguration('quickOpenRelatedFiles');

        prefix = buildPrefix(currentFilename, maybeWorkspaceFolder, separator, config);
    } else {
        prefix = '';
    }

    vscode.commands.executeCommand('workbench.action.quickOpen', prefix);
}

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('quickOpenRelatedFiles.show', showRelatedFiles));
}

module.exports.buildPrefix = buildPrefix;
module.exports.activate = activate;
