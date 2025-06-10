import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../tmdbApi';

export default function MovieReviews() {
  const [review, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const { movieID } = useParams();
  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieReviews(movieID);
        setReviews(data);
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
      <p>There is {review.length} reviews for this movie</p>
      <ul>
        {review.map(({ id, author_details, content }) => (
          <li key={id}>
            <img
              src={
                author_details.avatar_path
                  ? `https://image.tmdb.org/t/p/w500/${author_details.avatar_path}`
                  : defaultImg
              }
              alt="avatar"
              width={50}
            />
            <p>{author_details?.name || 'Anonymous'} says:</p>
            <p dangerouslySetInnerHTML={{ __html: content }} />
          </li>
        ))}
      </ul>
    </>
  );
}
