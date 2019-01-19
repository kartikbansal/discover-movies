import React, { Component } from 'react';
import { connect } from "react-redux";
import MovieGridWrapper from "../components/MovieGridWrapper";
import { fetchMovies } from "../actions";
import Loading from '../components/Loading';

class MovieGridWrapperContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovies());
  }

  render() {
    const { isFetchingMovies } = this.props;
    return isFetchingMovies 
      ? <Loading />
      : <MovieGridWrapper {...this.props} />
  }
}

const mapStateToProps = ({ 
  totalResults, 
  isFetchingMovies, 
  selectedMovieId, 
  isFetchingMoviesPageChange,
  currPage
}) => ({
  totalResults, 
  isFetchingMovies, 
  selectedMovieId,
  isFetchingMoviesPageChange,
  currPage
});

export default connect(mapStateToProps)(MovieGridWrapperContainer);