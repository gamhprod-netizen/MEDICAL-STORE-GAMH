# GPrescrit — PWA installable et hors ligne

Ce dossier est la version « installable » de l'application. Le lien Artifact de Claude, lui, ne peut **pas** être installé : il est hébergé sur claude.ai, sans manifeste ni service worker propres. Il sert à consulter et valider ; ce dossier sert à **installer** l'app.

## Contenu
- `index.html` : l'application (un seul fichier, données incluses) + balises PWA + invite d'installation + notification de mise à jour + pastille « Hors ligne »
- `manifest.webmanifest` : nom, couleurs, icônes, mode « standalone »
- `sw.js` : service worker (cache hors ligne, mise à jour contrôlée)
- `icons/` : icônes 192, 512, maskable, iPhone, favicon
- `_headers` (Netlify / Cloudflare) et `.nojekyll` (GitHub Pages)

## Hébergement gratuit depuis un téléphone (le HTTPS est obligatoire)
**Option A — GitHub Pages**
1. Créer un compte sur github.com, puis un dépôt public (ex. `gprescrit`).
2. Dans le navigateur du téléphone (mode « Version pour ordinateur »), ouvrir le dépôt : Add file > Upload files, puis envoyer **tout le contenu** du dossier (y compris `icons/`, `.nojekyll`).
3. Settings > Pages > Branch `main` / dossier `/ (root)` > Save. L'adresse est du type `https://votre-nom.github.io/gprescrit/`.
4. Ouvrir cette adresse dans Chrome (Android) : proposition « Installer GPrescrit », sinon menu ⋮ > « Installer l'application ». Sur iPhone, Safari : Partager > Sur l'écran d'accueil.

**Option B — Netlify ou Cloudflare Pages** : envoi du dossier par glisser-déposer (plus simple depuis un ordinateur).
**Option C — Firebase Hosting** : à privilégier quand l'interface sera branchée à Firebase (voir `firebase/`).

## Hors ligne et mises à jour
- Après la 1re ouverture en ligne, l'app s'ouvre sans connexion avec les données de la version installée.
- À chaque nouvelle version publiée (même nom de fichiers), le service worker change de version : l'utilisateur voit « Une nouvelle version est disponible » et touche « Mettre à jour ».
- Pour publier une version : `python3 build.py` puis `python3 mkpwa.py` (dans `sources_build/`), puis remplacer les fichiers sur l'hébergement.
- Les données propres à l'utilisateur (favoris, brouillons, mode démo admin) sont dans le `localStorage` de l'appareil : elles ne sont pas partagées entre téléphones tant que Firebase n'est pas branché.

## Limites connues
- Non testé sur appareil réel à ce stade (pas de navigateur disponible lors de la génération) : vérifier l'installation sur Android/Chrome puis sur iPhone/Safari.
- Les notifications push et la synchronisation en arrière-plan ne sont pas incluses.
