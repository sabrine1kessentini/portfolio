# Portfolio — Sabrine Kessentini

Site statique (HTML, CSS, JavaScript), sans build ni dépendance. Il se déploie gratuitement sur Vercel.

## Structure

```
portfolio/
├── index.html          contenu du site (textes, projets, certifs, parcours)
├── css/style.css       design et animations (couleurs en haut du fichier)
├── js/main.js          interactions (rôles animés, formulaire…)
├── assets/
│   ├── photo.jpg       ← VOTRE PHOTO (à ajouter)
│   ├── CV.pdf          ← VOTRE CV (à ajouter)
│   └── favicon.svg
└── vercel.json
```

## À personnaliser

1. **Photo** : placez votre photo dans `assets/photo.jpg`, de préférence carrée, au moins 800×800 px. Une photo détourée sur fond uni rend très bien dans la forme animée.
2. **CV** : placez votre CV dans `assets/CV.pdf`.
3. **Liens** : dans `index.html`, remplacez `votre-username` (GitHub) et `votre-profil` (LinkedIn).
4. **Projets** : chaque projet est un bloc `<article class="project">`. Dupliquez-le, changez le texte, les technos et les liens. Pour une capture d'écran, ajoutez `<img src="assets/projet1.png">` dans `project__img`.
5. **Certifications** : chaque certif est un bloc `<a class="cert">`. Mettez le lien de vérification dans `href`.
6. **Parcours** : modifiez les blocs `tl-item` (école, stages).
7. **Chiffres** : ajustez les attributs `data-count` de la section À propos.
8. **Rôles animés** : la liste `ROLES` en haut de `js/main.js`.
9. **Couleurs** : `--accent-1` et `--accent-2` en haut de `css/style.css`.

## Tester en local

Ouvrez `index.html` dans le navigateur, ou lancez un petit serveur :

```bash
npx serve .
```

## Déployer gratuitement sur Vercel

### Option A — via GitHub (recommandée, mise à jour automatique)

1. Créez un dépôt sur GitHub, par exemple `portfolio`.
2. Dans ce dossier :
   ```bash
   git remote add origin https://github.com/VOTRE-USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Allez sur https://vercel.com, connectez-vous avec GitHub (plan **Hobby**, gratuit).
4. Cliquez **Add New → Project**, importez le dépôt `portfolio`.
5. Framework Preset : **Other**. Ne touchez à rien d'autre, puis **Deploy**.
6. Votre site est en ligne sur `portfolio-xxx.vercel.app`. Chaque `git push` le met à jour automatiquement.

Pour changer l'adresse : Project → Settings → Domains, par exemple `sabrine-kessentini.vercel.app`.

### Option B — en ligne de commande

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Formulaire de contact

Par défaut, le formulaire ouvre la messagerie de la personne qui vous écrit. Pour recevoir les messages directement par email, créez un formulaire gratuit sur https://formspree.io puis collez son URL dans `FORMSPREE_URL` en haut de `js/main.js`.
