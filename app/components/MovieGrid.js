import React from 'react';
import MovieThumbnail from './MovieThumbnail.js';
import PropTypes from 'prop-types';

const MovieGrid = ({ movies, onMovieSelect }) => (
  <div className="col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8 col-xs-12">
    <div className="row movie-thumbnail-container">
      {movies.map((movie) => {
          return (
            <MovieThumbnail 
              key={movie.id}
              movie={movie}
              onClick={() => onMovieSelect(movie.id)}
            />
          );
        })
      }
    </div>
  </div>
);

MovieGrid.propTypes = {
  movies: PropTypes.array.isRequired,
  onMovieSelect: PropTypes.func.isRequired
}

export default MovieGrid;
