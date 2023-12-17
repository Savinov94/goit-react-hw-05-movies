import Layout from 'components/Layout/Layout';
import HomePage from 'pages/HomePage/HomePage';
import MoviesPage from 'pages/MoviesPage/MoviesPage';
import { Routes, Route } from 'react-router-dom';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Rewiews from './Rewiews/Rewiews';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:movieId" element={< MovieDetails/>} >
          <Route path="cast" element={<Cast/>} />
          <Route path="reviews" element={<Rewiews/>} />
        </Route>
      </Route>
    </Routes>
  );
};
