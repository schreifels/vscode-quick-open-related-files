# Overview

In a large project, related files often have similar names, but they tend to be
long and tedious to type when navigating the codebase.
quick-open-related-files is a VS Code extension that launches the quick open
menu with the current filename pre-filled (after applying an optional set of
transformations, e.g. removing the file extension).

For example, if you are viewing `app/views/rocket_launch.html.erb` and trigger
quick-open-related-files, depending on your configuration, you might see:

<img src="https://raw.githubusercontent.com/schreifels/vscode-quick-open-related-files/master/screenshot/screenshot.png" width="550" alt="VS Code quick open menu with 'rocket_launch' pre-populated">

## For end users

### Installation

The easiest way to install is to search for "Quick Open Related Files" in the
vscode extension marketplace.

Alternatively, you can manually install using:

```bash
cd ~/.vscode/extensions/
git clone https://github.com/schreifels/vscode-quick-open-related-files.git
```

### Usage

By default, you can list related files for the currently open file using the
`⌘+.` keyboard shortcut or by selecting "Quick Open Related Files" in the
command palette.

You can customize the keyboard shortcut by adding this to `keybindings.json`:

```json
{
  "command": "quickOpenRelatedFiles.show",
  "key": "cmd+."
}
```

### Configuration

There are a couple options to customize how the extension manipulates the
current path before pre-populating the quick open menu. See the
`contributes.configuration` section of the `package.json` file for more details.

## Changelog

### 1.0.0

* Initial release

## For developers

Clone the repo, `npm install`, and open the directory in VS Code. For your
convenience, it comes preconfigured with the "Launch Extension" and
"Launch Tests" launch configurations.
