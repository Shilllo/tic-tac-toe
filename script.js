function Gameboard() {
    const board = []
    for (let i = 0; i <= 2; i++) {
        board[i] = [0, 0, 0]
    }

    const restartGame = () => {
        for (let i = 0; i <= 2; i++) {
            board[i] = [0, 0, 0]
        }
    }
    
    const getBoard = () => board

    const printBoard = () => {
        console.log(board)
    }

    const makeMove = (player, row, column) => {
        board[row][column] = player.token
    }

    const checkWin = () => {
        for (let i = 0; i <= 2; i++) {
            const row = new Set(board[i])
            if (Array.from(row).length === 1 && !Array.from(row).includes(0)) {
                return true
            } else if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] != 0) {
                return true
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && !board[0][0] == 0) {
            return true
        } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && !board[1][1] == 0) {
            return true
        }
    }

    const cleanBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.querySelector(`.cell${i}${j}`)
                cell.textContent = ""
                const message = document.querySelector('.message')
                message.textContent = ""
            }
        }
    }
    const showGame = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] != 0) {
                    const cell = document.querySelector(`.cell${i}${j}`)
                cell.textContent = board[i][j]
                }
            }
        }
    }

    return { getBoard, printBoard, makeMove, checkWin, restartGame, showGame, cleanBoard }
}

function GameController(
    playerOneName = 'Player1',
    playerTwoName = 'Player2'
) {
    const board = Gameboard()

    const players = [
        {
            playerName: playerOneName,
            token: "X"
        },
        {
            playerName: playerTwoName,
            token: "O"
        }
    ]

    let activePlayer = players[0]

    console.log(`${activePlayer.playerName}'s turn`)


    const switchPlayers = () => {
        activePlayer = activePlayer === players[0] ? players[1]: players[0]
    }

    const getActivePlayer = () => {
        return console.log(activePlayer.playerName)
    }

    board.showGame()

    const playRound = (row, column) => {
        const message = document.querySelector('.message')
        if (board.getBoard()[row][column] == '0' && message.textContent == "") {
            board.makeMove(activePlayer, row, column)

            board.showGame()

            board.printBoard()

            if (board.checkWin()) {
                const body = document.querySelector('body')
                message.textContent = `${activePlayer.playerName} has won!`
                body.appendChild(message)
                board.restartGame()
                if (activePlayer == players[1]) {
                    activePlayer = players[0]
                }
            }
            switchPlayers()
            console.log(`${activePlayer.playerName}'s turn`)
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.querySelector(`.cell${i}${j}`)
            cell.addEventListener('click', function() {
                playRound(i, j)
            })
        }
    }

    const restartBtn = document.querySelector('.restart')
    restartBtn.addEventListener('click', function() {
        board.restartGame()
        board.cleanBoard()
    })
    return { playRound, getActivePlayer }
}

const game = GameController()