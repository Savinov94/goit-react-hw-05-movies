import { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../servises/eventsApi';
import Cast from 'components/Cast/Cast';
import Rewiews from 'components/Rewiews/Rewiews';

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
    <div>
      {details && (
        <div>
          <img src={`https://image.tmdb.org/t/p/original${details.backdrop_path} `} alt={details.id} width="500" />
          <h2>{details.title}</h2>
          <p>Огляд: {details.overview}</p>
          <p>Рейтинг: {details.vote_average}</p>
        </div>
      )}

      <NavLink>
        <Cast to="cast">Cast</Cast>
      </NavLink>
      <NavLink>
        <Rewiews to="reviews" />
      </NavLink>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
