import React, { Component } from 'react';
import Filter from './Filter.js'
import NavOptions from './NavOptions';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showFilter: false
    };
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter() {
    this.setState(prevState => {
      return {
        showFilter: !prevState.showFilter 
      };
    });
  }

  render () {
    const { showFilter } = this.state;

    return (
      <div>
        <div className="nav-bar">
          <h1 className="logo"><a href='./'>discover_movies</a></h1>
          <NavOptions 
            showFilter={showFilter}
            onClick={this.toggleFilter} 
          />
        </div>
        <Filter showFilter={showFilter} />
      </div>
    );
  }
}

export default Navbar;
