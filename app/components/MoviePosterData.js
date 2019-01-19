import React from 'react';
import {getFormattedTime, getGenreStr, getFormattedDate} from '../utils/helpers.js';
import numeral from 'numeral';
import PropTypes from 'prop-types';

const MoviePosterData = ({ data, onClose }) => {
  const movieDate = getFormattedDate(data.release_date);
  return (
    <div>
      <div className="poster-container ">
        <div className="img-container">
          <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} />
        </div>
        <div className="data-container">
          <h1>{data.original_title} <span>({movieDate.year})</span></h1>
          <p>{getFormattedTime(data.runtime)} | {getGenreStr(data.genres)} |
            {` ${movieDate.day} ${movieDate.month}, ${movieDate.year}`}</p>
          <p className="overview">{data.overview}</p>
          <div className="rating-info">
            <div>
              <span>Vote Average:</span>
              <p>{data.vote_average !== 0 ? `${data.vote_average}/10` : '-'}</p>
            </div>
            <div>
              <span>Box Office:</span>
              <p>{data.revenue !== 0 ? numeral(data.revenue).format('($0,0)') : '-'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="back-btn" onClick={onClose}><span>&#10005;</span></div>
    </div>
  );
}

MoviePosterData.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default MoviePosterData;
