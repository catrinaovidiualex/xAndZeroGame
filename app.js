window.addEventListener('DOMContentLoaded', () => {
    const box = Array.from(document.querySelectorAll('.box'));
    const playerDisplay = document.querySelector('.jucator');
    const resetButton = document.querySelector('#restart');
    const anuntj = document.querySelector('.anunta');

    let tabeljoc = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const again = 'Try Again';



    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let ifWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = tabeljoc[winCondition[0]];
            const b = tabeljoc[winCondition[1]];
            const c = tabeljoc[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                ifWon = true;
                break;
            }
        }

    if (ifWon) {
            anunta(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!tabeljoc.includes(''))
        anuntj(again);
    }

    const anuntaj = (type) => {
        switch(type){
            case PLAYERO_WON:
                anuntaj.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                anuntaj.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case again:
                anuntaj.innerText = 'Try again';
        }
        anuntaj.classList.remove('.ascunde');
    };

    const isValidAction = (box) => {
        if (box.innerText === 'X' || box.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        tabel[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (box, index) => {
        if(isValidAction(tile) && isGameActive) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        tabel = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        anunta.classList.add('ascunde');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        casuta.forEach(box => {
            casuta.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }

    box.forEach( (box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });

    resetButton.addEventListener('click', resetBoard);
});