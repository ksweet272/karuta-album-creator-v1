import React, { useState } from 'react';
import Album from './Album';
import { parseCardInput } from '../utils/parser';
import styles from './AlbumCreator.module.css'; 

const AlbumCreator = () => {
    const [albumName, setAlbumName] = useState('');
    const [cardInput, setCardInput] = useState('');
    const [album, setAlbum] = useState(null);

    const handleGenerateAlbum = () => {
        const cards = parseCardInput(cardInput);
        setAlbum({ name: albumName, cards });
    };

    return (
        <div className={styles.container}>
            {/* Enter Album Name Input */}
            <input
                type="text"
                className={styles.albumNameInput}
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                placeholder="Enter album name..."
            />

            {/* Card Input Area */}
            <textarea
                className={styles.cardInput}
                rows="10"
                cols="50"
                value={cardInput}
                onChange={(e) => setCardInput(e.target.value)}
                placeholder="Enter up to 40 cards..."
            />

            {/* Generate Album Preview Button */}
            <button
                className={styles.generateButton}
                onClick={handleGenerateAlbum}
            >
                Generate Album Preview
            </button>

            {/* Render the Album if available */}
            {album && <Album album={album} />}
        </div>
    );
};

export default AlbumCreator;
