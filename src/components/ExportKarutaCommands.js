import React, { useState } from 'react';
import styles from './ExportKarutaCommands.module.css';

const ExportKarutaCommands = ({ album }) => {
  const [commands, setCommands] = useState('');

  const generateCommands = () => {
    let commandList = `kalbumcreate ${album.name}\n`;
    commandList += `kalbumpageadd ${album.name} ${Math.ceil(album.cards.length / 8)}\n`;

    album.cards.forEach((card, index) => {
      const pageNumber = Math.floor(index / 8) + 1;
      const positionInPage = (index % 8) + 1;
      commandList += `kalbumcardadd ${album.name} ${card.cardId} ${pageNumber} ${positionInPage}\n`;
    });

    setCommands(commandList);
  };

  return (
    <div className={styles.container}>
      <button onClick={generateCommands} className={styles.exportButton}>
        Export Album to Karuta Commands
      </button>
      <textarea 
        value={commands} 
        readOnly 
        className={styles.commandOutput} 
      />
    </div>
  );
};

export default ExportKarutaCommands;
