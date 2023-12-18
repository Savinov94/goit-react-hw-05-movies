import { getTrendingMovies } from '../../servises/eventsApi';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getTrendingMovies()
      .then(data => {
        setEvents(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <ul className={css.movieList}>
        {events &&
          events.map(event => (
            <li key={event.id} className={css.movieItem}>
              <NavLink to={`/movies/${event.id}`} className={css.movieLink}>
                <img
                  src={`https://image.tmdb.org/t/p/original${event.backdrop_path} `}
                  alt={event.id}
                  width="200"
                  className={css.movieImage}
                />
                <div className={css.movieDescription}>
                  <p className={css.title}>{event.title}</p>
                  <p>⭐ {event.vote_average}</p>
                  <p>{event.overview}</p>
                </div>
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
