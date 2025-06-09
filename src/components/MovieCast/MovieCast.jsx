import { useState, useEffect } from 'react';
import { getMovieCredits } from '../../tmdbApi';
import { useParams } from 'react-router-dom';

export default function MovieCast() {
  const [credit, setCredits] = useState([]);
  const [error, setError] = useState(false);
  const { movieID } = useParams();
  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieCredits(movieID);
        setCredits(data);
        console.log(data);
      } catch {
        setError(true);
        console.error('error');
      }
    }
    fetchMovie();
  }, [movieID]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {credit.map(cast => (
        <li key={cast.id}>
          <p>{cast.name}</p>
          <p>as {cast.character}</p>
        </li>
      ))}
    </>
  );
}
