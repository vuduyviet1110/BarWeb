import React, { useState } from "react";
import "../assets/css/HomePage.css";
import { Image, Button, Modal, Form, Dropdown } from "react-bootstrap";
import talkingincouter from "../assets/images/talkingincouter.jpg";
import { Link } from "react-router-dom";
import { request } from "../utils/request";

function ChangePwd({ CurentUser, handleLogout }) {
  const [showModalChangePwd, setModalChangePwd] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [invalidLength, setinvalidLength] = useState(false);
  const [validated, setValidated] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [passChanged, setPassChanged] = useState(false);
  const [invalidOldPwd, setInvalidOldPwd] = useState(false);

  const handleClose = () => {
    setModalChangePwd(false);
  };

  const handleLogoutClick = () => {
    // Gọi hàm handleLogout khi người dùng click vào nút "Log Out"
    handleLogout();
  };
  const handleSaveChanges = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (
      form.checkValidity() === false ||
      invalidOldPwd ||
      !matchPwd || // Kiểm tra matchPwd có tồn tại không
      invalidOldPwd
    ) {
      console.log("failed");
      setMatchPwd(false);
      setPassChanged(false);
      setinvalidLength(false);
    } else {
      try {
        setValidated(true);
        setModalChangePwd(true);
        const updatedUser = JSON.parse(JSON.stringify(CurentUser));
        // Cập nhật password mới trong bản sao
        updatedUser.user_password = newPassword;
        const res = await request.put("change-password", updatedUser);
        if (res) {
          setPassChanged(true);
        }
        setPassChanged(true);
        setTimeout(() => {
          setModalChangePwd(false);
          setPassChanged(false);
          setValidated(false);
        }, 4000);
      } catch (error) {
        console.error("Error saving changes:", error);
        // Xử lý lỗi ở đây nếu cần
      }
    }
  };
  const handleShow = () => setModalChangePwd(true);

  const handleOldPwd = (e) => {
    // fetch data từ database để xem người dùng có nhập đúng mật khẩu không
    if (CurentUser.user_password !== e.target.value) {
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
          <Dropdown.Item>
            <Button
              style={{
                backgroundColor: "transparent",
                color: "black",
                border: "none",
              }}
              onClick={handleLogoutClick}
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
                onBlur={() => {
                  if (newPassword.length < 6) {
                    setinvalidLength(true);
                    console.log("length>6");
                    console.log(CurentUser.user_password);
                  } else {
                    setinvalidLength(false);
                  }
                }}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                type="password"
              />
              {invalidLength && (
                <div style={{ color: "red" }}>
                  Password must be at least 6 characters!!
                </div>
              )}
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
