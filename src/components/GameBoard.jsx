import React from 'react';
import propTypes from 'prop-types';

export default function GameBoard({ changeGameTurn, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((cell, cellIndex) => {
                                return (
                                    <li key={`${rowIndex}-${cellIndex}`}>
                                        <button
                                            onClick={() => changeGameTurn(rowIndex, cellIndex)}
                                            disabled={cell !== null}
                                        >
                                            {cell}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </li>
                );
            })}
        </ol>
    );
}
GameBoard.propTypes = {
    changeGameTurn: propTypes.func.isRequired,
    board: propTypes.array.isRequired,
};
