import React from 'react';
import { connect } from 'react-redux';
import MoviePoster from '../components/MoviePoster';
import { closeMoviePoster } from '../actions';

const MoviePosterContainer = props => {
  return (
    props.isMoviePosterVisible ? <MoviePoster {...props} /> : null
  );
};

const mapStateToProps = ({ 
  moviesSelectionInfo: { 
    selectedMovieId, 
    selectedMovies, 
    isFetchingSelectedMovie 
  },
  isMoviePosterVisible
}) => ({
  selectedMovie: selectedMovies[selectedMovieId],
  isFetchingSelectedMovie,
  isMoviePosterVisible
});

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(closeMoviePoster());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePosterContainer);

