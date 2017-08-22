import React from 'react';
import api from '../utils/api.js';
import PropTypes from 'prop-types';

class SelectContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(val) {
    this.setState(() => ({selectedValue: val}));
    this.props.onChange(val);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.selectedValue !== this.props.selectedValue;
  }

  render() {
    return (
      <div className="select-container">
        <label>{this.props.label}:</label>
        <select value={this.props.selectedValue} onChange={(evt) => this.handleChange(evt.target.value)} tabIndex="-1">
          {this.props.valueArr.map((value, idx) => {
            return (
              this.props.label === 'Rating'
              ? <option value={value} key={value}>{idx !== 0 ? `${value}+` : 'All'}</option>
              : <option value={value} key={value}>{value}</option>
            )
          })}
        </select>
      </div>
    );
  }
}

SelectContainer.propTypes = {
  label: PropTypes.string.isRequired,
  valueArr: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allGenres: null
    }
  }

  componentDidMount() {
    api.getGenres()
      .then(genres => this.setState(() => ({allGenres: genres})));
  }

  handleChange() {
    const filters = this.state.filters
  }

  render () {
    const ratings = ['0','9','8.5','8','7.5','7','6','5','4','3','2','1'];
    const orderBy = ['Popularity', 'Release Date', 'Rating'];
    const allGenres = this.state.allGenres;

    const rating = this.props.filters.rating;
    const order = this.props.filters.order;
    const activeGenres = this.props.filters.activeGenres;

    const filterContainer = document.getElementsByClassName('filter-container');
    filterContainer.length !== 0
    ? (filterContainer[0].style.height = this.props.active ? `${filterContainer[0].scrollHeight}px` : "0px")
    : null;

    return (
      <div className="filter-container">
        <div style={{padding: '10px'}}>
          <ul className="genres-list">
            {allGenres && allGenres.map(genre => {
              const activeGenre = activeGenres.indexOf(genre.id) !== -1;
              return (
                <li key={genre.id} className="genre"
                  onClick={() => this.props.onChange(genre, "activeGenres")}
                  style={
                    activeGenre
                    ? {background: '#01d077', color: '#fff'}
                    : null}>
                  {genre.name}
                  {activeGenre
                   ? <span> &#10005;</span>
                   : <span> +</span>}
                </li>
              )
            })}
          </ul>
          <div className="filter-options">
            <SelectContainer label="Rating" valueArr={ratings} selectedValue={rating} onChange={(rating) => this.props.onChange(rating, "rating")} />
            <SelectContainer label="Order By" valueArr={orderBy} selectedValue={order} onChange={(order) => this.props.onChange(order, "order")} />
          </div>
        </div>
      </div>
    )
  }
}

Filters.propTypes = {
  active: PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Filters;
