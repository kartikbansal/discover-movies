import { CHANGE_PAGE, REQUEST_MOVIES, RECEIVE_MOVIES, RECEIVE_MOVIES_PAGE_CHANGE, REQUEST_MOVIES_PAGE_CHANGE, SET_PAGE } from "../actions";
import { combineReducers } from "redux";
import movies from "./movies";
import filters from "./filters";
import moviesSelectionInfo from "./moviesSelectionInfo";

const currPage = (state = 1, action) => {
  switch(action.type) {
    case CHANGE_PAGE:
      return action.pageNo;
    case RECEIVE_MOVIES:
      return action.currPage;
    case SET_PAGE:
      return action.pageNo;
    default:
      return state;
  }
}

const totalPages = (state = 0, action) => {
  switch(action.type) {
    case RECEIVE_MOVIES:
      return action.totalPages;
    case RECEIVE_MOVIES_PAGE_CHANGE:
      return action.totalPages;
    default:
      return state;
  }
}

const totalResults = (state = 0, action) => {
  switch(action.type) {
    case RECEIVE_MOVIES:
      return action.totalResults;
    case RECEIVE_MOVIES_PAGE_CHANGE:
      return action.totalResults;
    default:
      return state;
  }
}

const isFetchingMovies = (state = true, action) => {
  switch(action.type) {
    case REQUEST_MOVIES:
      return true;
    case RECEIVE_MOVIES:
      return false;
    default:
      return state;
  }
}

const byPage = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_MOVIES:
      return Object.assign({}, state, { [action.currPage]: false });
    case CHANGE_PAGE:
      return !state.hasOwnProperty(action.pageNo) 
        ? Object.assign({}, state, { [action.pageNo]: true })
        : Object.assign({}, state, { [action.pageNo]: false });
    case RECEIVE_MOVIES_PAGE_CHANGE:
      return Object.assign({}, state, { [action.currPage]: false });
    default:
      return state;
  }
}

const isFetchingMoviesPageChange = (state = {}, action) => {
  return {
    byPage: byPage(state.byPage, action)
  } 
}

const isMoviePosterVisible = (state = false, action) => {
  switch(action.type) {
    case 'TOGGLE_MOVIE_POSTER':
      return !state;
    default:
      return state;
  } 
}

const rootReducer = combineReducers({
  currPage,
  filters,
  movies,
  totalPages,
  totalResults,
  isFetchingMovies,
  isFetchingMoviesPageChange,
  moviesSelectionInfo,
  isMoviePosterVisible
});

export default rootReducer;

