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

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      {credit.map(cast => (
        <li key={cast.id}>
          <img
            src={
              cast.profile_path
                ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                : defaultImg
            }
            alt="photo of the cast member"
            width={250}
          />
          <p>{cast.name}</p>
          <p>as {cast.character}</p>
        </li>
      ))}
    </>
  );
}
