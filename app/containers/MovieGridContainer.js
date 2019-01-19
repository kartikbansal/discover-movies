import { connect } from "react-redux";
import MovieGrid from "../components/MovieGrid";
import { viewMovieDetails } from "../actions";

const mapStateToProps = (state) => {
  const { movies, currPage } = state;
  return {
    movies: movies.byPage[currPage] ? movies.byPage[currPage] : []
  };
};

const mapDispatchToProps = dispatch => ({
  onMovieSelect: (id) => {
    dispatch(viewMovieDetails(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieGrid);