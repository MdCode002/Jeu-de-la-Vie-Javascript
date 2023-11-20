// Variables
var sliderRow = document.getElementById("RangeRow");
var sliderCol = document.getElementById("RangeCol");
var outputRow = document.getElementById("row");
var outputCol = document.getElementById("collum");  // Correction du nom de la variable
let ModifSize = document.getElementById("ModifSize");
let PlayBtn = document.getElementById('PlayBtn');
let PauseBtn = document.getElementById('PauseBtn');
let Clear = document.getElementById("Clear");
let Aleatoire = document.getElementById("Aleatoire");
let cols;  // Ajout d'un point-virgule à la fin de la déclaration de variable
let RowClearValue = 25;
let ColClearValue = 35;
let isPaused = true;

// Affiche le nombre de lignes et de colonnes dans les paramètres
outputRow.innerHTML = sliderRow.value;
outputCol.innerHTML = sliderCol.value;  // Correction du nom de la variable
sliderRow.oninput = function() {
    outputRow.innerHTML = this.value;
}
sliderCol.oninput = function() {
    outputCol.innerHTML = this.value;  // Correction du nom de la variable
}

// Fonction pour effacer le terrain
function  ClearFunc(){
    cols = document.querySelectorAll('.column');
    cols.forEach(col => {
        col.remove();
    });

    initializeGrid(ColClearValue, RowClearValue);
    // On réinitialise la génération
    nbrgen = 0;
    gen.innerHTML = nbrgen;
    if (!isPaused) {
        pauseInterval();
        isPaused = true;
    }
    console.log(cellsAlive);
}

// Modifie la taille du terrain quand on clique sur le bouton
ModifSize.addEventListener('click', () => {
    ClearFunc();
    cellsAlive = [];
    cols = document.querySelectorAll('.column');
    cols.forEach(col => {
        col.remove();
    });
    RowClearValue = sliderRow.value;
    ColClearValue = sliderCol.value;
    initializeGrid(ColClearValue, RowClearValue);
})

// Efface le terrain
Clear.addEventListener('click', () => {
    cellsAlive = [];
    ClearFunc();
})

// Boutons pour mettre en pause et jouer
PlayBtn.addEventListener('click', () => {
    if (isPaused) {
        startInterval();
        isPaused = false;
    }
    console.log(cellsAlive);
});

PauseBtn.addEventListener('click', () => {
    if (!isPaused) {
        pauseInterval();
        isPaused = true;
    }
    console.log(cellsAlive);
    console.log(squares.length);
});

// Bouton de génération aléatoire
Aleatoire.addEventListener('click', () => {
    // Je vide le terrain
    cellsAlive = [];
    ClearFunc();
    squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length;) {
        // On vérifie si la cellule n'est pas déjà vivante
        if (squares[i].style.background != 'blue') {
            squares[i].style.background = 'blue';

            if (!cellsAlive.includes(i) && squares[i].style.background === 'blue') {
                cellsAlive.push(i);
            }
        }
        // On change le pas en l'additionnant avec un nombre aléatoire
        i += Math.floor(Math.random() * 3) + 1;
    }
});
