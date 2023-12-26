import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from 'components/Search/Search';
import MovieList from 'components/MovieList/MovieList';
import { searchMovies } from 'servises/eventsApi';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchExecuted, setSearchExecuted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const queryParam = urlParams.get('query');

    if (queryParam) {
      setSearchQuery(queryParam);
      setSearchExecuted(true);
      searchMovies(queryParam)
        .then(results => setSearchResults(results))
        .catch(error => console.error('Error during search:', error));
    }
  }, [location.search]);

  const handleSearch = query => {
    setSearchQuery(query);
    setSearchExecuted(true);
    navigate(`/movies?query=${query}`);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />

      {searchExecuted && searchResults && searchResults.results && (
        <MovieList movies={searchResults.results} />
      )}
    </div>
  );
};

export default MoviesPage;
