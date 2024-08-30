import React, { useEffect, useState } from 'react';
import BoardSquare from './BoardSquare';

const Board = ({ships, setShips}) => {
    const boardSize = 10;
    const [orientation, setOrientation] = useState('horizontal');

    useEffect(()=>{
        console.log(orientation)
    },[orientation])
    const handleDrop = (item, x, y) => {
        let newShip = {}
        setOrientation((prev)=>{
            newShip = {
                ...item,
                x,
                y,
                orientation: prev, 
            };
            return prev
        })
    
        setShips((prevShips) => {
            const updatedShips = prevShips.filter((ship) => ship.id !== item.id);

            if (!canPlaceShip(newShip, updatedShips)) {
                alert('You cannot place a ship here');
                return prevShips; // Return previous state to avoid placing the ship
            }

            // Add the new ship to the board
            return [...updatedShips, newShip];
        });
    };

    const canPlaceShip = (ship, currentShips) => {
        if (ship.orientation === 'horizontal') {
            if (ship.x + ship.length > boardSize) {
                return false;
            }
        } else {
            if (ship.y + ship.length > boardSize) {
                return false;
            }
        }
        for (let otherShip of currentShips) {
            if (ship.orientation === 'horizontal') {
                for (let i = 0; i < ship.length; i++) {
                    const x = ship.x + i;
                    if (otherShip.orientation === 'horizontal') {
                        if (
                            otherShip.y === ship.y &&
                            x >= otherShip.x &&
                            x < otherShip.x + otherShip.length
                        ) {
                            return false;
                        }
                    } else {
                        if (
                            x === otherShip.x &&
                            ship.y >= otherShip.y &&
                            ship.y < otherShip.y + otherShip.length
                        ) {
                            return false;
                        }
                    }
                }
            } else {
                for (let i = 0; i < ship.length; i++) {
                    const y = ship.y + i;
                    if (otherShip.orientation === 'horizontal') {
                        if (
                            otherShip.y === y &&
                            ship.x >= otherShip.x &&
                            ship.x < otherShip.x + otherShip.length
                        ) {
                            return false;
                        }
                    } else {
                        if (
                            otherShip.x === ship.x &&
                            y >= otherShip.y &&
                            y < otherShip.y + otherShip.length
                        ) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    };

    const isSquareOccupied = (x, y) => {
        for (let ship of ships) {
            if (ship.orientation === 'horizontal') {
                if (y === ship.y && x >= ship.x && x < ship.x + ship.length) {
                    return { occupied: true, shipName: ship.id, isStart: x === ship.x };
                }
            } else {
                if (x === ship.x && y >= ship.y && y < ship.y + ship.length) {
                    return { occupied: true, shipName: ship.id, isStart: y === ship.y };
                }
            }
        }
        return { occupied: false, shipName: '', isStart: false };
    };

    const renderSquare = (x, y) => {
        const { occupied, shipName, isStart } = isSquareOccupied(x, y);
        return (
            <BoardSquare
                key={`${x},${y}`}
                x={x}
                y={y}
                onDrop={(item) => handleDrop(item, x, y)}
                isOccupied={occupied}
                shipName={shipName}
                isStart={isStart}
            />
        );
    };

    const renderRow = (y) => {
        const squares = [];
        for (let x = 0; x < boardSize; x++) {
            squares.push(renderSquare(x, y));
        }
        return (
            <div key={y} style={{ display: 'flex' }}>
                {squares}
            </div>
        );
    };

    const renderBoard = () => {
        const rows = [];
        for (let y = 0; y < boardSize; y++) {
            rows.push(renderRow(y));
        }
        return <div>{rows}</div>;
    };

    const toggleOrientation = () => {
        setOrientation(orientation==="horizontal"?"vertical":"horizontal");
    };

    return (
        <div>
            <button onClick={toggleOrientation}>
                Toggle Orientation (Currently: {orientation})
            </button>
            {renderBoard()}
        
        </div>
    );
};

export default Board;
