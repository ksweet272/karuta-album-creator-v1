import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Card = ({ card, index, moveCard }) => {
  const ref = useRef(null);

const [, drop] = useDrop({
  accept: 'CARD',
  hover(item, monitor) {
    if (!ref.current) {
      return;
    }
    const dragIndex = item.index;
    const hoverIndex = index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = ref.current.getBoundingClientRect();

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Only move when the mouse has crossed half of the item's width
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    // Perform the move
    moveCard(dragIndex, hoverIndex);
    item.index = hoverIndex;
  },
});

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', id: card.cardId, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div 
      ref={ref} 
      className="card" 
      style={{ opacity: isDragging ? 0.5 : 1 }}
      data-card-id={card.cardId}
    >
      <div className="card-image-container">
        <img 
          src={card.imageUrl} 
          alt={card.cardName} 
          onError={(e) => e.target.src = 'https://i.ibb.co/zSxJyz5/imagenotfound.png'}
        />
      </div>
      <p>Card ID: {card.cardId}</p>
      <p>Print: {card.print}</p>
      <p>Edition: {card.edition}</p>
      <p>Series: {card.series}</p>
      <p>Name: {card.cardName}</p>
    </div>
  );
};

export default Card;
