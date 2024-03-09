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
            } else if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && !board[0][i] === 0) {
                return true
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && !board[0][0] == 0) {
            return true
        } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && !board[1][1] == 0) {
            return true
        }
    }

    const showGame = () => {
        let gameSpace = document.querySelector('gameSpace')
        console.log(board)
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.querySelector(`.cell${i}${j}`)
                cell.textContent = board[i][j]
                console.log(cell)
            }
        }
    }

    return { getBoard, printBoard, makeMove, checkWin, restartGame, showGame }
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

    const playRound = (row, column) => {
        if (board.getBoard()[row][column] == '0') {
            board.makeMove(activePlayer, row, column)
            board.showGame()
            board.printBoard()
            switchPlayers()
            if (board.checkWin()) {
                console.log(`${activePlayer.playerName} has won!`)
                board.restartGame()
                if (activePlayer == players[1]) {
                    activePlayer = players[0]
                }
            }
            console.log(`${activePlayer.playerName}'s turn`)
        } else {
            console.log('This cell is not empty')
        }
    }

    
    return { playRound, getActivePlayer }
}

const game = GameController()