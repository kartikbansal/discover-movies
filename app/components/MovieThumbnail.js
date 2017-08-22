import React from 'react';
import {getFormattedDate} from '../utils/helpers.js';
import PropTypes from 'prop-types';

class MovieThumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoaded: false
    }
  }

  componentDidMount() {
    const img = new Image();
    img.src = "https://image.tmdb.org/t/p/w500/" + this.props.movie.poster_path;
    img.onload = () => {this.setState(() => ({imageLoaded: true}))};
    img.onerror = () => {this.setState(() => ({imageLoaded: true}))};
  }

  render() {
    const imageLoaded = this.state.imageLoaded;
    return (
      <div className="movie-thumbnail" onClick={this.props.onClick} style={{cursor: 'pointer'}}>
        <img className="img-responsive"
          src={imageLoaded ? `https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}` : '/app/images/placeholder.jpg'}/>
        <p className="thumbnail-title">
          {this.props.movie.original_title}
        </p>
        <p>{getFormattedDate(this.props.movie.release_date).year}</p>
      </div>
    );
  }
}

MovieThumbnail.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MovieThumbnail;
