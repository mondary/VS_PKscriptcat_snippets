# VS_pkscriptcatws

![Project icon](icon.png)

[🇬🇧 EN](README_en.md) · [🇫🇷 FR](README.md)

✨ VS Code extension to sync your userscripts with ScriptCat browser extension.

## ✅ Features

- WebSocket server for real-time synchronization
- Auto-sync on save for `.user.js` files
- Commands to start/stop server and push current script
- Status bar showing connection state
- Flexible configuration with custom port
- Optional auto-start when opening workspace with userscripts

## 🧠 Usage

1. Open a workspace containing `.user.js` files
2. Server starts automatically (if enabled in settings)
3. ScriptCat browser extension connects to VS Code server
4. Changes are synced in real-time

## ⚙️ Settings

Configure options in `File > Preferences > Settings` :

- `scriptcat-sync.port`: WebSocket port for ScriptCat connection (default: 8642)
- `scriptcat-sync.autoConnect`: Auto-start server when opening workspace with userscripts (default: true)

## 🧾 Commands

- **ScriptCat: Start Server**: Start WebSocket server
- **ScriptCat: Stop Server**: Stop WebSocket server
- **ScriptCat: Push Current Script**: Push current script to ScriptCat

## 📦 Build & Package

```bash
npm install
vsce package
```

## 🧪 Install (Antigravity)

Install from Visual Studio Code marketplace or via command:

```bash
code --install-extension Cmondary.vs-pkscriptcatws
```

## 🧾 Changelog

- **0.1.2**: Bug fixes and stability improvements
- **0.1.1**: Added autoConnect configuration and UI improvements
- **0.1.0**: Initial release with basic sync functionality

## 🔗 Links

- FR README: README.md
- ScriptCat Extension: [scriptcat.org](https://scriptcat.org/)
- VS Code Documentation: [code.visualstudio.com](https://code.visualstudio.com/)