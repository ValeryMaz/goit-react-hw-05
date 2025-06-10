import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
const HomePage = lazy(() => import('./pages/HomePage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage'),
);
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews'),
);
const Navigation = lazy(() => import('./components/Navigation/Navigation'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/Movies" element={<MoviesPage />}></Route>
          <Route path="/Movies/:movieID" element={<MovieDetailsPage />}>
            <Route path="Cast" element={<MovieCast />}></Route>
            <Route path="Reviews" element={<MovieReviews />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
