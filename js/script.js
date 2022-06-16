// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


// chiedo il livello di difficoltà all'utente (tramite il tasto play-btn)
const playBtn = document.querySelector('#play');

// Faccio partire il gioco aggiungendo un evento con click:
playBtn.addEventListener('click', startGame);

// Funzione che attiva il gioco in base al livello di difficoltà scelto
function startGame() {
    // Html Element
    const mainGrid = document.querySelector('#main-grid');
    const userMessage = document.querySelector('#user-message');
    // reset delle celle
    mainGrid.innerHTML = '';
    mainGrid.className = '';

    // Creo un reset della griglia all'inizio di ogni nuova partita che svuoterà la griglia precedente:
    mainGrid.innerHTML = '';

    // Creo un reset delle classi all'inizio di ogni nuova:
    mainGrid.className = '';
    
    let gameLevel;
    let gameLevelValue;

    // Numero di bombe
    const numberOfBombs = 16;
    // livello scelto dall'utente
    const userLevel = document.querySelector('#user-level').value;
    console.log(userLevel)

    // indico livello di difficoltà
    levelDifficulty = userLevel;

    // SE sceglie 1 il livello di difficoltà è 100
    if(levelDifficulty === '1') {
        gameLevelValue = 100;
        gameLevel = 'easy';
    } 
    // ALTRIMENTI SE 2 il livello di difficoltà è 81
    else if(levelDifficulty === '2') {
        gameLevelValue = 81;
        gameLevel = 'hard';
    } 
    // ALTRIMENTI SE 3 il livello di difficoltà è 49
    else if(levelDifficulty === '3') {
        gameLevelValue = 49;
        gameLevel = 'crazy';
    }

    // Genero le bombe
    const bombs = generateBombs(numberOfBombs, 1, gameLevelValue);
    console.log(bombs);

    // numero tentativi
    let numberAttempts = gameLevelValue - numberOfBombs;
    console.log(numberAttempts);

    //Array numeri azzeccati
    const successfulNumbers = [];

    // Generare la griglia
    // Dare una classe alla griglia stessa che decida le dimensioni degli square
    mainGrid.classList.add(gameLevel);
    generateGrid();

    function generateGrid() {
        for(let i = 1; i <= gameLevelValue; i++) {
            // Creare la cella in DOM con tag div
            const newCell = document.createElement('div');
            // al suo interno contiene uno span            
            newCell.innerHTML = `<span>${i}</span>`;
            // al div aggiungo la classe square
            newCell.classList.add('square');
            // richiamo la funzione peri il ceck 
            newCell.addEventListener ( 'click', checkClick);
            //appendo la cella alla griglia (maingrid)
            mainGrid.append(newCell);
        }
    }

    // funzione per identificare la cella con un colore in base a: se è una bomba o no
    function checkClick(){
        let userNumber = parseInt(this.querySelector('span').innerHTML);
        // SE la cella cliccata è una bomba allora coloro di rosso la cella e scrivo in pagina che "Hai perso"
        if(bombs.includes(userNumber)){ 
            this.classList.add('red');
            userMessage.innerHTML = `ops sei ESPLOSO!!, hai utilizzato ${successfulNumbers.length} tentativi.`;  
        } else {
            // SE la cella cliccata non è una bomba allora lo coloro di blu
            if(!successfulNumbers.includes (userNumber)){
                successfulNumbers.push(userNumber);
                this.classList.add('blue');
            }
            // quando ho raggiunto tutti i tentativi senza mai prendere la bomba, in pagina scrivo "Hai vinto"    
            if(successfulNumbers.length === numberAttempts){
                userMessage.innerHTML = `Hai VINTO,non sei ESPLOSO!!, hai utilizzato il massimo dei tentativi: ${rightNumbers.length}`;
            }            
        }  
                            
    }

}

// ------------------------
// UTILITY FUNCTIONS
// ------------------------
function generateBombs(nBombs, rangeMin, rangeMax) {
    // genero 16 bombe con numeri casuali in un array vuoto
    // Array vuoto
    const randomNBombsArray = [];

    while(randomNBombsArray.length < nBombs) {
        // creare un numero ramdon da rangeMin a rangeMax
        const randomNBombs = getRndInteger(rangeMin, rangeMax);
        if(!randomNBombsArray.includes(randomNBombs)) {
            randomNBombsArray.push(randomNBombs);
        }
    }

    return randomNBombsArray;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}