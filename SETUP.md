# 🚀 Guide Complet de Mise en Place — Social Media Dashboard

## 📖 Introduction

Ce document détaille **toutes les étapes** pour mettre en place l'environnement de développement complet du projet "Social Media Dashboard with Theme Switcher" (Frontend Mentor Challenge).

---

## 📋 Table des matières

1. [Contexte du Projet](#contexte)
2. [Prérequis Système](#prérequis)
3. [Phase 1 : Initialisation du Projet](#phase-1--initialisation-du-projet)
4. [Phase 2 : Mise à jour de l'Environnement Node.js](#phase-2--mise-à-jour-de-lenvironnement-nodejs)
5. [Phase 3 : Installation des Dépendances](#phase-3--installation-des-dépendances)
6. [Phase 4 : Configuration et Correction du Build System](#phase-4--configuration-et-correction-du-build-system)
7. [Phase 5 : Tests et Validation](#phase-5--tests-et-validation)
8. [Structure Finale du Projet](#structure-finale-du-projet)
9. [Premier Commit Git](#premier-commit-git)
10. [Workflow de Développement](#workflow-de-développement)

---

## 📌 Contexte

**Projet :** Social Media Dashboard avec Theme Switcher (Dark/Light)  
**Challenge :** Frontend Mentor  
**Tech Stack :**
- HTML5 sémantique
- SCSS (compilé en CSS)
- JavaScript (transpilé avec Babel)
- Gulp (build automation)
- BrowserSync (développement en temps réel)

**Fonctionnalités principales :**
- ✅ Toggle Light/Dark/System pour le thème
- ✅ Responsive design (mobile + desktop)
- ✅ Accessibilité WCAG
- ✅ CSS custom properties (variables)
- ✅ Local storage pour persistance des préférences

---

## 🔧 Prérequis

Avant de commencer, tu dois avoir :
- Git installé
- Terminal / Shell (bash recommandé)
- Internet (pour télécharger les dépendances)
- ~500 MB d'espace disque libre

❌ **Ne pas avoir :** Node.js v12 ou antérieur (trop ancien)

---

## Phase 1 : Initialisation du Projet

### 1.1 Cloner / Créer le dépôt

**Option A : Depuis un dépôt GitHub existant**
```bash
git clone https://github.com/maxroe66/fem-social-media-dashboard-dark-light-toggle.git
cd fem-social-media-dashboard-dark-light-toggle
```

**Option B : Depuis les fichiers de démarrage fournis**
```bash
mkdir fem-social-media-dashboard-dark-light-toggle
cd fem-social-media-dashboard-dark-light-toggle
git init
```

### 1.2 Structure initiale fournie

Le projet inclut les fichiers de démarrage suivants :

```
/
├── index.html              # Point d'entrée HTML
├── package.json            # Configuration npm et dépendances
├── .gitignore              # Fichiers à ignorer dans Git
├── gulpfile.js             # Configuration Gulp (build system)
├── README.md               # Documentation Frontend Mentor
├── style-guide.md          # Guide de couleurs et typographie
├── notes.md                # Notes de développement
│
├── design/                 # Maquettes (images JPG)
│   ├── desktop-design-light.jpg
│   ├── desktop-design-dark.jpg
│   ├── mobile-design-light.jpg
│   ├── mobile-design-dark.jpg
│   └── active-states-*.jpg
│
├── images/                 # Icônes et assets
│   ├── favicon-32x32.png
│   ├── icon-*.svg (Facebook, Twitter, Instagram, YouTube)
│   └── icon-up.svg, icon-down.svg
│
└── app/                    # Code source (à développer)
    ├── scss/               # Styles SCSS
    │   ├── style.scss      # Point d'entrée SCSS
    │   ├── globals/        # Styles globaux (typo, couleurs)
    │   ├── components/     # Styles composants (cards, toggle)
    │   └── util/           # Fonctions et variables SCSS
    │
    └── js/                 # JavaScript
        └── script.js       # Logique du toggle, theme switching

```

---

## Phase 2 : Mise à Jour de l'Environnement Node.js

### 2.1 Diagnostic du problème

**Problème :** La version Node.js v12 est trop ancienne et ne supporte pas :
- Nullish coalescing (`??`)
- Optional chaining (`?.`)
- Autres features ES2020+

**Erreur rencontrée :**
```
SyntaxError: Unexpected token '?'
```

### 2.2 Solution : Installer nvm et Node LTS

**nvm** (Node Version Manager) permet de gérer plusieurs versions de Node.js sans conflit.

#### Étape 1 : Installer nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recharger le shell
source ~/.bashrc
```

#### Étape 2 : Installer Node.js LTS
```bash
nvm install --lts

# Vérifier l'installation
node --version    # → v24.11.1 (ou plus récent)
npm --version     # → 11.6.2 (ou plus récent)
```

#### Étape 3 : Définir comme version par défaut (optionnel)
```bash
nvm alias default lts/*
```

### 2.3 Vérification

```bash
node -v
npm -v
```

**Résultat attendu :**
```
v24.11.1
11.6.2
```

---

## Phase 3 : Installation des Dépendances

### 3.1 Nettoyer les anciennes dépendances

```bash
# Supprimer node_modules et package-lock.json (créés avec ancien Node)
rm -rf node_modules package-lock.json
```

### 3.2 Installer les nouvelles dépendances

```bash
npm install
```

**Résultat :** Devrait afficher `added 486 packages` (ou similaire)

### 3.3 Dépendances principales installées

| Package | Rôle | Version |
|---------|------|---------|
| `gulp` | Task runner (build automation) | ^5.0.1 |
| `gulp-sass` | Compilation SCSS → CSS | ^6.0.1 |
| `sass` | Compilateur SCSS (Dart Sass) | ^1.79.0 |
| `gulp-postcss` | Post-processing CSS | ^10.0.0 |
| `autoprefixer` | Ajout préfixes CSS (-webkit, etc) | ^10.4.22 |
| `cssnano` | Minification CSS | ^7.1.2 |
| `gulp-babel` | Transpilation JS moderne | ^8.0.0 |
| `@babel/core` | Core Babel | ^7.28.5 |
| `@babel/preset-env` | Support navigateurs anciens | ^7.28.5 |
| `gulp-terser` | Minification JS | ^2.1.0 |
| `browser-sync` | Auto-reload navigateur | ^3.0.4 |

---

## Phase 4 : Configuration et Correction du Build System

### 4.1 Problème 1 : gulp-sass ne trouve pas le compilateur

**Erreur :**
```
gulp-sass no longer has a default Sass compiler; please set one yourself.
```

**Cause :** Les anciennes versions de gulp-sass injectaient automatiquement dart-sass. Les nouvelles versions requièrent une configuration explicite.

**Solution dans `gulpfile.js` :**

```javascript
// ❌ Avant (ancien)
const sass = require('gulp-sass');
sass.compiler = require('dart-sass');

// ✅ Après (nouveau)
const sass = require('gulp-sass')(require('sass'));
```

### 4.2 Problème 2 : Erreurs Sass silencieuses

**Cause :** Les erreurs SCSS ne s'affichaient pas, causant des timeouts.

**Solution :** Ajouter un handler d'erreur

```javascript
// Dans la fonction scssTask()
.pipe(sass().on('error', sass.logError))  // ✅ Affiche les erreurs
```

### 4.3 Problème 3 : Module Sass `math` manquant

**Erreur :**
```
There is no module with the namespace "math".
```

**Cause :** Le fichier `app/scss/util/functions.scss` utilisait `math.div()` sans importer le module.

**Solution :** Ajouter l'import au début du fichier

```scss
// ❌ Avant
@function rem($pixels, $context: 16) {
  @return (math.div($pixels, $context)) * 1rem;
}

// ✅ Après
@use "sass:math";

@function rem($pixels, $context: 16) {
  @return (math.div($pixels, $context)) * 1rem;
}
```

### 4.4 Installer le paquet `sass` manquant

```bash
npm install sass --save-dev
```

---

## Phase 5 : Tests et Validation

### 5.1 Lancer Gulp

```bash
npx gulp
```

**Résultat attendu :**
```
[HH:MM:SS] Using gulpfile ~/fem-social-media-dashboard-dark-light-toggle/gulpfile.js
[HH:MM:SS] Starting 'default'...
[HH:MM:SS] Starting 'scssTask'...
[HH:MM:SS] Finished 'scssTask' after 500+ ms ✅
[HH:MM:SS] Starting 'jsTask'...
[HH:MM:SS] Finished 'jsTask' after 900+ ms ✅
[HH:MM:SS] Starting 'browserSyncServe'...
[HH:MM:SS] Finished 'browserSyncServe' after 20+ ms ✅
[HH:MM:SS] Starting 'watchTask'...

[Browsersync] Access URLs:
 Local: http://localhost:3000
 External: http://172.28.20.5:3000
 UI: http://localhost:3001
[Browsersync] Serving files from: .
```

### 5.2 Ouvrir le navigateur

- **Projet :** http://localhost:3000
- **BrowserSync UI (Outils) :** http://localhost:3001

✅ Le projet devrait s'afficher et se recharger automatiquement quand tu modifies les fichiers.

---

## 📁 Structure Finale du Projet

```
fem-social-media-dashboard-dark-light-toggle/
│
├── 📄 Fichiers de configuration
│   ├── package.json              # Dépendances npm
│   ├── package-lock.json         # Lock file (généré)
│   ├── gulpfile.js              # Config Gulp ✅ CORRIGÉ
│   ├── .gitignore               # Fichiers Git à ignorer
│   └── SETUP.md                 # Ce document
│
├── 📘 Documentation
│   ├── README.md                # Documentation projet
│   ├── README-template.md       # Template de solution
│   ├── style-guide.md           # Palette couleurs & typographie
│   └── notes.md                 # Notes techniques
│
├── 🎨 Designs & Assets
│   ├── design/                  # Maquettes (JPG)
│   │   ├── desktop-design-light.jpg
│   │   ├── desktop-design-dark.jpg
│   │   ├── mobile-design-light.jpg
│   │   ├── mobile-design-dark.jpg
│   │   └── active-states-*.jpg
│   │
│   └── images/                  # Icônes & assets
│       ├── favicon-32x32.png
│       ├── icon-facebook.svg
│       ├── icon-twitter.svg
│       ├── icon-instagram.svg
│       ├── icon-youtube.svg
│       ├── icon-up.svg
│       └── icon-down.svg
│
├── 💻 Code source
│   ├── index.html               # Point d'entrée HTML
│   │
│   └── app/
│       ├── scss/
│       │   ├── style.scss               # Point d'entrée SCSS
│       │   ├── globals/
│       │   │   ├── _index.scss
│       │   │   ├── boilerplate.scss     # Reset + base
│       │   │   ├── colors.scss          # Variables couleurs
│       │   │   ├── fonts.scss           # Import fontes
│       │   │   └── typography.scss      # Styles texte
│       │   │
│       │   ├── components/
│       │   │   ├── _index.scss
│       │   │   ├── card.scss            # Styles cards dashboard
│       │   │   └── toggle.scss          # Styles toggle theme
│       │   │
│       │   └── util/
│       │       ├── _index.scss
│       │       ├── functions.scss       # ✅ CORRIGÉ (ajout @use "sass:math")
│       │       └── breakpoints.scss     # Breakpoints responsive
│       │
│       └── js/
│           └── script.js                # Logique JS (toggle, theme)
│
├── 🔨 Fichiers générés (à ignorer)
│   ├── node_modules/            # Dépendances npm
│   ├── dist/                    # CSS/JS compilés et minifiés
│   │   ├── style.css            # Généré par SCSS
│   │   ├── style.css.map        # Source map SCSS
│   │   ├── script.js            # Généré par Babel
│   │   └── script.js.map        # Source map JS
│   │
│   └── .git/                    # Historique Git

```

---

## 🔀 Premier Commit Git

### Préparation

```bash
# S'assurer qu'on est dans le bon répertoire
cd fem-social-media-dashboard-dark-light-toggle

# Vérifier l'état Git
git status
```

**Résultat attendu :**
```
On branch main
Changes not staged for commit:
  modified:   gulpfile.js
  modified:   app/scss/util/functions.scss
  
Untracked files:
  new file:   SETUP.md
  new file:   dist/
  new file:   node_modules/
```

### Faire le commit initial

```bash
# Ajouter tous les fichiers (sauf ceux dans .gitignore)
git add .

# Faire le commit
git commit -m "chore: initial project setup with corrected gulp configuration and sass fixes"

# Vérifier
git log -1
```

**Message de commit expliqué :**
- `chore:` → Type de commit (configuration/setup, pas une feature)
- Description claire de ce qui a été fait

---

## 🚀 Workflow de Développement

### Pour chaque nouvelle fonctionnalité

```bash
# 1. Créer une branche de travail
git checkout -b feature/dark-light-toggle

# 2. Lancer Gulp en mode watch
npx gulp
# → Le navigateur se recharge automatiquement

# 3. Développer...
# Éditer les fichiers HTML, SCSS, JS

# 4. Quand c'est bon, committer
git add .
git commit -m "feat(ui): implement dark/light theme toggle"

# 5. Quand la feature est terminée, merger sur main
git checkout main
git merge feature/dark-light-toggle

# 6. Pousser vers GitHub
git push origin main
```

### Convention de commits

```
<type>(<scope>): <message>

type:
  - feat    : Nouvelle fonctionnalité
  - fix     : Correction de bug
  - style   : Changement de style CSS/format
  - refactor: Refonte de code
  - perf    : Optimisation performance
  - chore   : Configuration, setup, dépendances
  - docs    : Documentation

scope:
  - ui       : Interface utilisateur
  - a11y     : Accessibilité
  - responsive: Design responsive
  - layout   : Layout général

Exemples:
  feat(ui): add theme toggle control
  fix(a11y): improve keyboard navigation
  style(responsive): adjust mobile breakpoints
  docs: update README with instructions
```

---

## 📚 Ressources utiles

| Ressource | Lien | Utilité |
|-----------|------|---------|
| Node.js | https://nodejs.org | Runtime JavaScript |
| nvm | https://github.com/nvm-sh/nvm | Gestion versions Node |
| Gulp | https://gulpjs.com | Build automation |
| Sass | https://sass-lang.com | CSS avancé |
| PostCSS | https://postcss.org | Transformations CSS |
| Babel | https://babeljs.io | Transpilation JS |
| BrowserSync | https://browsersync.io | Auto-reload |
| Frontend Mentor | https://frontendmentor.io | Challenge provider |

---

## ✅ Checklist de validation

- [x] Node.js v24+ installé
- [x] npm dépendances installées
- [x] gulpfile.js corrigé
- [x] Sass math module configuré
- [x] Gulp compile et lance sans erreur
- [x] BrowserSync accessible sur http://localhost:3000
- [x] Premier commit Git fait
- [x] Structure du projet validée

---

## 🐛 Troubleshooting

### Gulp ne démarre pas

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Tester à nouveau
npx gulp
```

### Erreur "Cannot find module"

```bash
# Vérifier la version Node
node -v

# Si < v14, mettre à jour avec nvm
nvm install --lts
nvm alias default lts/*
```

### SCSS ne compile pas

```bash
# Vérifier la syntaxe SCSS
# Chercher les warnings dans la sortie Gulp
# Vérifier @use "sass:math" est importé

npx gulp  # Voir les erreurs en détail
```

---

**Date de mise en place :** 12 novembre 2025  
**Dernière mise à jour :** 12 novembre 2025  
**Statut :** ✅ Environnement de développement complet et opérationnel
