import React from 'react';
import SelectContainer from '../containers/SelectContainer';
import GenresListContainer from '../containers/GenresListContainer';

const Filters = ({ showFilter }) => {
  const ratings = ['0','9','8.5','8','7.5','7','6','5','4','3','2','1'];
  const orderBy = ['Popularity', 'Release Date', 'Rating'];

  const filterContainer = document.getElementsByClassName('filter-container');
    filterContainer.length !== 0
    ? (filterContainer[0].style.height = showFilter ? `${filterContainer[0].scrollHeight}px` : "0px")
    : null;
  return (
    <div className="filter-container">
      <div style={{padding: '10px'}}>
        <GenresListContainer />
        <div className="filter-options">
          <SelectContainer label="Rating" valueArr={ratings} />
          <SelectContainer label="Order By" valueArr={orderBy} />
        </div>
      </div>
    </div>
  );
}

export default Filters;
