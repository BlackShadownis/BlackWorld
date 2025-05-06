import React from 'react';
import SearchAnime from './components/SearchAnime';  // Importar el componente

function App() {
  return (
    <div className="App">
      <h1>BlackAnimes</h1>
      <SearchAnime />  {/* Usar el componente aquí */}
    </div>
  );
}

export default App;
