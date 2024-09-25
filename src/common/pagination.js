import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "8px 0",
        width: "100%",
      }}
    >
      <button
        style={{
          padding: "4px 2px",
          margin: "0px 4px",
          backgroundColor: "brown",
          color: "white",
          borderRadius: "8px",
          opacity: currentPage === 1 ? "0.5" : "1",
        }}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span
        style={{
          padding: "4px 2px",
          margin: "0px 1px",
          backgroundColor: "#FFFF",
          borderRadius: "4px",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i}
            style={{
              padding: "4px 2px",
              margin: "0px 1px",
              borderRadius: "4px",
              width: "40px",
              justifyContent: "center",
              alignItems: "center",
              display: "inline-flex",
              height: "40px",
              cursor: "pointer",
              backgroundColor: currentPage === i + 1 ? "brown" : "#FFFFFF",
              color: currentPage === i + 1 ? "white" : "inherit",
            }}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </span>
        ))}
      </span>

      <button
        style={{
          padding: "4px 4px",
          margin: "0px 4px",
          backgroundColor: "brown",
          color: "white",
          borderRadius: "8px",
          opacity: currentPage === totalPages ? "0.5" : "1",
        }}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
