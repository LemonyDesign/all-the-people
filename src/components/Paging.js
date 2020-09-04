import React, { useState } from "react";
import PropTypes from "prop-types";

import "../styles/components/paging.scss";

function Paging({ receivePages, currentPage, totalPages }) {
  const [clicked, setClicked] = useState(false);

  const handleClickNext = event => {
    receivePages(currentPage + 1);
    setClicked(!clicked);
  };
  const handleClickPrevious = event => {
    if (currentPage > 1) {
      receivePages(currentPage - 1);
    }
  };

  return (
    <nav className="Paging">
      {currentPage > 1 ? (
        <a onClick={handleClickPrevious} className="Paging__previous">
          previous &larr;
        </a>
      ) : null}

      <span className="Paging__count">Page: {currentPage}</span>

      {currentPage < totalPages ? (
        <a onClick={handleClickNext} className="Paging__next">
          next &rarr;
        </a>
      ) : null}
    </nav>
  );
}

Paging.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  receivePages: PropTypes.func.isRequired
};

export default Paging;
