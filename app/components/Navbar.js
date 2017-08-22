import React from 'react';
import SearchBox from './SearchBox.js';
import Filter from './Filter.js'
import api from '../utils/api.js';
import PropTypes from 'prop-types';

const NavOptions = (props) => {
  return (
    <div className="nav-options">
      <SearchBox />
      <span className="filter-btn" onClick={props.onClick}
        style={props.activeFilter ? {color: '#fff'} : null}>
        <i className="fa fa-filter"></i>
        Browse <span className="hidden-xs hidden-sm">Movies</span>
      </span>
    </div>
  );
}

NavOptions.propTypes = {
  activeFilter: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilter: false,
      movieId: false
    }
  }

  render () {
    const activeFilter = this.state.activeFilter;
    const filters = this.props.filters;
    return (
      <div>
        <div className="nav-bar">
          <h1 className="logo"><a href='./'>discover_movies</a></h1>
          <NavOptions activeFilter={activeFilter}
            onClick={() => this.setState((prev) => ({activeFilter: !prev.activeFilter}))} />
        </div>
        <Filter active={activeFilter} filters={filters} onChange={(val, type) => this.props.onChange(val, type)} />
      </div>
    );
  }
}

Navbar.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Navbar;
