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
        <i className="far fa-edit"></i>
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
