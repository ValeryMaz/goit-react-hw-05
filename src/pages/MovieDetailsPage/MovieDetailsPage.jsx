import { useParams } from 'react-router-dom';
import { getMovieById } from '../../tmdbApi';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const BackLinkHref = useRef(location.state?.from || '/Movies');

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
      <NavLink to={BackLinkHref.current} className={clsx(css.goBackBtn)}>
        Go Back
      </NavLink>

      <div>
        <ul className={clsx(css.movieInfoList)}>
          <li className={clsx(css.movieLiElement)}>
            <div>
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                    : defaultImg
                }
                alt="movie poster"
                width={350}
              />
            </div>
            <div className={clsx(css.movieInfoContainer)}>
              <h1 className={clsx(css.titleFontMain)}>{movie.title}</h1>
              <p>
                <span className={clsx(css.titleFont)}>Movie description:</span>{' '}
                {movie.overview}
              </p>
              <p>
                <span className={clsx(css.titleFont)}>Movie Rating</span> -
                {`${(movie.vote_average * 10).toFixed(0)}%`}
              </p>
              <p>
                <span className={clsx(css.titleFont)}>Genres:</span>{' '}
                {movie.genres.map(genre => genre.name).join(', ')}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <p className={clsx(css.additional)}>Additional information</p>
      </div>
      <ul>
        <li>
          <NavLink to="Cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="Reviews">Reviews</NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
