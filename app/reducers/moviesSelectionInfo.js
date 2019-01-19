import { combineReducers } from "redux";
import { SELECT_MOVIE, RECEIVE_SELECTED_MOVIE, REQUEST_SELECTED_MOVIE, RESET_SELECTED_MOVIE } from "../actions";

const selectedMovieId = (state = null, action) => {
  switch(action.type) {
    case SELECT_MOVIE:
      return action.id;
    case RECEIVE_SELECTED_MOVIE:
      return action.movie.id;
    case RESET_SELECTED_MOVIE:
      return null;
    default:
      return state;
  }
}

const selectedMovies = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_SELECTED_MOVIE:
      return Object.assign({}, state, { [action.movie.id]: action.movie });
    default: 
      return state;
  }
}

const isFetchingSelectedMovie = (state = false, action) => {
  switch(action.type) {
    case REQUEST_SELECTED_MOVIE:
      return true;
    case RECEIVE_SELECTED_MOVIE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  selectedMovieId,
  selectedMovies,
  isFetchingSelectedMovie
});