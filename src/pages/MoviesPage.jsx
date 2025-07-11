import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList/MovieList';
import { searchMovie } from '../tmdbApi';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [movie, setMovie] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      try {
        const newMovies = await searchMovie(query);
        setMovie(newMovies);
      } catch (error) {
        console.error('oops', error);
      }
    }
    fetchMovies();
  }, [query]);

  const handleSearch = evt => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.movie.value;
    if (topic.trim() === '') {
      toast.error('Error');
      return;
    }
    setSearchParams({ query: topic });
    form.reset();
  };
  return (
    <>
      <header>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            name="movie"
            placeholder="Search movies"
          />
          <button type="submit">Search</button>
        </form>
      </header>
      {movie.length > 0 && <MovieList trends={movie} />}
      <Toaster />
    </>
  );
}
