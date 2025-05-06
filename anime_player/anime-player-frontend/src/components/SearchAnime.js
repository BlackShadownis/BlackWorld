import React, { useState } from 'react';
import axios from 'axios';

function SearchAnime() {
  const [searchTerm, setSearchTerm] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/anime/search/${searchTerm}`);
      console.log('Respuesta del backend:', response.data);
      setAnimeList(response.data);
    } catch (error) {
      console.error('Error al buscar el anime:', error);
      setAnimeList([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <input
        type="text"
        placeholder="Busca tu anime favorito..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={handleSearch} style={{ padding: '5px 10px' }}>
        Buscar
      </button>

      {loading && <p>Cargando...</p>}
      {!loading && animeList.length === 0 && <p>No se encontraron resultados.</p>}

      {animeList.map((anime, index) => (
        <div key={index} style={{ marginTop: '20px' }}>
          <h2>{anime.name}</h2>
          <p>
            <a href={anime.link} target="_blank" rel="noopener noreferrer">
              Ver en AnimeFLV
            </a>
          </p>
          <h3>Episodios:</h3>
          <ul>
            {anime.episodes && anime.episodes.map((ep, idx) => (
              <li key={idx}>
                <strong>Capítulo {ep.episode_number}:</strong>{' '}
                <a href={ep.episode_link} target="_blank" rel="noopener noreferrer">
                  {ep.episode_name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SearchAnime;
