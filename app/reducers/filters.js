import { combineReducers } from "redux";
import { TOGGLE_GENRE, CHANGE_ORDERBY, CHANGE_RATING, RECEIVE_GENRES } from "../actions";

const genres = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_GENRES:
      return action.genres.map(genre => Object.assign({}, genre, { active: false }));
    case TOGGLE_GENRE:
      const { id } = action;
      return state.map(genre => {
        if (genre.id === id) {
          return Object.assign({}, genre, { active: !genre.active });
        }
        return genre;
      });
    default:
      return state;
  }
}

const orderBy = (state = 'Popularity', action) => {
  switch(action.type) {
    case CHANGE_ORDERBY:
      return action.order;
    default:
      return state;
  }
}

const rating = (state = 0, action) => {
  switch(action.type) {
    case CHANGE_RATING:
      return action.rating;
    default:
      return state;
  }
}

export default combineReducers({
  genres,
  orderBy,
  rating
});