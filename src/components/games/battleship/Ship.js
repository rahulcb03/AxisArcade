import React from 'react';
import { useDrag } from 'react-dnd';

const Ship = ({ id, name, length }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ship',
    item: { id, length },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: `${length * 40}px`,
        height: '40px',
        backgroundColor: 'gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
        marginBottom: '10px',
      }}
    >
      {name}
    </div>
  );
};

export default Ship;
