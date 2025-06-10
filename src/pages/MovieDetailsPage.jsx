import { useParams } from 'react-router-dom';
import { getMovieById } from '../tmdbApi';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const BackLinkHref = useRef(location.state);

  const { movieID } = useParams();
  //   const movie = getMovietById(id);

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
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
  return (
    <>
      <Link to={BackLinkHref.current ?? '/Movies'}>Go Back</Link>

      <div>
        <li>
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                : defaultImg
            }
            alt="movie poster"
            width={250}
          />
          {movie.title}
          <p>Movie description: {movie.overview}</p>
          <p>Movie Rating {`${(movie.vote_average * 10).toFixed(0)}%`}</p>
          <p>Genres: {movie.genres.map(genre => genre.name).join(',')}</p>
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
