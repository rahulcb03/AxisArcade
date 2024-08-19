import React, { useState } from "react";
import "./GameBoard.css"
import Board from "../../img/board.png"
import RedPice from "../../img/red-piece.png"
import YellowPice from "../../img/yellow-piece.png"
import Triangle from "../../img/select-triangle.png"

const GameBoard= ({ board, onColumnClick }) =>{
    const [column , setColumn] = useState()

    const handleColumnSelect = (num) =>{
        onColumnClick(num)
        setColumn(num)
    }

    return (
        <div className="board-container">
        <img src={Board} alt="Game Board" className="board-image"/>

        {column>=0 && <div className="triangle-selctions"
            style={{
                left:`${83+column*94}px`
            }
            }>
            <img 
                src={Triangle}
                
            /> 
        </div>}
        <div className="column-buttons">
                {[...Array(7)].map((_, i) => (
                    <button className="column-btn" key={i} onClick={() => handleColumnSelect(i)}></button>
                ))}
        </div>
        
        
        {board.map((row, rowIndex) => (
            row.map((cell, columnIndex) => {

                
                const isEmpty = cell === ".";
                return (
                    !isEmpty && (
                        <img src={cell === "R" ? RedPice : YellowPice}
                            key={rowIndex *6 + columnIndex}
                            className={`piece ${cell === "R" ? 'red' : 'yellow'}`}
                            style={{
                                top: `${rowIndex * 94}px`, // Adjust based on your cell size
                                left: `${columnIndex * 94}px`, // Adjust these to match your board
                        
                    
                        
                            }}
                    
                        />
                    )
                );
        })
      ))}
    </div>
  );
}


  export default GameBoard
  