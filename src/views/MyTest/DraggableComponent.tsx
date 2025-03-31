
import React, { useState, useRef } from 'react';

const DraggableComponent = (props: any) => {
  const  id=props.id;
  const  content=props.content;
  const  initialPosition=props.initialPosition;

  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState(initialPosition);
  const componentRef = useRef(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);

    function handleDrag(e) {
      
      setPosition({
        x: e.clientX - 440,
        y: e.clientY - 135,
      });
      props.FHonChange(id,e.clientX - 440,e.clientY - 135);
    }

    function handleDragEnd() {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    }
  };

  const handleHide = () => {
    props.FHonChangeOK(id,0,0);
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div
        ref={componentRef}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          opacity: isDragging ? 0.5 : 1,
          cursor: isDragging ? 'grabbing' : 'grab',
          border: '1px solid #ccc',
          padding: '8px',
          color:'blue',
        }}
        onMouseDown={handleDragStart}
      >
         <button onClick={handleHide}>隐藏</button>
         {`${id}- 位置: (${position.x}, ${position.y})`}
      </div>
    )
  );
};

export default DraggableComponent;
