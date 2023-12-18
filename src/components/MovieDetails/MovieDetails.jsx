import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';

import css from './MovieDetails.module.css';
import { getMovieDetails } from 'servises/eventsApi';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);

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

  return (
    <div className={css.container}>
      <Link to="/movies" className={css.goBackLink}>
        Go Back
      </Link>
      {details && (
        <div className={css.movieDetails}>
          <img
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path} `}
            alt={details.id}
            className={css.movieImage}
          />
          <h2 className={css.movieTitle}>{details.title}</h2>
          <p className={css.overview}>{details.overview}</p>
          <p className={css.rating}>⭐ {details.vote_average}</p>
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
