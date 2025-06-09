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

  return (
    <>
      <p>There is {review.length} reviews for this movie</p>
      <ul>
        {review.map(({ id, author_details, content }) => (
          <li key={id}>
            <p>{author_details?.name || 'Anonymous'} says:</p>
            <p dangerouslySetInnerHTML={{ __html: content }} />
          </li>
        ))}
      </ul>
    </>
  );
}
