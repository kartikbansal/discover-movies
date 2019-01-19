import React from 'react';
import SearchBox from '../containers/SearchBox.js';
import PropTypes from 'prop-types';

const NavOptions = (props) => {
  const { onClick, showFilter } = props;

  return (
    <div className="nav-options">
      <SearchBox />
      <span 
        className="filter-btn" 
        onClick={onClick}
        style={showFilter ? { color: '#fff' } : null}>
        <i className="fa fa-filter"></i>
        Browse <span className="hidden-xs hidden-sm">Movies</span>
      </span>
    </div>
  );
};

NavOptions.propTypes = {
  showFilter: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NavOptions;
