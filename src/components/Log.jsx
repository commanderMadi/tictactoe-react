import React from 'react';
import propTypes from 'prop-types';
export default function Log({ turns }) {
    return (
        <ol id="log">
            {turns.map((turn, index) => (
                <li key={`turn.player-${index}`}>
                    {turn.player} played at row {turn.square.row}, col {turn.square.col}
                </li>
            ))}
        </ol>
    );
}

Log.propTypes = {
    turns: propTypes.array.isRequired,
};
