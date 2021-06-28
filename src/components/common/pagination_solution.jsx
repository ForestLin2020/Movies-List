import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; // underscore

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  // console.log('currentPage', currentPage);

  const pages = Math.ceil(itemsCount / pageSize);
  if (pages === 1) return null;

  // create numbers array like: [1, 2, 3, ... pages]
  // and then map in <li>
  // way1: for loop + push
  // way2: lodash JS library
  const pagesInArray = _.range(1, pages + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pagesInArray.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
