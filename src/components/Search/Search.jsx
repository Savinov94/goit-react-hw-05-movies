import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './Search.module.css';
import { searchMovies } from 'servises/eventsApi';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchExecuted, setSearchExecuted] = useState(false);

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
      setSearchExecuted(true);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className={css.searchContainer}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter movie title"
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>

      {searchExecuted &&
      searchResults &&
      searchResults.results &&
      searchResults.results.length > 0 ? (
        <div>
          <ul className={css.resultsList}>
            {searchResults.results.map(movie => (
              <li key={movie.id} className={css.resultsItem}>
                <NavLink to={`/movies/${movie.id}`} className={css.navSearch}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path} `}
                    alt={movie.id}
                    className={css.movieImage}
                  />
                  <div>
                    <h2 className={css.movieTitle}>{movie.title}</h2>
                    <p className={css.rating}>⭐ {movie.vote_average}</p>
                    <p className={css.overview}>{movie.overview}</p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        searchExecuted && <p className={css.noResults}>No results found</p>
      )}
    </div>
  );
};

export default Search;
