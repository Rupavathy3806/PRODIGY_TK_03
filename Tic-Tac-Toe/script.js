const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetBtn.addEventListener('click', resetGame);
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const index = this.getAttribute('data-index');

    if (board[index] !== '' || !running) {
        return;
    }

    updateCell(this, index);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA === '' || cellB === '' || cellC === '') continue;

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
        running = false;
    } else if (!board.includes('')) {
        statusText.textContent = `It's a tie! 🤝`;
        running = false;
    } else {
        changePlayer();
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    running = true;
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

initializeGame();
