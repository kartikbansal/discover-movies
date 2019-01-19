import React from 'react';
import PropTypes from 'prop-types';

const Genre = ({ text, active, onClick }) => (
  <li
    className="genre"
    onClick={onClick}
    style={
      active
      ? { background: '#01d077', color: '#fff' }
      : null
    }
  >
    {text}
    {active
      ? <span> &#10005;</span>
      : <span> +</span>}
  </li>
);

Genre.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Genre;