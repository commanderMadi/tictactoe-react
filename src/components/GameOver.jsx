import React from 'react';
import propTypes from 'prop-types';
export default function GameOver({ winner, handleRematch }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>{winner} It&apos;s a draw!</p>}
            <p>
                <button onClick={handleRematch}>Rematch</button>
            </p>
        </div>
    );
}

GameOver.propTypes = {
    winner: propTypes.string.isRequired,
    handleRematch: propTypes.func.isRequired,
};
