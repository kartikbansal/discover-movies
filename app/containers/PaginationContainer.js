import { connect } from "react-redux";
import Pagination from "../components/Pagination";
import { changePage, requestMovies, setPage } from "../actions";

const mapStateToProps = ({ currPage, totalPages }) => ({
  currPage,
  totalPages
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (pageNo) => {
    dispatch(changePage(pageNo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);