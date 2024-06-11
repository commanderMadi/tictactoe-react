import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Player({ initialName, symbol, isActive, handlePlayerNameChange }) {
    const [name, setName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setName(initialName); // Update the name when initialName changes
    }, [initialName]);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setIsEditing((editing) => !editing);
            handlePlayerNameChange(symbol, name);
        }
    }

    function handleClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            handlePlayerNameChange(symbol, name);
        }
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    let playerName = (
        <span onClick={handleClick} className="player-name">
            {name}
        </span>
    );

    if (isEditing) {
        playerName = (
            <input type="text" value={name} onKeyDown={handleKeyPress} onChange={handleChange} />
        );
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}

Player.propTypes = {
    initialName: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    handlePlayerNameChange: PropTypes.func.isRequired,
};
