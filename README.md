# Site Alissa IA — HTML / CSS / JS + Tailwind (sans framework JS)

- Racine du dépôt : le site prêt à déployer (domaine principal : **https://alissaia.com**)
- `_redirects` + `netlify.toml` : redirections 301 de l'ancien domaine `alissaia.com` et de `www` vers `alissaia.com` (hébergement Netlify)
- `source/` : générateur (`build.py`), config Tailwind, `input.css`

## Remplacer les images
Chaque image est un placeholder SVG `public/assets/img/ph-*.svg` (nom + taille recommandée écrits dessus).
Remplacez-le par votre photo (WebP/JPG) et changez l'extension dans le HTML, en gardant `width`, `height` et un `alt` descriptif.
Remplacez aussi `assets/img/og-default.png` (1200×630, partage réseaux sociaux).

## Modifier / recompiler
    cd source && npm install && npm run build      # régénère les pages + le CSS
Ou éditez directement les .html de `public/` ; relancez `npm run build:css` si vous ajoutez de nouvelles classes Tailwind.
Prévisualisation locale : `cd public && python3 -m http.server 8000`

## À compléter pour le référencement
1. `build.py` → `ORG["sameAs"]` : ajoutez vos liens LinkedIn / Facebook / Instagram (ligne commentée).
2. Vérifier le lien Alissa School (`B["school"]`) et les coordonnées GPS (`geo`) dans `build.py`.
3. Ajouter le site dans Google Search Console et Bing Webmaster Tools, soumettre `sitemap.xml`.
4. Créer/mettre à jour la fiche Google Business Profile (Libreville) avec les mêmes nom, adresse, téléphone.
5. Remplacer les noms de partenaires (bandeau) par leurs logos ; ajouter des témoignages réels et des articles de blog.
6. Activer HTTPS puis décommenter la redirection dans `.htaccess`.

## Mises à jour
- Hero de l'accueil : slider 3 slides (Alissa IA, Alissa School, WAxion AI), autoplay 7 s, pause, flèches, swipe, clavier.
- Formulaire : Web3Forms (clé dans `build.py` → `B["w3"]`), anti-spam (honeypot), délai max 15 s, messages d'erreur et repli WhatsApp.

## SEO — points à finaliser côté outils externes
1. Google Search Console : ajouter la propriété `alissaia.com` (et `alissaia.com` si elle existe déjà, pour suivre la redirection), soumettre `https://alissaia.com/sitemap.xml`.
2. Bing Webmaster Tools : même démarche.
3. Vérifier que `contact@alissaia.com` existe réellement (l'adresse est affichée sur tout le site et dans les données structurées).
4. Google Business Profile (Libreville) : mettre l'URL `https://alissaia.com` et les mêmes nom/adresse/téléphone que le site.
5. Confirmer les profils `sameAs` dans le JSON-LD (LinkedIn `alissa-ia`, Facebook `alissaia`) et le compte X `@AlissaIA`.
6. Les visuels sont des placeholders SVG (`assets/img/ph-*.svg`) : les remplacer par de vraies images (WebP/JPG, 1200×630 pour le partage) — c'est le principal levier restant, Google Images n'indexe pas des placeholders.

# alissa-site
