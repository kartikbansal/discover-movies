import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ currPage, totalPages, onClick }) => {

  const computePageNo = (prevOrNext) => {
    prevOrNext === 'prev'
      ? onClick(currPage - 1)
      : onClick(currPage + 1);
  }

  return totalPages < 1
    ? null
    : (<div className="grid-pagination">
          {currPage !== 1 &&
            <button
              className="page-btn prev-btn"
              onClick={() => computePageNo('prev')}>
              &#10229;
            </button>
          }
          {currPage} &nbsp;&nbsp;&nbsp;/ &nbsp;&nbsp;&nbsp;{`${totalPages}`.split('').join(' ')}
          {currPage !== totalPages &&
            <button
              className="page-btn next-btn"
              onClick={() => computePageNo('next')}>
              &#10230;
            </button>
          }
        </div>
      );
}

Pagination.propTypes = {
  currPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  // setPage: PropTypes.func.isRequired
}

export default Pagination;
