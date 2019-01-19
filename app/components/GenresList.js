import React from 'react';
import PropTypes from 'prop-types';
import Genre from './Genre';

const GenresList = ({ genres, onClick }) => (
  <ul className="genres-list">
    {genres.map(genre => 
        <Genre 
          key={genre.id}
          className="genre"
          text={genre.name}
          active={genre.active}
          onClick={() => onClick(genre.id)}
        />
      ) 
    }   
  </ul>
);

GenresList.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired
};

export default GenresList;