import { connect } from "react-redux";
import GenresList from "../components/GenresList";
import { toggleGenre } from "../actions";

const mapStateToProps = (state) => {
  return {
    genres: state.filters.genres
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClick: (id) => {
    dispatch(toggleGenre(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);