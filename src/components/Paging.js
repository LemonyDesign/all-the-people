import React, { useState } from "react";

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
    <nav className="paging">
      {currentPage > 1 ? (
        <a
          style={{
            display: "block",
            padding: "1rem",
            backgroundColor: "red",
            color: "white"
          }}
          onClick={handleClickPrevious}
          className="paging__previous"
        >
          previous &larr;
        </a>
      ) : null}

      <span className="paging__count">Page: {currentPage}</span>

      {currentPage < totalPages ? (
        <a
          style={{
            display: "block",
            padding: "1rem",
            backgroundColor: "green",
            color: "white"
          }}
          onClick={handleClickNext}
          className="paging__next"
        >
          next &rarr;
        </a>
      ) : null}
    </nav>
  );
}

export default Paging;
