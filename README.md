
# Jeu-de-la-Vie-Javascript

Ce projet est une implémentation du célèbre jeu de la vie en utilisant HTML, CSS et JavaScript. Le jeu de la vie est une automaton cellulaire imaginée par John Conway en 1970. Il est constitué d'une grille bidimensionnelle où chaque cellule peut être soit vivante, soit morte, en fonction de règles simples. Les cellules évoluent en fonction de générations successives.


## Utilisation
- Clonez le dépôt et ouvrez le fichier index.html dans votre navigateur pour démarrer le jeu.

- Ou accédez y directement via le lien suivant : https://gamelifesn.netlify.app/
## Fonctionnement
L'algorithme du jeu de la vie de Conway est basé sur la gestion des cellules vivantes stockées dans un tableau. Ces cellules peuvent être générées de manière aléatoire, ajoutées manuellement par l'utilisateur, ou évoluer en fonction des règles établies par John Conway.

#### Gestion des Cellules
- Stockage des Cellules Vivantes : Les cellules vivantes sont enregistrées dans un tableau appelé cellsAlive. Ce tableau conserve les indices des cellules actuellement vivantes dans la grille.

- Interaction Utilisateur : L'utilisateur peut interagir avec la grille en cliquant sur les cellules pour les rendre vivantes ou mortes. Ces changements sont reflétés dans le tableau cellsAlive.

#### Génération du Terrain
- Structure de la Grille : Le terrain est représenté à l'écran par l'utilisation de balises <span> regroupées en colonnes et en lignes. Chaque colonne est composée de plusieurs cellules, et chaque ligne est composée de plusieurs colonnes. Cette structure est générée dynamiquement en utilisant JavaScript.

- Caractéristique Infinie : Le terrain est conçu de manière à être infini horizontalement. Si une cellule atteint le bord inférieur du terrain, elle réapparaît en haut, et vice versa.

#### Application des Règles de Conway
- Algorithme des Générations : L'évolution de la grille est faite via la fonctions startInterval et pauseInterval. Ces fonctions appliquent les règles du jeu de la vie à chaque itération, déterminant quelles cellules survivent, meurent, ou naissent.
#### Réinitialisation du Terrain
- Fonction de Réinitialisation : La fonction ClearFunc est chargée de réinitialiser la grille en supprimant toutes les cellules et en rétablissant les paramètres par défaut. Cela permet à l'utilisateur de recommencer le jeu ou d'ajuster la configuration de la grille.
En résumé, le fonctionnement du code repose sur la gestion d'un tableau de cellules vivantes, la création dynamique du terrain, l'application des règles du jeu de la vie, et la possibilité pour l'utilisateur d'interagir avec la grille de manière intuitive.
## Auteur

- [@MdCode002](https://github.com/MdCode002)

