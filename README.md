# Site Alissa IA — HTML / CSS / JS + Tailwind (sans framework JS)

- `public/` : le site prêt à déployer (à envoyer à la racine de alissa-ia.ga)
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
# alissa-site
