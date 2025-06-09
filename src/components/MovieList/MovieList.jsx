import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { useEffect } from 'react';

export default function MovieList({ trends }) {
  const location = useLocation();
  return (
    <ul>
      {trends.map(trend => (
        <li key={trend.id}>
          <Link to={`/Movies/${trend.id}`} state={{ from: location }}>
            <p>{trend.title}</p>
          </Link>

          <img
            src={`https://image.tmdb.org/t/p/w500/${trend.backdrop_path}`}
            alt="movie poster"
          />
        </li>
      ))}
    </ul>
  );
}
