import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currPage: this.props.currPage
    }
  }

  handleClick(type) {
    const currPage = this.state.currPage;
    type === 'left'
    ? this.setState((prev) => ({currPage: prev.currPage - 1}))
    : this.setState((prev) => ({currPage: prev.currPage + 1}));
    this.props. onClick(currPage, type);
  }

  render () {
    const currPage = this.state.currPage;

    return (
      <div className="grid-pagination">
        {currPage !== 1 &&
          <button
            className="page-btn prev-btn"
            onClick={() => this.handleClick('left')}>
            &#10229;
          </button>
        }
        {currPage} &nbsp;&nbsp;&nbsp;/ &nbsp;&nbsp;&nbsp;{`${this.props.totalPages}`.split('').join(' ')}
        {currPage !== this.props.totalPages &&
          <button
            className="page-btn next-btn"
            onClick={() => this.handleClick('right')}>
            &#10230;
          </button>
        }
      </div>
    );
  }
}

Pagination.propTypes = {
  currPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Pagination;
