# Copy Folder Contents

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/copy-folder-contents)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build](https://github.com/yourusername/copy-folder-contents/actions/workflows/build.yml/badge.svg)](https://github.com/yourusername/copy-folder-contents/actions)

A lightweight Visual Studio Code extension that copies all file paths and their contents from a selected folder directly to your clipboard.

A lightweight Visual Studio Code extension that copies all file paths and their contents from a selected folder directly to your clipboard.

## Features

- 📂 Right-click on any folder in the VSCode Explorer
- 📋 Copies:
  - Full file paths
  - File contents
- ✅ Works recursively for subfolders
- 🚫 Hidden from the command palette for a clean experience
- 🧩 Useful for sharing code snippets, documentation, backups, or quick reviews

## Installation

### From VSIX

1. Clone this repository and run:

   ```bash
   npm install
   npm run package
   ```

2. Install the generated `.vsix` file in VSCode:
   - Open VSCode
   - Go to Extensions (Ctrl+Shift+X)
   - Click on the `...` menu
   - Select **Install from VSIX...**

### From Source (Development Mode)

1. Clone this repository
2. Run:

   ```bash
   npm install
   npm run compile
   ```

3. Press `F5` to open the extension in a new VSCode window

## Usage

1. Right-click on any folder in the VSCode Explorer
2. Select **"Copy File Paths and Contents"**
3. The contents will be copied to your clipboard in the following format:

```
/full/path/to/file1.txt
--------------------------------------------------
[file1 contents]

/full/path/to/subfolder/file2.js
--------------------------------------------------
[file2 contents]
```

## License

MIT — see [LICENSE](LICENSE) for details.

## Contributions

PRs are welcome! 🎉  
Feel free to open issues or suggest improvements.

## Roadmap Ideas

- Skip ignored folders (`node_modules`, `.git`, etc.)
- Add support for multiple folder selection
- Show progress notification for large folders
- Add output to file option

---

Enjoy using **Copy Folder Contents**!
