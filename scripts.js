const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Start the game
function startGame() {
  status.textContent = `Player ${currentPlayer}'s turn`;
  gameActive = true;
}

// Handle cell click
function handleCellClick(e) {
  if (!gameActive) {
    status.textContent = 'Please start the game by clicking any cell';
    return;
  }

  const clickedCell = e.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (boardState[cellIndex] !== '') {
    status.textContent = 'This cell is already filled. Choose another one.';
    return;
  }

  boardState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  // Add the "clicked" class to animate the cell
  clickedCell.classList.add('clicked');

  if (checkWin()) {
    status.classList.add('win-message');
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    disableCellClick(); // Disable clicking on cells
    return;
  }

  if (checkDraw()) {
    status.classList.add('draw-message');
    status.textContent = 'It\'s a draw!';
    gameActive = false;
    disableCellClick(); // Disable clicking on cells
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Disable cell click
function disableCellClick() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleCellClick);
  });
}

// Reset the game
function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('clicked'); // Remove 'clicked' class
  });
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  status.classList.remove('win-message', 'draw-message'); // Remove win/draw message class
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
}

// Add event listener for reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

// Check win
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return boardState[index] === currentPlayer;
    });
  });
}

// Check draw
function checkDraw() {
  return boardState.every(cell => {
    return cell !== '';
  });
}

// Add event listener for cell clicks
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Start the game
startGame();
