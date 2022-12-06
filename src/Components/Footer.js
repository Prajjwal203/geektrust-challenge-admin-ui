import React from "react";
import "./Styling.css";

const Footer = (props) => {
  const {
    usersPerPage,
    totalUsers,
    currPageNumber,
    setPageNumber,
    deleteSelected,
  } = props;

  const pagination = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pagination.push(i);
  }

  const paginate = (pageNo) => setPageNumber(pageNo);

  const setToFirst = () => {
    setPageNumber(1);
  };
  const setToLast = () => {
    setPageNumber(pagination.length);
  };

  const setNextPage = () => {
    if (currPageNumber !== pagination.length) {
      setPageNumber(currPageNumber + 1);
    }
  };

  const setPrevPage = () => {
    if (currPageNumber !== 1) {
      setPageNumber(currPageNumber - 1);
    }
  };

  return (
    <div className="footerStyle">
      <button className="del_sel" onClick={deleteSelected}>
        Delete selected
      </button>
      <nav className="navStyle">
        <ul className="pagination pagination-style">
          <li onClick={() => setToFirst()} className="page-item">
            {"<<"}
          </li>
          <li onClick={() => setPrevPage()} className="page-item">
            {"<"}
          </li>
          {pagination.map((pageNo) => (
            <li
              key={pageNo}
              onClick={() => paginate(pageNo)}
              className={`page-item ${
                currPageNumber === pageNo ? "highlight" : ""
              }`}
            >
              {pageNo}
            </li>
          ))}
          <li onClick={() => setNextPage()} className="page-item">
            {">"}
          </li>
          <li onClick={() => setToLast()} className="page-item">
            {">>"}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Footer;
