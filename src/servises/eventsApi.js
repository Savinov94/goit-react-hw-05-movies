import axios from 'axios';
const apiKey = '8804d97b993ccd8c28db0d5ec73231b0';

export async function getTrendingMovies() {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day',
      {
        params: { language: 'en-US', api_key: apiKey },
      }
    );

    if (Array.isArray(response.data.results)) {
      const movies = response.data.results;
      return movies;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function searchMovies(query) {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          include_adult: 'false',
          language: 'en-US',
          page: '1',
          query: query,
          api_key: apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: { language: 'en-US', api_key: apiKey },
      }
    );
    if (process.env.NODE_ENV === 'development') {
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieCredits(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      {
        params: { language: 'en-US', api_key: apiKey },
      }
    );
    if (process.env.NODE_ENV === 'development') {
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieReviews(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
      {
        params: { language: 'en-US', page: '1', api_key: apiKey },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
