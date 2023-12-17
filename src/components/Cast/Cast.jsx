import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../servises/eventsApi';

const Cast = () => {
  const { movieId } = useParams();
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const creditsData = await getMovieCredits(movieId);
        setCredits(creditsData);
      } catch (error) {
        console.error('Error fetching credits data:', error);
      }
    };

    fetchCredits();
  }, [movieId]);

  return (
    <>
      {credits && (
        <ul>
          {credits.cast.map((actor) => (
            <li key={actor.id}>{actor.name}<img src={`https://image.tmdb.org/t/p/original${actor.profile_path} `} alt={actor.id} width="100" ></img></li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;