import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// class Pagination extends Component {
//   constructor(props) {
//     super(props);

//     this.onClick = this.onClick.bind(this);
//     this.setPage = _.debounce(this.setPage, 200);
//   }

//   onClick(prevOrNext) {
//     this.props.onClick(prevOrNext);
//     // this.setPage();
//   }

//   setPage() {
//     const { setPage, currPage } = this.props;
//     setPage(currPage);
//   }

//   render() {
//     const { totalPages, currPage } = this.props;

//     return totalPages < 1
//       ? null
//       : (<div className="grid-pagination">
//             {currPage !== 1 &&
//               <button
//                 className="page-btn prev-btn"
//                 onClick={() => this.onClick('prev')}>
//                 &#10229;
//               </button>
//             }
//             {currPage} &nbsp;&nbsp;&nbsp;/ &nbsp;&nbsp;&nbsp;{`${totalPages}`.split('').join(' ')}
//             {currPage !== totalPages &&
//               <button
//                 className="page-btn next-btn"
//                 onClick={() => this.onClick('next')}>
//                 &#10230;
//               </button>
//             }
//           </div>
//         );
//   }
// }

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
