import _ from 'lodash';
import React from 'react';
import api from '../utils/api.js';
import PropTypes from 'prop-types';
import {getFormattedDate} from '../utils/helpers.js';
import MoviePoster from './MoviePoster.js';
import SearchBar from './SearchBar.js';

class SearchResult extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  render() {
    return (
      <div className="search-result-container" onMouseEnter={this.props.handleResultFocus} onMouseLeave={this.props.handleResultFocus}>
        <ul>
          {this.props.results.map((movie) => {
            return (
              <li key={movie.id} onClick={() => this.props.onSelect(movie.id)}>
                <img src={`https://image.tmdb.org/t/p/w45/${movie.poster_path}`} />
                {movie.original_title} ({getFormattedDate(movie.release_date).year})
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

SearchResult.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object.isRequired),
  onSelect: PropTypes.func.isRequired,
  handleResultFocus: PropTypes.func.isRequired
}

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      movieId: null,
      searchText: '',
      activeSearchResults: false,
      resultFocus: false
    };
  }

  handleChange(val) {
    this.setState(() => ({searchText: val}));
    val.length > 1 && this.searchMovie(val);
  }

  searchMovie(val) {
    console.log(val);
    val.length > 1 &&
    api.searchMovie(val)
      .then(data => {
        this.setState(() => {
          return {results: data.results.filter((movie) => movie.vote_count > 50).slice(0,5), activeSearchResults: true};
        });
      });
  }

  handleSelect(id) {
    window.document.body.style.overflow = 'hidden';
    this.setState(() => ({movieId: id, activeSearchResults: false,
    resultFocus: false}));
  }

  handleClose() {
    window.document.body.style.overflow = 'auto';
    this.setState(() => ({movieId: null, activeSearchResults: false, searchText: ''}));
  }

  handleResultFocus() {
    this.setState((prev) => ({resultFocus: !prev.resultFocus}));
  }

  blurFunc() {
    this.state.resultFocus === true
    ? null
    : this.setState(() => ({activeSearchResults: false, results:[]}))
  }

  componentDidMount() {
    window.document.addEventListener('keydown', (e) => {
      e.keyCode === 9 && this.state.activeSearchResults && this.setState(() => ({activeSearchResults: false, resultFocus: false}));
    });
  }

  render () {
    const searchText = this.state.searchText;
    const results = this.state.results;
    const movieId = this.state.movieId;
    const activeSearchResults = this.state.activeSearchResults;
    const movieSearch = _.debounce((text) => {this.searchMovie(text)}, 300)

    return (
      <div className="search-box-container">
        <SearchBar onSearchTextChange={movieSearch}
          onFocus={() => this.setState(() => ({activeSearchResults: true}))}
          onBlur={() => this.blurFunc()}/>
        {activeSearchResults && <SearchResult results={results} onSelect={(id) => this.handleSelect(id)} handleResultFocus={() => this.handleResultFocus()}/>}
        {movieId && <MoviePoster movieId={movieId} onClose={() => this.handleClose()} />}
      </div>
    )
  }
}

export default SearchBox;
