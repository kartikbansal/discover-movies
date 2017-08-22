import React from 'react';
import api from '../utils/api.js';
import Loading from './Loading.js';
import MoviePosterData from './MoviePosterData.js';
import PropTypes from 'prop-types';

class MoviePoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: null,
      loading: true
    }
  }

  componentDidMount() {
    api.getMovieDetails(this.props.movieId)
      .then(currMovie => {
        this.setState(() => ({movieData: currMovie}));
        const img = new Image();
        img.src = "https://image.tmdb.org/t/p/original/" + currMovie.backdrop_path;
        img.onload = () => {this.setState(() => ({loading: false}))};
        img.onerror = () => {this.setState(() => ({loading: false}))};
      });
  }

  render() {
    const movieData = this.state.movieData;
    const loading = this.state.loading;
    return (
      <div className="movie-detail-container" style={loading === true ? {alignItems: 'center'} : {alignItems: 'start'}}>
        {loading === true
         ? <Loading color={'#fff'}/>
         : <div className="poster-outer-outer" style={{backgroundImage: `url('https://image.tmdb.org/t/p/original/${movieData.backdrop_path}')`}}><div className="poster-outer"><MoviePosterData data={movieData} onClick={() => this.props.onClose()} /></div></div>}
      </div>
    )
  }
}

MoviePoster.propTypes = {
  movieId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired
}

export default MoviePoster;
