import React, { useState, useEffect } from "react";
import { config } from "../App";
import axios from "axios";
import SearchBar from "./SearchBar";
import EditUser from "./EditUser";
import "../App.css";
import Footer from "./Footer";

const Table = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [allCheck, setAllCheck] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const usersPerPage = 10;

  // function to perform API call to backend Api
  const performAPICall = async () => {
    try {
      setLoading(true);
      const response = await axios.get(config.backendpoint);
      setLoading(false);
      setAllUsers(response.data);
    } catch (error) {
      alert("Failed to fetch backend data");
    }
  };

  useEffect(() => {
    performAPICall();
  }, []);

  // Calculating the first and last user index on the 'Current' page to obtain list of users on the current page:
  const lastUserIndex = pageNumber * usersPerPage - 1;
  const firstUserIndex = lastUserIndex - usersPerPage + 1;
  let currList = allUsers.slice(firstUserIndex, lastUserIndex + 1);

  // Handling SearchBar for user search
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  //We create a filtered user list which takes in filtered values after the search
  let filteredUsers = [];

  if (searchValue.length <= 2) {
    filteredUsers = currList;
  } else {
    filteredUsers = allUsers.filter(
      (singleUser) =>
        singleUser.name.toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1 ||
        singleUser.email.toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1 ||
        singleUser.role.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );
  }

  // Function to select a single user:
  const selectUser = (e, data) => {
    const target = e.target;
    if (target.checked) {
      setSelectedList([...selectedList, data]);
    } else {
      setSelectedList(
        [...selectedList].filter((userData) => userData !== data)
      );
    }

    if (selectedList.length === filteredUsers.length) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  };

  // Function to select all users on the current page:
  const selectAll = (e) => {
    const ch = e.target;
    if (ch.checked) {
      setAllCheck(true);
      setSelectedList([...filteredUsers]);
    } else {
      setAllCheck(false);
      setSelectedList([]);
    }
  };

  //Function to delete user by clicking on the delete button
  const deleteUser = (userData) => {
    console.log("deleting user");
    setAllCheck(false);
    setAllUsers(allUsers.filter((user) => user !== userData));
    setSelectedList(selectedList.filter((user) => user !== userData));
  };

  // Function to delete all of the selected users
  const deleteSelected = () => {
    if (selectedList.length !== 0) {
      if (
        window.confirm(
          `Delete ${
            selectedList.length === 1
              ? `this user?`
              : `these ${selectedList.length} users?`
          } `
        )
      ) {
        setAllCheck(false);
        setAllUsers(
          allUsers.filter((user) => selectedList.indexOf(user) === -1)
        );
        setSelectedList([]);
      }
    } else {
      alert("No user selected");
    }
  };

  /* -------------------------JSX begins here------------------------ */
  return (
    <div>
      <SearchBar handleSearch={handleSearch} searchValue={searchValue} />

      {loading ? (
        <h2>🔃Loading Users... Please wait</h2>
      ) : allUsers.length === 0 ? (
        <div>
          <h4 className="empty">🚫No users in the backend</h4>
        </div>
      ) : (
        <table className="tStyle">
          <thead className="tshead">
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="CheckAll"
                  onChange={selectAll}
                  checked={allCheck}
                />
              </th>
              <th className="h-name">Name</th>
              <th className="h-email">Email</th>
              <th className="h-role">Role</th>
              <th className="h-action">Action</th>
            </tr>
          </thead>
          <tbody className="tsbody">
            {filteredUsers.map((user) => {
              return (
                <tr
                  key={user.id}
                  className={`rowStyle ${
                    selectedList.includes(user) ? "row-selected" : ""
                  }`}
                >
                  <td className="row-data">
                    <input
                      type="checkbox"
                      id={user.id}
                      value={user.id}
                      onChange={(e) => selectUser(e, user)}
                      checked={selectedList.includes(user)}
                    />
                  </td>
                  <td className="row-data">{user.name}</td>
                  <td className="row-data">{user.email}</td>
                  <td className="row-data">{user.role}</td>
                  <td className="iconStyling row-data">
                    <EditUser
                      currUser={user}
                      allUsers={allUsers}
                      setAllUsers={setAllUsers}
                      filteredUsers={filteredUsers}
                    />
                    <button
                      className="delete_icon"
                      onClick={() => deleteUser(user)}
                    >
                      <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash text-danger"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <Footer
        usersPerPage={usersPerPage}
        totalUsers={allUsers.length}
        currPageNumber={pageNumber}
        setPageNumber={setPageNumber}
        deleteSelected={deleteSelected}
      />
    </div>
  );
};

export default Table;
