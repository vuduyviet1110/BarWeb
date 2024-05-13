import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { request } from "../utils/request";
function ManageUser() {
  const [users, setUsers] = useState([
    {
      user_id: 1,
      user_DOB: "2000-12-20T17:00:00.000Z",
      user_name: "user1",
      user_gmail: "binphamthanh@gmail.com",
      user_password: "123456",
      user_phone: "4564625",
      user_address: "21 st, Hà nội",
    },
  ]);
  const [show, setShow] = useState(false);

  const handleRemoveUser = async (user_id) => {
    try {
      const res = await request.delete("/admin/user", {
        data: { user_id },
      });
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
    console.log("số: ", user_id);
  };

  const handleInputChange = (e, userId) => {
    const { name, value } = e.target;
    // Update a copy of the reservations array
    const updatedUser = users.map((user) => {
      // Nếu user_id trùng với userId, cập nhật trường tương ứng
      if (user.user_id === userId) {
        return {
          ...user,
          [name]: value, // Cập nhật giá trị trường tương ứng với tên
        };
      }
      return user; // Trả về phần tử không thay đổi cho các user_id khác
    });

    setUsers(updatedUser);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get("/admin/user");
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  console.log(users);
  return (
    <Container
      style={{
        borderRadius: "10px",
        color: "rgb(161, 158, 158)",
        paddingLeft: "10px",
        margin: "0 0 0 16px",
        backgroundColor: "rgb(0, 0, 0,0.6)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 className="mt-1 ">Bar Management</h1>
      <div>
        <h3>Manage Users</h3>

        <Row lg={4}>
          {users.map((user) => (
            <Col key={user.user_id}>
              <h4>All User Infor: {user.user_id}</h4>
              <Form.Label>Name</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                name="user_name"
                onChange={(e) => handleInputChange(e, user.user_id)}
                value={user.user_name}
              />

              <Form.Label>Phone</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                name="user_phone"
                type="text"
                onChange={(e) => handleInputChange(e, user.user_id)}
                value={user.user_phone}
              />

              <Form.Label>Email</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                name="user_gmail"
                type="text"
                onChange={(e) => handleInputChange(e, user.user_id)}
                value={user.user_gmail}
              />

              <Form.Label> DOB </Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                name="user_DOB"
                onChange={(e) => handleInputChange(e, user.user_id)}
                value={user.user_DOB}
              />

              <div>
                <Button
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "none",
                    margin: "10px",
                  }}
                  onClick={() => handleRemoveUser(user.user_id)}
                >
                  Remove
                </Button>
              </div>
              <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ color: "green" }}>
                    Remove Succesfully!!!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  You have successfully remove this user . Please reload again
                  to see the change
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default ManageUser;
