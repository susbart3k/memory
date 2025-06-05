const startScreen = document.getElementById('start-screen');
const gameArea = document.getElementById('game-area');
const gameBoard = document.querySelector('.game-board');
const winScreen = document.getElementById('win-screen');
const loseScreen = document.getElementById('lose-screen');
const playAgainBtn = document.getElementById('play-again');
const goHomeBtn = document.getElementById('go-home');
const playAgainLoseBtn = document.getElementById('play-again-lose');
const goHomeLoseBtn = document.getElementById('go-home-lose');

let selectedLevel = null;
let flippedCards = [];
let matchedCount = 0;
let moveCount = 0;
let moveLimit = Infinity;

const cardImages = [
  'card-images/A.png', 'card-images/B.png', 'card-images/C.png', 'card-images/D.png',
  'card-images/E.png', 'card-images/F.png', 'card-images/G.png', 'card-images/H.png',
  'card-images/I.png', 'card-images/J.png', 'card-images/K.png', 'card-images/L.png',
  'card-images/M.png', 'card-images/N.png', 'card-images/O.png', 'card-images/P.png',
  'card-images/Q.png', 'card-images/R.png'
];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

document.querySelectorAll('.level-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.level-button').forEach(btn => btn.classList.remove('active-level'));
    button.classList.add('active-level');
    selectedLevel = button.dataset.level;

    setupMoveLimit(selectedLevel);

    const numCards = setupGrid(selectedLevel);
    createCards(numCards);

    startScreen.classList.add('hidden');
    winScreen.classList.add('hidden');
    loseScreen.classList.add('hidden');
    gameArea.classList.remove('hidden');

    resetGame();
    updateMoveCounter();
  });
});

function setupGrid(level) {
  let numCards, columns;
  switch(level) {
    case 'latwy': numCards = 8; columns = 4; break;
    case 'sredni': numCards = 16; columns = 4; break;
    case 'trudny': numCards = 24; columns = 5; break;
    case 'masakryczny': numCards = 36; columns = 6; break;
    default: numCards = 8; columns = 4;
  }
  gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  return numCards;
}

function createCards(num) {
  const neededImages = cardImages.slice(0, num / 2);
  const gameCards = [...neededImages, ...neededImages];
  shuffle(gameCards);
  gameBoard.innerHTML = '';

  gameCards.forEach(src => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = src;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back"><img src="${src}" alt="card image" /></div>
      </div>
    `;
    gameBoard.appendChild(card);
  });
}

function resetGame() {
  flippedCards = [];
  matchedCount = 0;
  moveCount = 0;
  gameBoard.querySelectorAll('.card').forEach(card => {
    card.classList.remove('flipped');
    card.style.pointerEvents = 'auto';
  });
  loseScreen.classList.add('hidden');
  winScreen.classList.add('hidden');
}

function setupMoveLimit(level) {
  if (level === 'latwy') moveLimit = Infinity;
  else if (level === 'sredni') moveLimit = 18;
  else if (level === 'trudny') moveLimit = 24;
  else if (level === 'masakryczny') moveLimit = 46;
}

function updateMoveCounter() {
  let counter = document.getElementById('move-counter');
  if (!counter) {
    counter = document.createElement('div');
    counter.id = 'move-counter';
    counter.style.fontSize = '1.5rem';
    counter.style.textAlign = 'center';
    counter.style.color = '#fff';
    counter.style.marginTop = '1rem';
    gameArea.insertBefore(counter, gameBoard);
  }
  counter.textContent = isFinite(moveLimit)
    ? `Ruchy: ${moveCount} / ${moveLimit}`
    : `Ruchy: ${moveCount} / ∞`;
}

gameBoard.addEventListener('click', e => {
  const clicked = e.target.closest('.card');
  if (!clicked) return;
  if (clicked.classList.contains('flipped')) return;
  if (flippedCards.length === 2) return;

  if (moveCount >= moveLimit) return;

  clicked.classList.add('flipped');
  flippedCards.push(clicked);

  if (flippedCards.length === 2) {
    moveCount++;
    updateMoveCounter();

    if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
      flippedCards.forEach(card => card.style.pointerEvents = 'none');
      matchedCount += 2;
      flippedCards = [];

      if (matchedCount === gameBoard.children.length) {
        setTimeout(() => {
          showWinScreen();
        }, 700);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(card => card.classList.remove('flipped'));
        flippedCards = [];
      }, 1000);
    }

    if (moveCount >= moveLimit && isFinite(moveLimit) && matchedCount < gameBoard.children.length) {
      setTimeout(() => {
        showLoseScreen();
      }, 700);
    }
  }
});

function showWinScreen() {
  let movesInfo = document.getElementById('moves-info');
  if (!movesInfo) {
    movesInfo = document.createElement('p');
    movesInfo.id = 'moves-info';
    movesInfo.style.marginTop = '1rem';
    movesInfo.style.fontSize = '1.5rem';
    movesInfo.style.color = '#d08859';
    winScreen.querySelector('.win-message').appendChild(movesInfo);
  }
  movesInfo.textContent = `Wykonane ruchy: ${moveCount}`;
  gameArea.classList.add('hidden');
  winScreen.classList.remove('hidden');
}

function showLoseScreen() {
  loseScreen.style.display="flex";
  let loseInfo = document.getElementById('lose-info');
  if (!loseInfo) {
    loseInfo = document.createElement('p');
    loseInfo.id = 'lose-info';
    loseInfo.style.marginTop = '1rem';
    loseInfo.style.fontSize = '1.5rem';
    loseInfo.style.color = '#ff4444';
    loseScreen.querySelector('.lose-message').appendChild(loseInfo);
  }
  loseInfo.textContent = `Wykonane ruchy: ${moveCount} / ${moveLimit}`;
  gameArea.classList.add('hidden');
  loseScreen.classList.remove('hidden');
}

playAgainBtn.addEventListener('click', () => {
  startScreen.classList.remove('hidden');
  winScreen.classList.add('hidden');
  gameArea.classList.add('hidden');
  selectedLevel = null;
  document.querySelectorAll('.level-button').forEach(btn => btn.classList.remove('active-level'));
});

goHomeBtn.addEventListener('click', () => {
  window.location.href = "mainpage.html";
});

playAgainLoseBtn.addEventListener('click', () => {
  startScreen.classList.remove('hidden');
  loseScreen.classList.add('hidden');
  gameArea.classList.add('hidden');
  selectedLevel = null;
  document.querySelectorAll('.level-button').forEach(btn => btn.classList.remove('active-level'));
});

goHomeLoseBtn.addEventListener('click', () => {
  window.location.href = "mainpage.html";
});
