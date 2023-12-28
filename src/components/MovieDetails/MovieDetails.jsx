import React, { useEffect, useRef, useState } from 'react';
import {
  Outlet,
  useParams,
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom';
import placeholderImage from '../img/kino.jpg';
import css from './MovieDetails.module.css';
import { getMovieDetails } from 'servises/eventsApi';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const location = useLocation();
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

  const backLinkHref = useRef(location.state?.from ?? '/movies');
  return (
    <div className={css.container}>
      <Link to={backLinkHref.current}>
        <button type="button" className={css.goBackLink}>
          Go back
        </button>
      </Link>
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

          {details.genres && details.genres.length > 0 && (
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
