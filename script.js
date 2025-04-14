const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],
  [1, 4, 7], 
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Create board cells
function createBoard() {
  board.innerHTML = '';
  gameState = Array(9).fill('');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Current Turn: ${currentPlayer}`;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Current Turn: ${currentPlayer}`;
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c];
  });
}

restartBtn.addEventListener('click', createBoard);

createBoard();
