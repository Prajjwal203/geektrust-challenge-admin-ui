import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
import "../App.css";

export default function EditUser(props) {
  let { currUser, allUsers, setAllUsers, filteredUsers } = props;

  const [modal, setModal] = useState(false);


  const [updatedInfo, setUpdatedInfo] = useState({
    id: currUser.id,
    name: currUser.name,
    email: currUser.email,
    role: currUser.role,
  });

  const updateUserInfo = (userId, updatedInfo) => {
    const userIdindex = allUsers.findIndex((user) => userId === user.id);
    allUsers.splice(userIdindex, 1, updatedInfo);
    filteredUsers = allUsers;
    setAllUsers([...filteredUsers]);
    setModal(false);
    alert("Data updated successfully")
  };

  const editEachInfo = (e) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button className="btn" onClick={() => setModal(true)}>
        {/* <i className="far fa-edit"></i> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          style={{ opacity: "0.8"}}
          fill="currentColor"
          className="bi bi-pencil-square mx-4"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
        </svg>
      </button>
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader className="mStyle">
          Edit/Update User Information
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <input
                type="text"
                className="inp_elem"
                name="name"
                value={`${updatedInfo.name}`}
                onChange={(e) => editEachInfo(e)}
                placeholder="edit name here"
              />
            </Col>
            <Col>
              <input
                type="email"
                className="inp_elem"
                name="email"
                value={`${updatedInfo.email}`}
                onChange={(e) => editEachInfo(e)}
                placeholder="edit email here"
              />
            </Col>
            <Col>
              {" "}
              <select
                className="inp_elem"
                name="role"
                onChange={(e) => editEachInfo(e)}
              >
                <option value="Select role">Select role</option>
                <option value="member">member</option>
                <option value="admin">admin</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col className="submitData">
              <button
                type="button"
                className="submitButton"
                onClick={() => updateUserInfo(currUser.id, updatedInfo)}
              >
                Submit
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}
