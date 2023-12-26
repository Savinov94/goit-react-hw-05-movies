import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate, NavLink } from 'react-router-dom';
import placeholderImage from '../img/kino.jpg';
import css from './MovieDetails.module.css';
import { getMovieDetails } from 'servises/eventsApi';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailsData = await getMovieDetails(movieId);
        setDetails(detailsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1, {
      state: {
        searchQuery: new URLSearchParams(window.location.search).get('query'),
      },
    });
  };

  return (
    <div className={css.container}>
      <button onClick={handleGoBack} className={css.goBackLink}>
        Go Back
      </button>
      {details && (
        <div className={css.movieDetails}>
          <img
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={details.id}
            onError={e => {
              e.target.src = placeholderImage;
            }}
            className={css.movieImage}
          />
          <h2 className={css.movieTitle}>{details.title}</h2>
          <p className={css.overview}>{details.overview}</p>
          <p className={css.rating}>⭐ {details.vote_average}</p>

          {details.genres && (
            <div className={css.genres}>
              <h3 className={css.genresTitle}>Genres:</h3>
              <span>{details.genres.map(genre => genre.name).join(', ')}</span>
            </div>
          )}
        </div>
      )}

      <NavLink to="cast" className={css.castLink}>
        Cast
      </NavLink>
      <NavLink to="reviews" className={css.reviewsLink}>
        Reviews
      </NavLink>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
