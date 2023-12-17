import { getTrendingMovies } from '../../servises/eventsApi';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getTrendingMovies()
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div>HomePage</div>
      <ul>
        {events &&
          events.map((event) => (
            <li key={event.id}>
              <NavLink to={`/movies/${event.id}`}>{event.title}</NavLink>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;