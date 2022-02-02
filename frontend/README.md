- création d'un user
- peut s'appliquer aussi au golf ??
- garder les stats de tes rondes sur les parcours existants
- comparer avec tes amis sur l'app
- ajouter un parcours
  -prendre des photos du parcours/pendant la ronde
  -noter un parcours

TODO:

- Home Page
  - Stats de jeux
- Game List Page
  - Starter une nouvelle game
  - Voir la liste des anciennes games
- Game Page
  - Start game
    - Player List
    - Terrain
  - Go to First hole (and play...)
- Terrain List Page
  - Terrain list
  - Create new terrain
  - Delete terrain
- Player list page
  - Player list (friends)
  - Add a friend
  - Remove friend

Used Tech (To learn)

Frontend

- Vue 3 (https://v3.vuejs.org/)
- Vue Router (https://next.router.vuejs.org/)
- Tailwind CSS (https://tailwindcss.com/)
- Vite (https://vitejs.dev/)

Backend
TODO

DEVOIR

- Apprendre un peu plus sur Vue et Vue Router

- Créer une nouvelle page (Terrain List) et l'ajouter dans le router

- Créer un nouveau component (Stats.vue) et le mettre dans la Home Page

DEVOIR 2:

-form pour entrer un game
-objet dans array

- tableau avec les 3 champs/ poubelle pour deleter (4 colones premiere colone type info edit delete)

- delete va supprimer dans array

- PLUS DIFFICILE - override la valeur dans array avec save button

Devoir 3:

- players create edit delete fully working (back et front)
- courses create edit delete fully working (back et front)
- game page dropdown pour selection player/courses et date ajd default
- players doit pouvoir accepter plusieurs et (radio checkbox liste)

Devoir 4:

- clean up backend
- 2 folder

splitter database

Devoir 5 :

- filtre sur la liste de players
- SEARCH

DB - knex.js
sq lite

Devoir 6 :

- Quand je click sur un player ajouter a un liste qui s'affiche et pouvoir delete si missclick

TODO

- Ajouter les autres fonctions a api

La page doit:

- commencer sur hole 1 et basculer les autres.
- increase/decrease le nombe de coups
- afficher nom du course en haut
- avoir un boutton back to games?

On mounted on doit creer des playingP pour garder modifier players(ajout score)

le score doit etre attaché a game id et player id (many to many)

DEVOIR 7 25 01
-extract api
-etude many to many
-reflechir a save score Playerbase
-ajouter comments, tout clarifier

api avec body???

Quand je save une game?
creer objet avec
player1 id + game id + player score

display score pour trou selectionne

# 31-01

- le score doit etre un obj et non array
- afficher setup dans course

# 1-02-22

- afficher score tu trou selectionne
- DONE ajouter component playerCard
- commencer api pour save game

# A FAIRE UN JOUR

- Afficher loading v-else
