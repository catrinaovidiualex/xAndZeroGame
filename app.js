window.addEventListener('DOMContentLoaded', () => {
    let boxes = Array.from(document.querySelectorAll('.box'));
    let jucatorAles = document.querySelector('.jucator');
    let restartButton = document.querySelector('#restart');
    let anuntj = document.querySelector('.anunta');

    let tabeljoc = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const again = 'Try Again';



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

    function handleResultValidation() {
        let ifWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winConditions[i];
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
            validarej(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isActive = false;
            return;
        }

    if (!tabeljoc.includes(''))
        validarej(again);
    }

    const validarej = (type) => {
        switch(type){
            case PLAYERO_WON:
                anuntj.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                anuntj.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case again:
                anuntj.innerText = 'Try again';
        }
        anuntj.classList.remove('ascunde');
    };

    const isValidAction = (box) => {
        if (box.innerText === 'X' || box.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        tabeljoc[index] = currentPlayer;
    }

    const changePlayer = () => {
        jucatorAles.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        jucatorAles.innerText = currentPlayer;
        jucatorAles.classList.add(`player${currentPlayer}`);
    }

    const userAction = (box, index) => {
        if(isValidAction(box) && isActive) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        tabeljoc = ['', '', '', '', '', '', '', '', ''];
        isActive = true;
        anuntj.classList.add('ascunde');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        boxes.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }

    boxes.forEach( (box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });

    restartButton.addEventListener('click', resetBoard);
});