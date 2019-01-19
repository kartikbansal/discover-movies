import React, { Component } from 'react';
import Loading from './Loading.js';
import MoviePosterData from './MoviePosterData.js';
import PropTypes from 'prop-types';
import { loadImage } from '../utils/helpers.js';

class MoviePoster extends Component {

  constructor(props) {
    super(props);
    this.img = undefined;
    this.state = {
      bgImgLoading: true
    };

    this.handleBgImgLoad = this.handleBgImgLoad.bind(this);
    this.handleBgImgError = this.handleBgImgError.bind(this);
  }

  componentDidMount() {
    this.fetchBgImage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedMovie !== prevProps.selectedMovie) {
      this.fetchBgImage();
    }
  }

  fetchBgImage() {
    const { selectedMovie } = this.props;
    this.img = selectedMovie
      ? loadImage(
          `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
          this.handleBgImgLoad,
          this.handleBgImgError
        )
      : undefined;
  }

  handleBgImgLoad() {
    this.setState(() => ({bgImgLoading: false}));
  }

  handleBgImgError() {
    this.setState(() => ({bgImgLoading: false}));
  }

  componentWillUnmount() {
    this.img.removeEventListener('load', this.handleBgImgLoad);
    this.img.removeEventListener('error', this.handleBgImgError);
  }

  render() {
    const { isFetchingSelectedMovie, selectedMovie, onClose } = this.props;
    const { bgImgLoading } = this.state;

    return (
      <div 
        className="movie-detail-container" 
        style={bgImgLoading === true ? {alignItems: 'center'} : {alignItems: 'start'}}
      >
        {isFetchingSelectedMovie || bgImgLoading
          ? <Loading color={'#fff'}/>
          : <div
              className="poster-outer-outer" 
              style={{backgroundImage: `url('https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}')`}}
            >
              <div className="poster-outer">
                <MoviePosterData data={selectedMovie} onClose={onClose} />
              </div>
            </div>
        }
      </div>
    );
  }
}

MoviePoster.propTypes = {
  selectedMovie: PropTypes.object,
  isFetchingSelectedMovie: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default MoviePoster;
