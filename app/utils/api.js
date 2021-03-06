import axios from 'axios';

const _APIKEY = '9257b064bb8d0fae0c0ce02144c71234';
const _baseURL = 'https://api.themoviedb.org/3/';

const prepRouteParams = (queryStringData) => {
  return Object.keys(queryStringData)
    .filter(key => queryStringData[key])
    .map(key => `${key}=${encodeURIComponent(queryStringData[key])}`).join('&');
}

const getQueryStringData = (filters, currPage) => {
  const genres = filters.genres.length !== 0
    ? filters.genres
        .filter(genre => genre.active)
        .map(genre => genre.id).join(',')
    : undefined;
  let order = `${filters.orderBy.toLowerCase().split(' ').join('_')}.desc`;
  order = order === 'rating.desc' ? 'vote_average.desc' : order
  return {
    'api_key': _APIKEY,
    'sort_by': order,
    'page': currPage,
    'with_genres': genres,
    'vote_average.gte': Number(filters.rating),
    'primary_release_date.lte': Date.now(),
    'with_runtime.gte': 60,
    'language': 'en-US',
    'vote_count.gte': 100
  }
};

const prepUrl = (type, queryStringData) => `${_baseURL}${type}?${prepRouteParams(queryStringData)}`;

const getAllMovies = (filters, currPage) => {
  const url = prepUrl('discover/movie', getQueryStringData(filters, currPage));
  return axios.get(url)
    .then(moviesData => moviesData.data)
}

const getMovieDetails = (movieId) => {
  const url = prepUrl(`movie/${movieId}`, {api_key: _APIKEY});
  return axios.get(url)
    .then(movieData => movieData.data);
}

const getGenres = () => {
  const url = prepUrl(`genre/movie/list`, {api_key: _APIKEY});
  return axios.get(url)
    .then(allGenres => allGenres.data.genres);
}

const searchMovie = (searchText) => {
  const url = prepUrl(`search/movie`, {api_key: _APIKEY, query: searchText});
  return axios.get(url)
    .then(movies => movies.data);
}

export default {
  getAllMovies: getAllMovies,
  getMovieDetails: getMovieDetails,
  getGenres: getGenres,
  searchMovie: searchMovie
}
