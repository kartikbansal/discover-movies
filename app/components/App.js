import React from 'react';
import Navbar from './Navbar.js';;
import MovieGrid from './MovieGrid.js';
import Footer from './Footer.js'


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      activeGenres: [],
      rating: 0,
      order: 'Popularity'
    }
  }

  handleChange(val, type) {
    type === "activeGenres"
    ? this.handleActiveGenreChange(val)
    : type === "rating"
      ? this.setState(() => ({rating: val}))
      : this.setState(() => ({order: val}))
  }

  handleActiveGenreChange(val) {
    const idx = this.state.activeGenres.indexOf(val.id);
    const activeGenres = this.state.activeGenres.slice();
    idx === -1
    ? activeGenres.push(val.id)
    : activeGenres.splice(idx, 1);
    this.setState(() => ({activeGenres: activeGenres}));
  }

  render() {
    const filters = {
      activeGenres: this.state.activeGenres,
      rating: this.state.rating,
      order: this.state.order
    }
    return (
      <div className="root">
        <Navbar onChange={(val, type) => this.handleChange(val, type)} filters={filters} />
        <MovieGrid filters={filters} />
        <Footer />
      </div>
    )
  }
}


export default App;
