import { useState } from 'react';
import axios from 'axios';
import './SearchAnime.css';

function SearchAnime() {
  // Lógica del componente
  const [searchTerm, setSearchTerm] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/anime/search/${searchTerm}`);
      setAnimeList(response.data);
    } catch (error) {
      console.error('Error:', error);
      setAnimeList([]);
    }
    setLoading(false);
  };

  // Estructura JSX (HTML-like)
  return (
    <div className="search-anime-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar anime..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          🔍 Buscar
        </button>
      </div>

      {loading && <div className="loader">Cargando...</div>}

      <div className="anime-results">
        {animeList.map((anime) => (
          <div key={anime.name} className="anime-card">
            <img 
              src={anime.image || 'https://via.placeholder.com/300x450'} 
              alt={anime.name}
              className="anime-image"
            />
            <div className="anime-info">
              <h2>{anime.name}</h2>
              <a href={anime.link} target="_blank" rel="noreferrer" className="watch-link">
                Ver en AnimeFLV
              </a>
              <div className="episodes-container">
                <h3>Episodios:</h3>
                <ul className="episodes-list">
                  {anime.episodes?.map((ep) => (
                    <li key={ep.episode_number} className="episode-item">
                      <a href={ep.episode_link} target="_blank" rel="noreferrer" className="episode-link">
                        Episodio {ep.episode_number}: {ep.episode_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && animeList.length === 0 && (
        <p className="no-results">No se encontraron resultados</p>
      )}
    </div>
  );
}

export default SearchAnime;