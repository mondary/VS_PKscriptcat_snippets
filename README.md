# VS_PKscriptcat_snippets

![Project icon](icon.png)

[🇫🇷 FR](README.md) · [🇬🇧 EN](README_en.md)

✨ Solution complète de synchronisation bidirectionnelle de userscripts entre VS Code et ScriptCat, avec une collection de snippets prêts à l'emploi.

## ✅ Fonctionnalités

- 🔁 **Synchronisation bidirectionnelle** complète entre VS Code et ScriptCat
- 📤 **Push** automatique des scripts locaux vers ScriptCat
- 📥 **Pull** automatique des scripts depuis ScriptCat
- 🔄 **Sync en temps réel** via WebSocket
- 🗂️ **Organisation par préfixes** (pk-gmail, pk-github, pk-css, etc.)
- ⚙️ **Configuration flexible** : port et auto-connect personnalisables
- 📦 **50+ snippets inclus** : userscripts optimisés pour Gmail, GitHub, GG.deals, etc.

## 📚 Collection de Snippets

### 🤖 ChatGPT (5 scripts)

| Script | Description |
|--------|-------------|
| `pk-chatgpt-multi-pin-answers` | Épinglez plusieurs réponses par conversation ChatGPT avec panneau latéral |
| `pk-chatgpt-sidebar-pin` | Épingler des discussions dans la barre latérale, style pinCHAT |
| `pk-chatgpt-read-aloud` | Lecture vocale des réponses ChatGPT |
| `pk-read-aloud-chatgpt` | Boutons 🗣️🔄⏹️ pour lire à haute voix les éléments prose |
| Versions v2-v5 | Variantes avec améliorations progressives (navigation, regroupement, sources) |

### 📧 Gmail - Scripts Core (8 scripts)

| Script | Description |
|--------|-------------|
| `pk-gmail-custom-tabs` | Ajoute 3 onglets personnalisés pour filtrer les e-mails par labels |
| `pk-gmail-filter-similar-always-visible` | Bouton picto permanent pour "Filtrer les messages similaires" |
| `pk-gmail-icon-view` | Vue en icônes style Finder pour Gmail |
| `pk-gmail-bouton-inbox-vue-liste-strict` | Affiche "Nouveau mail" uniquement sur la vue liste inbox |
| `pk-gmail-new-message-button` | Bouton "Nouveau message" à côté du logo Gmail |
| `pk-gmail-no-spam-icon` | Icône de validation quand pas de spam |
| `pk-gmail-sender-icons` | Affiche les favicons des expéditeurs dans Gmail |
| `pk-gmail-a-filtrer-les-messages-similaires` | Ajoute le bouton "Filtrer les similaires" dans la toolbar |

### 🎨 Gmail - CSS/Styling (20 scripts)

| Script | Description |
|--------|-------------|
| `pk-css-gmail-white-style` | Interface Gmail en blanc pur |
| `pk-css-gmail-full-white` | Mode blanc intégral Gmail |
| `pk-css-gmail-margin` | Ajustement des marges Gmail |
| `pk-css-gmail-no-left-menu` | Masquer le menu gauche Gmail |
| `pk-css-gmail-scrollbar-grey` | Scrollbar grise élégante Gmail |
| `pk-css-gmail-search-bar-center-white` | Barre de recherche centrée blanche |
| `pk-css-gmail-stars-focus` | Mise en évidence des étoiles Gmail |
| `pk-css-gmail-sticky-topic` | Sujet sticky dans Gmail |
| `pk-css-gmail-top-right-buttons` | Boutons en haut à droite Gmail |
| `pk-css-gmail-unread-color` | Couleur personnalisée pour les non-lus |
| Versions `pk-css-pk-gmail-*` | Injecteurs CSS auto-générés pour les styles ci-dessus |

### 🐙 GitHub (2 scripts)

| Script | Description |
|--------|-------------|
| `pk-github-license-stickers` | Met en évidence les licences GitHub sous forme de stickers colorés |
| `pk-github-license-stickers-alt` | Version alternative des stickers de licence |

### 🎮 GG.deals (3 scripts)

| Script | Description |
|--------|-------------|
| `pk-ggdeals-grid-view` | Affiche les nouvelles offres GG.deals en grille |
| `pk-gg-deals-new-deals-grid-view-corrected` | Version corrigée de la grille GG.deals |
| `pk-css-ggdeals-colors` | Améliore les couleurs des icônes et backgrounds GG.deals |

### 💼 LinkedIn (1 script)

| Script | Description |
|--------|-------------|
| `pk-css-linkedin-width` | Ajuste la largeur LinkedIn et cache la sidebar |

### 🛠️ Utilitaires (5 scripts)

| Script | Description |
|--------|-------------|
| `pk-unsuspend-url-from-clipboard` | Décode les URLs suspendues depuis le presse-papiers |
| `pk-unsuspend-url-the-great-suspender-similar` | Extrait et ouvre les URLs réelles depuis suspended.html |
| `pk-utils-unsuspend-current-page` | Version page courante du désuspender |
| `pk-utils-unsuspend-from-clipboard` | Version presse-papiers du désuspender |
| `pk-css-main` | Injecteur CSS principal auto-généré |

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
code --install-extension Cmondary.vs-pkscriptcatws
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
