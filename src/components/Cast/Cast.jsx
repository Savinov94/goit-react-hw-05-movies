import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import css from './Cast.module.css';
import { getMovieCredits } from 'servises/eventsApi';

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
    <div>
      <h2>Cast</h2>
      {credits && (
        <ul className={css.castList}>
          {credits.cast.map(actor => (
            <li key={actor.id} className={css.castItem}>
              <img
                src={`https://image.tmdb.org/t/p/original${actor.profile_path} `}
                alt={actor.id}
                width="100"
                className={css.actorImage}
              />
              <div>
                <span className={css.actorName}>{actor.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cast;
