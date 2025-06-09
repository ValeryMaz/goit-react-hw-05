import axios from 'axios';

// axios.defaults.baseURL = '';

//query, page = 1
const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  // params: {
  //   query,
  //   page,
  //   perPage: 12,
  // },
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTFmOTcyZjU3ZGI5ZjEwZDg5OWU4M2U1MjFiNjI1YSIsIm5iZiI6MTc0ODQ5MDQwNy43NDU5OTk4LCJzdWIiOiI2ODM3ZDhhNzIxYTQ4NWZiNmIwMzg2ZmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Xmuzeb7mZEAn68D52LLh-BqqSKE038b4knN71KRIiUk',
  },
});
//   console.log(response);
//   return response.data.results;

export const TrendingMovies = async () => {
  const response = await tmdb.get('/trending/movie/day');
  return response;
};

// export const getMovies = () => {
//   return data.results.;
// };

export const getMovieById = async movieID => {
  const response = await tmdb.get(`/movie/${movieID}`);
  return response.data;
};

export const getMovieCredits = async movieID => {
  const response = await tmdb.get(`/movie/${movieID}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async movieID => {
  const response = await tmdb.get(`/movie/${movieID}/reviews`);
  return response.data.results;
};
