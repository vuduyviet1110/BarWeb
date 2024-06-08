import React, { useState } from "react";
import "../assets/css/HomePage.css";
import { Image, Button, Modal, Form, Dropdown } from "react-bootstrap";
import talkingincouter from "../assets/images/quayBarr.jpg";
import { Link } from "react-router-dom";
import { request } from "../utils/request";

function ChangePwd({ CurentUser, handleLogout }) {
  const [showModalChangePwd, setModalChangePwd] = useState(false);
  const [invalidLength, setinvalidLength] = useState(false);
  const [validated, setValidated] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [passChanged, setPassChanged] = useState(false);
  const [invalidOldPwd, setInvalidOldPwd] = useState(false);
  const [data, setData] = useState({
    oldpwd: "",
    newpwd: "",
    user_id: CurentUser.user_id,
  });
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
      !matchPwd ||
      data.newpwd.length < 6 // Kiểm tra matchPwd có tồn tại không
    ) {
      console.log("failed");
      setPassChanged(false);
      setinvalidLength(true);
    } else {
      try {
        setinvalidLength(false);
        setModalChangePwd(true);
        console.log(data);
        const res = await request.put("change-password", data);
        if (res.data === "success") {
          setInvalidOldPwd(false);
          setPassChanged(true);
          setTimeout(() => {
            setModalChangePwd(false);
            setPassChanged(false);
            setValidated(false);
          }, 4000);
        } else if (res.data === "wrong old pwd") {
          setInvalidOldPwd(true);
        } else {
        }
      } catch (error) {
        console.error("Error saving changes:", error);
        // Xử lý lỗi ở đây nếu cần
      }
    }
  };
  const handleShow = () => setModalChangePwd(true);

  const handleOldPwd = (e) => {
    setData((prevInfo) => ({
      ...prevInfo,
      oldpwd: e.target.value,
    }));
  };
  const handleNewPwd = (e) => {
    setData((prevInfo) => ({
      ...prevInfo,
      newpwd: e.target.value,
    }));
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
                onChange={handleNewPwd}
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
                  data.newpwd === e.target.value
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
