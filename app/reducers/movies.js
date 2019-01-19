import { RECEIVE_MOVIES, RECEIVE_MOVIES_PAGE_CHANGE, CHANGE_PAGE } from "../actions";

const byId = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_MOVIES:
    case RECEIVE_MOVIES_PAGE_CHANGE:
      const { movies } = action;
      return movies
        .reduce((currObj, movie) => Object.assign({}, currObj, { [movie.id]: movie }), {});
    default:
      return state;
  }
}

const byPage = (state = {}, action) => {
  const { currPage, movies } = action;
  switch(action.type) {
    case RECEIVE_MOVIES:
      return { [currPage]: movies };
    case RECEIVE_MOVIES_PAGE_CHANGE:
      return Object.assign({}, state, { [currPage]: movies });
    default:
      return state;
  }
}

export default (state = {}, action) => {
  return {
    byId: byId(state.byId, action),
    byPage: byPage(state.byPage, action)
  }
}