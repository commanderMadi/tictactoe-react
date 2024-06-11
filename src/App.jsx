/*eslint no-undef: "error"*/

import React from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import { useState } from 'react';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './helpers/winning_combinations';
import GameOver from './components/GameOver';

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const INITIAL_PLAYERS = {
    X: 'Player 1',
    O: 'Player 2',
};

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}
function deriveActivePlayer(gameTurns) {
    let currentActivePlayer = 'X';
    if (gameTurns.length && gameTurns[0].player === 'X') {
        currentActivePlayer = 'O';
    }
    return currentActivePlayer;
}

function deriveWinner(gameBoard, players) {
    let winner = null;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquare = gameBoard[combination[0].row][combination[0].column];
        const secondSquare = gameBoard[combination[1].row][combination[1].column];
        const thirdSquare = gameBoard[combination[2].row][combination[2].column];

        if (firstSquare && firstSquare == secondSquare && firstSquare == thirdSquare) {
            winner = players[firstSquare];
        }
    }
    return winner;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(INITIAL_PLAYERS);
    const currentActivePlayer = deriveActivePlayer(gameTurns);

    const gameBoard = deriveGameBoard(gameTurns);

    const winner = deriveWinner(gameBoard, players);

    const isDraw = gameTurns.length === 9 && !winner;

    function handleSelectPlayer(rowIndex, colIndex) {
        setGameTurns((prevTurns) => {
            let currentActivePlayer = deriveActivePlayer(prevTurns);
            if (prevTurns.length && prevTurns[0].player === 'X') {
                currentActivePlayer = 'O';
            }
            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentActivePlayer,
                },
                ...prevTurns,
            ];
            return updatedTurns;
        });
    }
    function handleRematch() {
        setGameTurns([]);
        setPlayers({ ...INITIAL_PLAYERS });
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName,
            };
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol className="highlight-player" id="players">
                    <Player
                        initialName={INITIAL_PLAYERS['X']}
                        symbol="X"
                        isActive={currentActivePlayer === 'X'}
                        handlePlayerNameChange={handlePlayerNameChange}
                    />
                    <Player
                        initialName={INITIAL_PLAYERS['O']}
                        symbol="O"
                        isActive={currentActivePlayer === 'O'}
                        handlePlayerNameChange={handlePlayerNameChange}
                    />
                </ol>
                {(winner || isDraw) && <GameOver winner={winner} handleRematch={handleRematch} />}
                <GameBoard board={gameBoard} changeGameTurn={handleSelectPlayer} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
