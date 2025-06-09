import MovieList from '../components/MovieList/MovieList';
import { useState, useEffect } from 'react';
import { TrendingMovies } from '../tmdbApi';

export default function HomePage() {
  const [error, setError] = useState(false);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    async function getMovies() {
      try {
        setError(false);
        setTrends([]);
        const data = await TrendingMovies();
        console.log('DATA FROM API:', data);
        setTrends(data.data.results);
      } catch {
        setError(true);
      }
    }

    getMovies();
  }, []);
  return (
    <>
      {error && <p> something wen wrong</p>}
      <MovieList trends={trends} />
    </>
  );
}
