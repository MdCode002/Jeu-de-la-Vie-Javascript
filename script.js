// Déclaration des variables
const gridContent = document.getElementById('content');
let columns = document.querySelectorAll('.column');
let gen = document.querySelector('#gen');
let squares;
var cellsAlive = [];
let cellsMaxLenght;
let interval;
let nbrgen = 0;

// Initialiser la grille avec des valeurs par défaut
const numColumns = 40;
const numRows = 30;

// Ajouter une nouvelle colonne à la grille
function loadMoreColumn() {
  const newColumn = document.createElement('span');
  newColumn.className = 'column';
  gridContent.appendChild(newColumn);
  columns = document.querySelectorAll('.column');
}

// Ajouter une nouvelle ligne à chaque colonne
function loadMoreRow() {
  // cellsMaxLenght représente la longueur d'une colonne, cette valeur sera utile plus tard pour des calculs sur la position des cellules
  cellsMaxLenght = columns[0].childElementCount;
  columns.forEach((column) => {
    let newRow = document.createElement('span');
    newRow.className = 'square';
    column.appendChild(newRow);
  });
}

// Associer un gestionnaire d'événements aux cellules pour ajouter ou supprimer des cellules vivantes au clic
function CreateAliveCells(cellsAlive) {
  // récupérer toutes les cases de la grille
  squares = document.querySelectorAll('.square');
  squares.forEach((square, index) => {
    // Associer un gestionnaire d'événements à chaque cellule
    square.addEventListener('click', () => {
      if (square.style.background != 'blue') {
        // Si la cellule n'est pas vivante, on la met en bleu et on la rajoute dans le tableau
        square.style.background = 'blue';
        if (!cellsAlive.includes(index) && squares[index].style.background === 'blue') {
          cellsAlive.push(index);
          console.log(cellsAlive);
        }
      } else {
        // Si la cellule est déjà vivante, on la met en gris et on la supprime du tableau
        square.style.background = 'gray';
        let indexOfCell = cellsAlive.indexOf(index);
        // Vérifier si l'index a été trouvé
        if (indexOfCell !== -1) {
          // Supprimer l'élément du tableau
          cellsAlive.splice(indexOfCell, 1);
        }
      }
    });
  });
}

// Fonction pour Générer la grille
function initializeGrid(col, row) {
  for (let i = 0; i < col; i++) {
    // Ajoute une colonne à chaque itération
    loadMoreColumn();
  }

  for (let i = 0; i < row; i++) {
    // Ajoute une ligne à chaque itération
    loadMoreRow();
  }
  // Instancie l'écouteur d'événement pour la création des cellules
  CreateAliveCells(cellsAlive);
}

// Fonction pour vérifier si une cellule est en vie
function isAlive(cell) {
  return cellsAlive.includes(cell);
}

// Fonction qui calcule le nombre de voisins d'une cellule
function neighbor(cell, cellsMaxLenght, i) {
  let cellNotAlive = [];

  // Fonction qui vérifie si un voisin est vivant ou non, si oui, elle itère une variable i qui correspond au nombre de voisins vivants / sinon, elle le met dans un tableau où il y a les voisins non vivants
  function checkNeighbor(offset) {
    const neighborCell = cell + offset;
    if (isAlive(neighborCell)) {
      i++;
    } else {
      if (squares.length > neighborCell && neighborCell >= 0) {
        cellNotAlive.push(neighborCell);
      }
    }
  }

  // Utilise la fonction checkNeighbor pour vérifier si les 8 voisins de la cellule sont vivants en fonction de leur position
  checkNeighbor(-1);
  checkNeighbor(1);
  checkNeighbor(cellsMaxLenght + 1);
  checkNeighbor(-cellsMaxLenght - 1);
  checkNeighbor(cellsMaxLenght + 2);
  checkNeighbor(-cellsMaxLenght - 2);
  checkNeighbor(-cellsMaxLenght);
  checkNeighbor(cellsMaxLenght);

  // Retourne le nombre de voisins i / et le tableau de voisins non vivants
  return { i, cellNotAlive };
}

// Fonction pour commencer la boucle principale de l'algorithme
function startInterval() {
  interval = setInterval(() => {
    // itère le nombre de générations

    // Un tableau qui contient la position des cellules qui doivent mourir
    let WillDiePos = [];
    // Un tableau qui contient l'index des cellules qui doivent mourir
    let WillDieIndex = [];
    // Un tableau qui contient les cellules qui doivent naître
    let WillBorn = [];

    // Pour chaque cellule vivante
    cellsAlive.forEach((cell, index) => {
      // i correspond au nombre de voisins d'une cellule vivante
      let i = 0;
      // on re-vérifie si la cellule est vraiment vivante
      if (squares[cell] && squares[cell].style.background == 'blue') {
        // on appelle la fonction neighbor et on stocke le résultat dans result
        const result = neighbor(cell, cellsMaxLenght, i);
        // on récupère le nombre de cellules vivantes qui sont voisines de la cellule courante
        i = result.i;
        // on récupère l'index des cellules mortes qui sont voisines de la cellule
        let cellsNotAlive = result.cellNotAlive;

        // on parcourt les cellules voisines de la cellule courante qui sont mortes
        cellsNotAlive.forEach((cellNotAlive) => {
          // on vérifie si elle n'a pas déjà été ajoutée dans le tableau des cellules qui doivent naître
          if (!WillBorn.includes(cellNotAlive)) {
            let j = 0;
            // on récupère le nombre de voisins vivants qu'elle a et on la stocke dans j
            let resultNotAlive = neighbor(cellNotAlive, cellsMaxLenght, j);
            j = resultNotAlive.i;
            // si le nombre de voisins vivants qu'elle a est égal à 3, alors on la pousse dans le tableau des cellules qui doivent naître
            if (j == 3 && !isAlive(cellNotAlive) && cellNotAlive >= 0) {
              WillBorn.push(cellNotAlive);
            }
          }
        });
        // Si la cellule vivante courante a plus de 3 voisins vivants ou moins de 2 voisins vivants, on la met dans les tableaux des cellules qui doivent mourir
        if (i > 3 || i < 2) {
          WillDiePos.push(cell);
          WillDieIndex.push(index);
        }
      }
    });

    // on reverse le tableau WillDieIndex à cause de problèmes d'index
    WillDieIndex.reverse();
    for (let i = 0; i < WillDiePos.length; i++) {
      // on supprime chaque cellule qui est dans les tableaux WillDie en les enlevant du tableau cellsAlive et en les mettant en gris
      squares[WillDiePos[i]].style.background = 'gray';
      cellsAlive.splice(WillDieIndex[i], 1);
    }
    WillBorn.forEach((cell) => {
      // on met chaque cellule qui est dans le tableau WillBorn dans le tableau cellsAlive et on les met en bleu
      squares[cell].style.background = 'blue';
      cellsAlive.push(cell);
    });
    // si il y a un changement on incrémente la génération / sinon on considère que la génération est stable
    if (WillDieIndex.length > 0 || WillBorn.length > 0) {
      nbrgen++;
      gen.innerHTML = nbrgen;
    }
  }, 100);
}

// fonction de pause
function pauseInterval() {
  clearInterval(interval);
}

// Appel initial pour initialiser la grille
initializeGrid(numColumns, numRows);

// initial Generation
gen.innerHTML = nbrgen;
