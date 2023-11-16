import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';
import ExportKarutaCommands from './ExportKarutaCommands';

const Album = ({ album }) => {
  const [cards, setCards] = useState(album.cards);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const newCards = [...cards];
    const draggedCard = newCards[dragIndex];

    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, draggedCard);

    setCards(newCards);
  }, [cards]);

  const [, drop] = useDrop({
    accept: 'CARD',
    drop(item) {
    },
  });

  const totalPages = Math.ceil(cards.length / 8);
  const pages = [];

  for (let i = 0; i < cards.length; i += 8) {
    const pageCards = cards.slice(i, i + 8);
    const pageNumber = Math.floor(i / 8) + 1;
    
    pages.push(
      <div key={pageNumber} className="album-page" ref={drop}>
        {pageCards.map((card, index) => (
          <Card key={card.cardId} card={card} index={i + index} moveCard={moveCard} />
        ))}
        <div className="page-footer">Page {pageNumber} of {totalPages}</div>
      </div>
    );
  }

  const updatedAlbum = { ...album, cards };

  return (
    <div>
      <h2 className="album-name">{album.name}</h2>
      {pages}
      <ExportKarutaCommands album={updatedAlbum} />
    </div>
  );
};

export default Album;
