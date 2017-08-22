import React, {Component} from 'react';
import MoviePoster from './MoviePoster.js'
import api from '../utils/api.js';
import MovieThumbnail from './MovieThumbnail.js';
import Pagination from './Pagination.js';
import Loading from './Loading.js';
import PropTypes from 'prop-types';

class MovieGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      currPage: 1,
      totalPages: 0,
      totalMovies: 0,
      movieId: null,
      loading: true
    }
  }

  componentDidMount() {
    this.updateMovies(this.props.filters, 1)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      currPage: 1,
      totalPages: 0,
      totalMovies: 0,
      loading: true
    }));
    this.updateMovies(nextProps.filters, 1)
  }

  updateMovies(filters, page) {
    filters.page = page;
    this.setState(() => ({movies: [], loading: true}));
    api.getAllMovies(filters)
      .then(moviesData => {
        this.setState(() => {
          return {
            movies: moviesData.results,
            totalPages: moviesData.total_pages,
            currPage: moviesData.page,
            totalMovies: moviesData.total_results,
            loading: false
          };
        });
      });
  }

  handleClick(id) {
    window.document.body.style.overflow = 'hidden';
    this.setState(() => {
      return {
        movieId: id
      }
    })
  }

  handleClose() {
    window.document.body.style.overflow = 'auto';
    this.setState(() => ({movieId: null}));
  }

  handlePaginationClick(currPage, type) {
    currPage = type === 'left' ? currPage - 1 : currPage + 1;
    this.updateMovies(this.props.filters, currPage)
  }


  render() {
    const movies = this.state.movies;
    const movieId = this.state.movieId;
    const currPage = this.state.currPage;
    const totalPages = this.state.totalPages;
    const totalMovies = this.state.totalMovies;
    const loading = this.state.loading;

    return (
      <div className="container">
        <div className="row">
          {totalMovies >= 1
           ? <h1 className="results">{totalMovies}&nbsp; Movie{totalMovies === 1 ? null : 's'}&nbsp; Found</h1>
           : !loading && <h1 className="results">No Movies Found</h1>}
          {totalPages > 1 &&
            <Pagination
            currPage={currPage}
            totalPages={totalPages}
            onClick={(currPage, type) => this.handlePaginationClick(currPage, type)}/>}

          <div className="col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8 col-xs-12">
            <div className="row movie-thumbnail-container">
              {loading
               ? <Loading color={'#333'}/>
               : movies.map((movie) => {
                   return (
                     <MovieThumbnail movie={movie} key={movie.id} onClick={() => this.handleClick(movie.id)} />
                   );
                 })
              }
            </div>
          </div>
        </div>
        {movieId && <MoviePoster movieId={movieId} onClose={() => this.handleClose()} />}
      </div>
    );
  }
}

MovieGrid.propTypes = {
  filters: PropTypes.object.isRequired
}

export default MovieGrid;
