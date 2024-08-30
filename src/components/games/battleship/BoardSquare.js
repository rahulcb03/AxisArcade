import React from 'react';
import { useDrop } from 'react-dnd';

const BoardSquare = ({ x, y, onDrop, isOccupied, shipName, isStart }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'ship',
    drop: (item) => onDrop(item, x, y),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const backgroundColor = isOver ? 'lightgreen' : canDrop ? 'lightblue' : 'white';

  return (
    <div
      ref={drop}
      style={{
        width: '40px',
        height: '40px',
        border: '1px solid black',
        backgroundColor,
        position: 'relative',
      }}
    >
      {isOccupied && (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'gray',
            borderRadius: '5px',
            position: 'relative',
          }}
        >
          {isStart && (
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px',
              }}
            >
              {shipName}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardSquare;
