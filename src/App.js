import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import AlbumCreator from './components/AlbumCreator';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Karuta Visual Album Generator</h1>
        <AlbumCreator />
      </div>
    </DndProvider>
  );
}

export default App;
