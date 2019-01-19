import React, { Fragment } from 'react';
import MovieGridContainer from "../containers/MovieGridContainer";
import PaginationContainer from "../containers/PaginationContainer";
import Loading from './Loading';

const MovieGridWrapper = ({ totalResults, isFetchingMovies, isFetchingMoviesPageChange, currPage }) => (
  <div className="container">
    <div className="row">
      {totalResults >= 1
        ? (
            <Fragment>
              <h1 className="results">{totalResults}&nbsp; Movie{totalResults === 1 ? null : 's'}&nbsp; Found</h1>
              <PaginationContainer />
              {!isFetchingMoviesPageChange.byPage[currPage] ? <MovieGridContainer /> : <Loading />}
            </Fragment>
          )
        : !isFetchingMovies && <h1 className="results">No Movies Found</h1>}
    </div>
  </div>
)

export default MovieGridWrapper;