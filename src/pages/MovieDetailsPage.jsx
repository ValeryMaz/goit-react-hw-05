import { useParams } from 'react-router-dom';
import { getMovieById } from '../tmdbApi';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const { movieID } = useParams();
  //   const movie = getMovietById(id);

  const location = useLocation();
  const BackLinkHref = location.state?.from || '/Movies';

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieById(movieID);
        setMovie(data);
        console.log(data);
      } catch {
        setError(true);
        console.error('error');
      }
    }
    fetchMovie();
  }, [movieID]);

  if (!movie && !error) {
    return <div>Loadind...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Link to={BackLinkHref}>Go Back</Link>

      <div>
        <li>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt="movie poster"
          />
          {movie.title}
          {movie.overview}
          {movie.vote_average}
          {movie.genres.map(genre => genre.name).join(',')}
        </li>
      </div>
      <div>
        <p>Additional information</p>
      </div>
      <ul>
        <li>
          <Link to="Cast">Cast</Link>
        </li>
        <li>
          <Link to="Reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
