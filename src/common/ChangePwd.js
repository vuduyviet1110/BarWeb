import React, { useState } from "react";
import "../assets/css/HomePage.css";
import { Image, Button, Modal, Form, Dropdown } from "react-bootstrap";
import talkingincouter from "../assets/images/talkingincouter.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword } from "../redux/userSlice";

function ChangePwd({ CurentUser }) {
  const [showModalChangePwd, setModalChangePwd] = useState(false);
  const [User, SetUser] = useState(CurentUser);
  const [newPassword, setNewPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [passChanged, setPassChanged] = useState(false);
  const [invalidOldPwd, setInvalidOldPwd] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setModalChangePwd(false);
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (
      form.checkValidity() === false ||
      invalidOldPwd ||
      !matchPwd ||
      invalidOldPwd
    ) {
      console.log("failed");
    } else {
      setValidated(true);
      dispatch(changePassword({ ...CurentUser, password: newPassword }));
      console.log("success");
      setPassChanged(true);
      setTimeout(() => {
        setModalChangePwd(false);
        setPassChanged(false);
        setValidated(false);
      }, 4000);
    }
  };

  const handleShow = () => setModalChangePwd(true);

  const handleOldPwd = (e) => {
    // fetch data từ database để xem người dùng có nhập đúng mật khẩu không
    if (CurentUser.password !== e.target.value) {
      setInvalidOldPwd(true);
    } else {
      setInvalidOldPwd(false);
    }
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <Image
            src={talkingincouter}
            roundedCircle
            style={{ width: "40px", height: "40px", margin: "0 4px 0px 12px" }}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <div>
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                  border: "none",
                }}
                onClick={handleShow}
              >
                Change Password
              </Button>
            </div>
          </Dropdown.Item>
          <Dropdown.Item>
            <Button
              style={{
                backgroundColor: "transparent",
                color: "black",
                border: "none",
              }}
            >
              <Link to={{ pathname: "/profile", state: { CurentUser } }}>
                Edit Profile
              </Link>
            </Button>
          </Dropdown.Item>
          <Dropdown.Item href="">
            <Button
              style={{
                backgroundColor: "transparent",
                color: "black",
                border: "none",
              }}
              onClick={() => SetUser(false)}
              href="/f"
            >
              Log Out
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>

        <Modal show={showModalChangePwd} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "brown" }}>
              Change Your Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "brown" }}>
            <Form validated={validated} onSubmit={handleSaveChanges}>
              <Form.Label htmlFor="oldPwd">Your Current Password</Form.Label>
              <Form.Control
                onChange={handleOldPwd}
                placeholder="Old Password"
                type="password"
                id="oldPwd"
                required
              />

              {invalidOldPwd && (
                <div style={{ color: "red" }}>Your Password is not correct</div>
              )}
              <Form.Label htmlFor="NewPwd">Your New Password</Form.Label>
              <Form.Control
                id="NewPwd"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                type="password"
              />

              <Form.Label htmlFor="ReNewPwd">Re-enter Your Password</Form.Label>
              <Form.Control
                onChange={(e) =>
                  newPassword === e.target.value
                    ? setMatchPwd(true)
                    : setMatchPwd(false)
                }
                placeholder="New Password Again"
                type="password"
                id="ReNewPwd"
                required
              />

              {matchPwd === false && (
                <div style={{ color: "red" }}>
                  Not match with your new password.
                </div>
              )}
              <Modal.Footer>
                {passChanged === true && (
                  <h4 style={{ color: "green" }}>Password has been changed</h4>
                )}
                <div>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    style={{ backgroundColor: "brown" }}
                    type="submit" // Thêm thuộc tính type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </Dropdown>
    </div>
  );
}

export default ChangePwd;
