import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import MoviesPage from './pages/MoviesPage';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';

const AppBar = lazy(() => import('./components/AppBar/AppBar'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AppBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/Movies" element={<MoviesPage />}></Route>
          <Route path="/Movies/:movieID" element={<MovieDetailsPage />}>
            <Route path="Cast" element={<MovieCast />}></Route>
            <Route path="Reviews" element={<MovieReviews />}></Route>
          </Route>
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
