import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../userDetails/UserDetailsProvider";
import { WebSocketContext } from "../../../webSocket/WebSocketProvider";
import targetImage from '../../../img/target.png';


const OceanBoard = ({oceanBoard}) =>{


    const renderSquare = (col, row) => {
        let color = "blue";
        let name = "";
        let isHit = false;

        if (oceanBoard[row][col] !== null) {
            name = oceanBoard[row][col].substring(0, 2);
            color = "gray";
            isHit = oceanBoard[row][col].endsWith('H');
        }

        return (
            <button 
                key={`${row},${col}`}
                style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid black',
                    position: 'relative',
                    backgroundColor: color,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                {isHit && (
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                )}
            </button>
        );
    };

    const renderRow = (y) => {
        const squares = [];
        for (let x = 0; x < 10; x++) {
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
        for (let y = 0; y < 10; y++) {
            rows.push(renderRow(y));
        }
        return <div>{rows}</div>;
    };



    return (
        <div>
            {renderBoard()}
    
        </div>
    )


}

export default OceanBoard; 