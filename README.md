# VS_PKscriptcat_snippets

![Project icon](icon.png)

[🇫🇷 FR](README.md) · [🇬🇧 EN](README_en.md)

✨ Solution complète de synchronisation bidirectionnelle de userscripts entre VS Code et ScriptCat, avec une collection de snippets personnels optimisés.

## 🍴 Pourquoi ce fork ?

Ce projet est un fork de [ScriptCat](https://github.com/scriptcat/scriptcat) né du besoin d'une intégration plus profonde et personnalisée entre l'éditeur de code et le navigateur. 

Les motivations principales de ce fork sont :
- 🚀 **Workflow Code-First** : Utiliser VS Code comme source de vérité unique pour le développement de scripts.
- 🔄 **Synchronisation Bidirectionnelle Réelle** : Contrairement aux solutions standards, tout changement (création, renommage, suppression) est répercuté instantanément dans les deux sens via WebSocket.
- 📦 **Collection de Snippets "Propres"** : Inclusion d'une bibliothèque de scripts personnels (`pk-` pour "Personal/PK scripts") développés au fil des années pour optimiser Gmail, ChatGPT, GitHub, etc.
- 🎨 **Conversion Stylus vers Userscripts** : Un système pour transformer des styles CSS Stylus en userscripts autonomes, permettant de les versionner et de les synchroniser comme du code.

## ✅ Fonctionnalités

- 🔁 **Synchronisation bidirectionnelle** complète entre VS Code et ScriptCat
- 📤 **Push** automatique des scripts locaux vers ScriptCat
- 📥 **Pull** automatique des scripts depuis ScriptCat
- 🔄 **Sync en temps réel** via WebSocket
- 🗂️ **Organisation par préfixes** (pk-gmail, pk-github, pk-css, etc.)
- ⚙️ **Configuration flexible** : port et auto-connect personnalisables
- 📦 **99+ snippets inclus** : userscripts optimisés pour Gmail, GitHub, GG.deals, YouTube, etc.

## 🔧 Bisync (mode économe disque)

- Dry-run : `npx -y -p playwright-core node extensions/chrome/src/scripts/scriptcat-bisync.mjs`
- Apply : `npx -y -p playwright-core node extensions/chrome/src/scripts/scriptcat-bisync.mjs --apply`

## 📚 Collection de Snippets Personnels

Tous les scripts commençant par `pk-` sont des créations originales ou des adaptations poussées. Les scripts `stylus-` sont des portages de styles CSS.

### 🏷️ Conventions
- **pk-*** : Scripts de fonctionnalités (Javascript)
- **pk-css-*** : Améliorations purement graphiques (Injection CSS)
- **stylus-*** : Thèmes complets portés de Stylus

### 🤖 ChatGPT (Propriété de PK)

| Script | Description détaillée |
|--------|-----------------------|
| `pk-chatgpt-multi-pin-answers` | **Flagship script** : Permet d'épingler plusieurs réponses dans une discussion. Crée un index flottant pour naviguer rapidement entre les points clés d'une longue conversation. |
| `pk-chatgpt-sidebar-pin` | Ajoute une fonctionnalité de "Favoris" dans la barre latérale de ChatGPT pour ne jamais perdre les discussions importantes. |
| `pk-chatgpt-read-aloud` | Intègre la synthèse vocale pour écouter les réponses sans quitter l'onglet. |

### 📧 Gmail - L'expérience ultime

| Script | Description détaillée |
|--------|-----------------------|
| `pk-gmail-custom-tabs` | Système d'onglets personnalisés (ex: "A traiter", "Urgent") injectés directement dans l'interface pour un tri rapide. |
| `pk-gmail-keyword-highlighter` | **Outil d'analyse** : Surligne dynamiquement des mots-clés (noms de projets, montants, dates) pour une lecture rapide des emails. |
| `pk-gmail-icon-view` | Transforme la liste d'emails en grille d'icônes, idéal pour visualiser rapidement les expéditeurs. |
| `pk-gmail-sender-icons` | Récupère et affiche les favicons/avatars de chaque service (Amazon, GitHub, etc.) en face de chaque mail. |

### 🐙 GitHub & Développement

| Script | Description détaillée |
|--------|-----------------------|
| `pk-github-license-stickers` | Affiche visuellement la licence du projet (MIT, GPL, etc.) dès l'en-tête du repo avec des couleurs distinctives. |
| `stylus-github-repositories-grid` | Transforme la liste des dépôts en une grille moderne et compacte. |

### 🎮 Gaming & Shopping

| Script | Description détaillée |
|--------|-----------------------|
| `pk-ggdeals-grid-view` | Force une vue grille sur GG.deals pour voir plus de promos d'un coup d'œil. |
| `pk-css-ggdeals-colors` | Refonte des contrastes et des couleurs pour une meilleure lisibilité des prix. |
| `stylus-store-steampowered-com-*` | Améliorations visuelles spécifiques pour les pages Steam. |

### 🛠️ Utilitaires Système

| Script | Description détaillée |
|--------|-----------------------|
| `pk-unsuspend-url-*` | Suite d'outils pour récupérer instantanément les URLs "suspendues" par des extensions comme The Great Suspender. |
| `pk-css-main` | Le "Master CSS" qui regroupe les micro-ajustements globaux sur le web. |

### 🎨 Stylus - Bibliothèque de Styles (100+ scripts)

Styles CSS pour Gmail via Stylus (ancien et nouveau design)

| Catégorie | Scripts |
|-----------|---------|
| **Gmail Moderne** | `stylus-gmail-fullwhite`, `stylus-gmail-marging`, `stylus-gmail-no-left-menu`, `stylus-gmail-scrollbar`, `stylus-gmail-searchbar`, `stylus-gmail-stars`, `stylus-gmail-sticky-topic`, `stylus-gmail-styling`, `stylus-gmail-topright`, `stylus-gmail-unread-grey`, `stylus-mail-google` |
| **Gmail Classic** | `stylus-old-gmail-columns-old`, `stylus-old-gmail-columns-responsive`, `stylus-old-gmail-responsive-toolbar`, `stylus-old-gmail-responsive-toolbar-icon`, `stylus-old-gmail-stacked-old`, `stylus-old-gmail-stars-blue`, `stylus-old-gmail-starscolor`, `stylus-old-gmail-test-tabbar`, `stylus-old-gmail-topic-sticky-old` |
| **Mail Google** | `stylus-mail-google-com-mail-u-0` (+ dup2, dup3) |

### 🎨 Stylus - GitHub (3 scripts)

| Script | Description |
|--------|-------------|
| `stylus-github-lines` | Amélioration des lignes de code GitHub |
| `stylus-github-private` | Style pour repos privés GitHub |
| `stylus-github-repositories-grid` | Vue grille des repos GitHub |

### 🎨 Stylus - GG.deals (4 scripts)

| Script | Description |
|--------|-------------|
| `stylus-gg-deals-deals-new-deals` | Style nouvelles offres GG.deals |
| `stylus-gg-deals-mai-2024` | Design GG.deals mai 2024 |
| `stylus-gg-deals-pkgrid` | Grille personnelle GG.deals |
| `stylus-pk-gg-deals` | Style personnalisé GG.deals |

### 🎨 Stylus - YouTube (2 scripts)

| Script | Description |
|--------|-------------|
| `stylus-pk-sticky-youtube` | Headers sticky YouTube |
| `stylus-pk-youtube-sticky-2` | Version 2 du sticky YouTube |

### 🎨 Stylus - LinkedIn (1 script)

| Script | Description |
|--------|-------------|
| `stylus-pk-linkedin` | Style personnalisé LinkedIn |

### 🎨 Stylus - Divers (10+ scripts)

| Script | Description |
|--------|-------------|
| `stylus-app-gomining-com-btc-wallets` | Style interface mining BTC |
| `stylus-caisse-epargne-fr` | Style caisse épargne |
| `stylus-fix-gutemberg` | Corrections Gutenberg |
| `stylus-linkedin-pk` | LinkedIn personnalisé |
| `stylus-mini-separateurs` | Mini séparateurs |
| `stylus-mobile-free-fr` | Mobile Free |
| `stylus-old-colomn-sender2` | Colonnes expéditeurs |
| `stylus-old-degueu-chatgpt` | Style ChatGPT |
| `stylus-pk-3`, `stylus-pk4` | Styles personnels |
| `stylus-pkgrid-test` | Test grille |
| `stylus-simp`, `stylus-simp2`, `stylus-simplify` | Styles simplifiés |
| `stylus-store-steampowered-com-app-*` | Styles Steam |

## 🧠 Utilisation

### Installation VS Code Extension

```bash
# Utiliser les fichiers de extensions/vscode/release/
# extension.js, icon.png, package.json
```

### Installation Chrome Extension

```bash
# Aller à chrome://extensions/
# Activer "Mode développeur"
# "Charger décompressé" et sélectionner extensions/chrome/release/
```

### Workflow

1. **Démarrer VS Code** avec un workspace contenant des `.user.js`
2. **Ouvrir l'extension Chrome** — elle se connecte automatiquement
3. **Ajouter/modifier un script** dans VS Code → apparaît dans ScriptCat
4. **Ajouter un script** dans ScriptCat → apparaît dans VS Code

## ⚙️ Réglages

Configurez les options dans `Fichier > Préférences > Paramètres` :

- `scriptcat-sync.port` : Port WebSocket pour la connexion ScriptCat (défaut: 8642)
- `scriptcat-sync.autoConnect` : Démarrage automatique du serveur à l'ouverture d'un workspace avec userscripts (défaut: true)
- **Dossier scripts** : `/snippets/` (racine du projet)

## 🧾 Commandes

- **ScriptCat: Start Server** : Lance le serveur WebSocket
- **ScriptCat: Stop Server** : Arrête le serveur WebSocket
- **ScriptCat: Push Current Script** : Pousse le script actuel vers ScriptCat
- **ScriptCat: Sync All Scripts** : Synchronisation complète bidirectionnelle ⭐
- **ScriptCat: Request Missing Scripts** : Récupère les scripts manquants ⭐

## 📦 Build & Package

```bash
npm install
vsce package
```

## 🧪 Installation (Antigravity)

```bash
code --install-extension Cmondary.vs-pkscriptcat-snippets
```

## 🧾 Changelog

- **1.0.0** : ✅ Structure refactorisée, synchronisation bidirectionnelle PRÊTE
- **0.1.2** : Correction de bugs et améliorations de stabilité
- **0.1.1** : Ajout de la configuration autoConnect
- **0.1.0** : Version initiale avec synchronisation de base

## 🔗 Liens

- 🇬🇧 EN README : [README_en.md](README_en.md)
- 🔗 ScriptCat Extension : [scriptcat.org](https://scriptcat.org/)
- 📚 Documentation VS Code : [code.visualstudio.com](https://code.visualstudio.com/)
