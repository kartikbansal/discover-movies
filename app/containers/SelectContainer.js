import React from 'react';
import PropTypes from 'prop-types';
import { changeRating, changeOrderBy } from '../actions';
import { connect } from 'react-redux';

const SelectContainer = ({ selectedValue, label, valueArr, dispatch }) => {
  const handleChange = (e) => {
    label === 'Rating'
    ? dispatch(changeRating(e.target.value))
    : dispatch(changeOrderBy(e.target.value));
  }

  return (
    <div className="select-container">
      <label>{label}:</label>
      <select value={selectedValue} onChange={handleChange} tabIndex="-1">
        {valueArr.map((value, idx) => {
          return (label === 'Rating'
            ? <option value={value} key={value}>{idx !== 0 ? `${value}+` : 'All'}</option>
            : <option value={value} key={value}>{value}</option>);
        })}
      </select>
    </div>
  );
}

SelectContainer.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  valueArr: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => 
  Object.assign({}, ownProps, { 
    selectedValue: ownProps.label === 'Rating' 
      ? `${state.filters.rating}` 
      : state.filters.orderBy 
  });


export default connect(mapStateToProps)(SelectContainer);
