import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './MovieList.module.css';
import placeholderImage from '../img/kino.jpg';

const MovieList = ({ movies }) => (
  <ul className={css.resultsList}>
    {movies.map(movie => (
      <li key={movie.id} className={css.resultsItem}>
        <NavLink to={`/movies/${movie.id}`} className={css.navSearch}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.id}
            onError={e => {
              e.target.src = placeholderImage;
            }}
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
);

export default MovieList;
