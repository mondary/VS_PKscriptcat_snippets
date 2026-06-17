# VS_PKscriptcat_snippets

![Project icon](icon.png)

[🇬🇧 EN](README_en.md) · [🇫🇷 FR](README.md)

✨ Complete bidirectional synchronization solution for userscripts between VS Code and ScriptCat, with an optimized collection of personal snippets.

## 🍴 Why this fork?

This project is a fork of [ScriptCat](https://github.com/scriptcat/scriptcat) born from the need for a deeper and more personalized integration between the code editor and the browser.

The main motivations for this fork are:
- 🚀 **Code-First Workflow**: Use VS Code as the single source of truth for script development.
- 🔄 **Real Bidirectional Sync**: Unlike standard solutions, every change (creation, renaming, deletion) is instantly reflected in both directions via WebSocket.
- 📦 **"Own" Snippets Collection**: Inclusion of a library of personal scripts (`pk-` for "Personal/PK scripts") developed over the years to optimize Gmail, ChatGPT, GitHub, etc.
- 🎨 **Stylus to Userscripts Conversion**: A system to transform Stylus CSS styles into standalone userscripts, allowing them to be versioned and synchronized like code.

## ✅ Features

- 🔁 **Complete bidirectional synchronization** between VS Code and ScriptCat
- 📤 **Automatic push** of local scripts to ScriptCat
- 📥 **Automatic pull** of scripts from ScriptCat
- 🔄 **Real-time sync** via WebSocket
- 🗂️ **Prefix-based organization** (pk-gmail, pk-github, pk-css, etc.)
- ⚙️ **Flexible configuration** : customizable port and auto-connect
- 📦 **50+ included snippets** : optimized userscripts for Gmail, GitHub, GG.deals, etc.

## 📚 Personal Snippets Collection

All scripts starting with `pk-` are original creations or heavy adaptations. `stylus-` scripts are CSS style ports.

### 🏷️ Conventions
- **pk-***: Feature scripts (Javascript)
- **pk-css-***: Purely graphical enhancements (CSS Injection)
- **stylus-***: Complete themes ported from Stylus

### 🤖 ChatGPT (PK Proprietary)

| Script | Detailed Description |
|--------|----------------------|
| `pk-chatgpt-multi-pin-answers` | **Flagship script**: Allows pinning multiple answers within a discussion. Creates a floating index to quickly navigate between key points of a long conversation. |
| `pk-chatgpt-sidebar-pin` | Adds a "Bookmarks" feature to the ChatGPT sidebar to never lose important discussions. |
| `pk-chatgpt-read-aloud` | Integrates text-to-speech to listen to responses without leaving the tab. |

### 📧 Gmail - The Ultimate Experience

| Script | Detailed Description |
|--------|----------------------|
| `pk-gmail-custom-tabs` | Custom tab system (e.g., "To Process", "Urgent") injected directly into the interface for fast sorting. |
| `pk-gmail-keyword-highlighter` | **Analysis Tool**: Dynamically highlights keywords (project names, amounts, dates) for quick email reading. |
| `pk-gmail-icon-view` | Transforms the email list into an icon grid, ideal for quickly visualizing senders. |
| `pk-gmail-sender-icons` | Fetches and displays favicons/avatars for each service (Amazon, GitHub, etc.) next to each email. |

### 🐙 GitHub & Development

| Script | Detailed Description |
|--------|----------------------|
| `pk-github-license-stickers` | Visually displays the project license (MIT, GPL, etc.) in the repo header with distinctive colors. |
| `stylus-github-repositories-grid` | Transforms the repository list into a modern, compact grid. |

### 🎮 Gaming & Shopping

| Script | Detailed Description |
|--------|----------------------|
| `pk-ggdeals-grid-view` | Forces a grid view on GG.deals to see more deals at a glance. |
| `pk-css-ggdeals-colors` | Overhaul of contrasts and colors for better price readability. |
| `stylus-store-steampowered-com-*` | Specific visual improvements for Steam pages. |

### 🛠️ System Utilities

| Script | Detailed Description |
|--------|----------------------|
| `pk-unsuspend-url-*` | Suite of tools to instantly recover URLs "suspended" by extensions like The Great Suspender. |
| `pk-css-main` | The "Master CSS" that gathers global micro-adjustments across the web. |

### 🎨 Stylus - Styles Library (100+ scripts)

## 🧠 Usage

### VS Code Extension Installation

```bash
# Use files from extensions/vscode/release/
# extension.js, icon.png, package.json
```

### Chrome Extension Installation

```bash
# Go to chrome://extensions/
# Enable "Developer mode"
# "Load unpacked" and select extensions/chrome/release/
```

### Workflow

1. **Start VS Code** with a workspace containing `.user.js` files
2. **Open the Chrome extension** — it connects automatically
3. **Add/edit a script** in VS Code → appears in ScriptCat
4. **Add a script** in ScriptCat → appears in VS Code

## ⚙️ Settings

Configure options in `File > Preferences > Settings` :

- `scriptcat-sync.port`: WebSocket port for ScriptCat connection (default: 8642)
- `scriptcat-sync.autoConnect`: Auto-start server when opening workspace with userscripts (default: true)
- **Scripts folder**: `/snippets/` (project root)

## 🧾 Commands

- **ScriptCat: Start Server**: Start WebSocket server
- **ScriptCat: Stop Server**: Stop WebSocket server
- **ScriptCat: Push Current Script**: Push current script to ScriptCat
- **ScriptCat: Sync All Scripts**: Complete bidirectional synchronization ⭐
- **ScriptCat: Request Missing Scripts**: Retrieve missing scripts ⭐

## 📦 Build & Package

```bash
npm install
vsce package
```

## 🧪 Install (Antigravity)

```bash
code --install-extension Cmondary.vs-pkscriptcat-snippets
```

## 🧾 Changelog

- **1.0.0**: ✅ Refactored structure, bidirectional sync READY
- **0.1.2**: Bug fixes and stability improvements
- **0.1.1**: Added autoConnect configuration
- **0.1.0**: Initial release with basic sync functionality

## 🔗 Links

- 🇫🇷 FR README : [README.md](README.md)
- 🔗 ScriptCat Extension : [scriptcat.org](https://scriptcat.org/)
- 📚 VS Code Documentation : [code.visualstudio.com](https://code.visualstudio.com/)
