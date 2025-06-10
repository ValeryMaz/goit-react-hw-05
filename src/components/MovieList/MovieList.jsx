import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import clsx from 'clsx';
// import { useEffect } from 'react';

export default function MovieList({ trends }) {
  const location = useLocation();

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <ul className={clsx(css.movieList)}>
      {trends.map(trend => (
        <li key={trend.id} className={clsx(css.movieLi)}>
          <NavLink to={`/Movies/${trend.id}`} state={{ from: location }}>
            <p>{trend.title}</p>

            <img
              src={
                trend.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500/${trend.backdrop_path}`
                  : defaultImg
              }
              alt="movie poster"
              width={250}
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
