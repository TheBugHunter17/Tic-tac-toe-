document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    const playerXScore = document.getElementById('playerXScore');
    const playerOScore = document.getElementById('playerOScore');
    const winnerMessage = document.getElementById('winnerMessage');
    const initialPlayerSelect = document.getElementById('initialPlayer');
    const playerXNameInput = document.getElementById('playerXName');
    const playerONameInput = document.getElementById('playerOName');

    let playerXName = 'Player X';
    let playerOName = 'Player O';

    playerXNameInput.addEventListener('input', () => {
        playerXName = playerXNameInput.value.trim() || 'Player X';
    });

    playerONameInput.addEventListener('input', () => {
        playerOName = playerONameInput.value.trim() || 'Player O';
    });

    let currentPlayer = initialPlayerSelect.value;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let playerXWins = 0;
    let playerOWins = 0;

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}`;
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
        }
    }

    function handleCellClick(index) {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;

        if (checkWin()) {
            endGame(true);
        } else if (checkDraw()) {
            endGame(false);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.innerText = `It's ${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern =>
            gameBoard[pattern[0]] !== '' &&
            gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
            gameBoard[pattern[1]] === gameBoard[pattern[2]]
        );
    }

    function checkDraw() {
        return !gameBoard.includes('');
    }

    function endGame(isWinner) {
        gameActive = false;

        if (isWinner) {
            winnerMessage.innerText = `Congratulations, ${currentPlayer === 'X' ? playerXName : playerOName} wins!`;
            updateScore();
        } else {
            winnerMessage.innerText = "It's a draw!";
        }
    }

    function updateScore() {
        if (currentPlayer === 'X') {
            playerXWins++;
            playerXScore.innerText = `${playerXName}: ${playerXWins}`;
        } else {
            playerOWins++;
            playerOScore.innerText = `${playerOName}: ${playerOWins}`;
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = initialPlayerSelect.value;
        winnerMessage.innerText = '';
        status.innerText = `It's ${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;

        // Clear the board
        const cells = document.getElementsByClassName('cell');
        for (const cell of cells) {
            cell.innerText = '';
        }
    }

    resetButton.addEventListener('click', resetGame);

    initialPlayerSelect.addEventListener('change', () => {
        currentPlayer = initialPlayerSelect.value;
        status.innerText = `It's ${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
    });

    createBoard();
});
