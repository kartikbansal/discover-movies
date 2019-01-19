import api from '../utils/api.js'; 
import { loadImage } from '../utils/helpers.js';

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export const RECEIVE_GENRES = 'RECEIVE_GENRES';
export const REQUEST_MOVIES_PAGE_CHANGE = 'REQUEST_MOVIES_PAGE_CHANGE';
export const RECEIVE_MOVIES_PAGE_CHANGE = 'RECEIVE_MOVIES_PAGE_CHANGE';
export const SELECT_MOVIE = 'SELECT_MOVIE';
export const REQUEST_SELECTED_MOVIE = 'REQUEST_SELECTED_MOVIE';
export const RECEIVE_SELECTED_MOVIE = 'RECEIVE_SELECTED_MOVIE';
export const RESET_SELECTED_MOVIE = 'RESET_SELECTED_MOVIE'; 
export const TOGGLE_GENRE = 'TOGGLE_GENRE';
export const CHANGE_RATING = 'CHANGE_RATING';
export const CHANGE_ORDERBY = 'CHANGE_ORDERBY';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SET_PAGE = 'SET_PAGE';
export const TOGGLE_MOVIE_POSTER = 'TOGGLE_MOVIE_POSTER'

export const viewMovieDetails = (id) => {
  return dispatch => {
    dispatch({ type: TOGGLE_MOVIE_POSTER });
    dispatch(fetchMovieDetailsIfNeeded(id));
  }
};

export const resetSelectedMovie = () => ({ type: RESET_SELECTED_MOVIE });

export const requestSelectedMovie = () => ({ type: REQUEST_SELECTED_MOVIE });

export const receiveSelectedMovie = (movie) => {
  return dispatch => {
    dispatch({ type: RECEIVE_SELECTED_MOVIE, movie });
  }
}

export const requestMovies = () => ({ type: REQUEST_MOVIES });

export const setPage = (pageNo) => ({ type: SET_PAGE, pageNo });

export const receiveMovies = (json) => ({ 
  type: RECEIVE_MOVIES,
  movies: json.results,
  currPage: json.page,
  totalResults: json.total_results,
  totalPages: json.total_pages,
  receivedAt: Date.now()
});

export const receiveGenres = (genres) => ({
  type: RECEIVE_GENRES,
  genres
});

export const requestMoviesPageChange = (pageNo) => ({ type: REQUEST_MOVIES_PAGE_CHANGE, pageNo });
export const receiveMoviesPageChange = (json) => ({ 
  type: RECEIVE_MOVIES_PAGE_CHANGE,
  movies: json.results,
  currPage: json.page,
  totalResults: json.total_results,
  totalPages: json.total_pages,
  receivedAt: Date.now()
});

export const toggleGenre = (id) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_GENRE, id });
    dispatch(setPage(1));
    dispatch(fetchMovies());
  }
};

export const changeRating = (rating) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_RATING, rating });
    dispatch(setPage(1));
    dispatch(fetchMovies());
  }
};

export const changeOrderBy = (order) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ORDERBY, order });
    dispatch(setPage(1));
    dispatch(fetchMovies());
  }
};

export const changePage = (pageNo) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, pageNo });
    dispatch(fetchMoviesIfNeeded());
  }
}

export const fetchMovies = () => {
  return (dispatch, getState) => {
    dispatch(requestMovies());
    const { filters, currPage } = getState();
    return api.getAllMovies(filters, currPage)
      .then(res => dispatch(receiveMovies(res)))
      .catch(err => console.error(err));
  }
};

export const fetchGenres = () => {
  return (dispatch) => {

    return api.getGenres()
      .then(res => dispatch(receiveGenres(res)))
      .catch(err => console.error(err));
  }
};

export const fetchMoviesPageChange = () => {
  return (dispatch, getState) => {
    const { filters, currPage } = getState();
    dispatch(requestMoviesPageChange(currPage));
    return api.getAllMovies(filters, currPage)
      .then(res => dispatch(receiveMoviesPageChange(res)))
      .catch(err => console.error(err));
  }
};

export const shouldFetchMovies = state => {
  return !state.movies.byPage[state.currPage] || !state.movies.byPage[state.currPage].length 
    ? true 
    : false;
}

export const fetchMoviesIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchMovies(getState())) {
      dispatch(fetchMoviesPageChange());
    }
  };
};

export const fetchMovieDetails = (movieId) => {
  return (dispatch, getState) => {
    dispatch(requestSelectedMovie());
    return api.getMovieDetails(movieId)
      .then(res => {
        dispatch(receiveSelectedMovie(res));
      })
      .catch(err => console.error(err));
  }
}

export const shouldFetchMovieDetails = (state, movieId) => {
  return !state.moviesSelectionInfo.selectedMovies[movieId] ? true : false; 
};

export const fetchMovieDetailsIfNeeded = (movieId) => {
  return (dispatch, getState) => {
    if (shouldFetchMovieDetails(getState(), movieId)) {
      dispatch(fetchMovieDetails(movieId));
    } else {
      dispatch({ type: SELECT_MOVIE, id: movieId });
    }
  };
};

export const closeMoviePoster = () => {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_MOVIE_POSTER' });
    dispatch(resetSelectedMovie());
  }
}