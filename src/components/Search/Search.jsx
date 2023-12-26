import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import css from './Search.module.css';
import { searchMovies } from 'servises/eventsApi';
import MovieList from '../MovieList/MovieList';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchExecuted, setSearchExecuted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
      setSearchExecuted(true);

      navigate(`/movies?query=${searchQuery}`);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const queryParam = urlParams.get('query');
    const movieId = urlParams.get('id');

    if (queryParam && movieId) {
      console.log('Search query:', queryParam);
      console.log('Selected movie ID:', movieId);
    }
  }, [location.search]);

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
          <MovieList movies={searchResults.results} />
        </div>
      ) : (
        searchExecuted && (
          <p className={css.noResults}>Результати не знайдені</p>
        )
      )}
    </div>
  );
};

export default Search;
