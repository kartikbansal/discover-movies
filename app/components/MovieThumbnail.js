import React from 'react';
import { getFormattedDate } from '../utils/helpers.js';
import ImageBox from "./ImageBox";
import PropTypes from 'prop-types';

const MovieThumbnail = ({ movie, onClick }) => (
  <div className="movie-thumbnail" onClick={onClick} style={{cursor: 'pointer'}}>
    <ImageBox
      styleClass='img-responsive' 
      imgPath={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
    />
    <p className="thumbnail-title">
      {movie.original_title}
    </p>
    <p>{getFormattedDate(movie.release_date).year}</p>
  </div>
);

MovieThumbnail.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MovieThumbnail;
