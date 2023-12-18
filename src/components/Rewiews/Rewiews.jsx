import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import css from './Rewiews.module.css';
import { getMovieReviews } from 'servises/eventsApi';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews data:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews && (
        <ul className={css.reviewsList}>
          {reviews.results.map(review => (
            <li key={review.id} className={css.reviewItem}>
              <p className={css.authorName}>{review.author}</p>
              <p className={css.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
