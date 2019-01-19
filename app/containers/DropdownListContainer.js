import { viewMovieDetails } from "../actions";
import { connect } from "react-redux";
import DropdownList from "../components/DropdownList";

const mapDispatchToProps = dispatch => ({
  onItemSelect: (id) => {
    dispatch(viewMovieDetails(id));
  }
});

export default connect(undefined, mapDispatchToProps)(DropdownList);