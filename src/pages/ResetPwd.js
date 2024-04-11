import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { request } from "../utils/request";
function ResetPwd() {
  const userId = localStorage.getItem("user_token");
  const [CurrentUser, setCurrrentUser] = useState({
    user_id: 0,
    user_name: "0",
    user_gmail: "",
  });

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchApi = async () => {
      try {
        const res = await request.get(`/${userId}`);
        setCurrrentUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const res = await request.post("/reset-password", CurrentUser);
      if (res.data) {
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#874210",
      }}
    >
      <Card className="text-center" style={{ width: "500px" }}>
        <Card.Header className="h5 ">Password Reset</Card.Header>
        <Card.Body className="px-5">
          <p className="card-text py-2">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          <Form.Group className="mb-3" onSubmit={handleSubmit}>
            <Form.Control
              type="email"
              id="typeEmail"
              placeholder="Your Email "
              onChange={(e) => {
                setCurrrentUser((prev) => ({
                  ...prev,
                  user_gmail: e.target.value,
                }));
              }}
            />
            <Button
              type="submit"
              style={{ backgroundColor: "#874210", margin: "16px 0 0 0" }}
            >
              Reset password
            </Button>
          </Form.Group>
          <div
            style={{ fontSize: "18px" }}
            className="d-flex justify-content-between mt-4"
          >
            <a href="/sign-in">Sign-in</a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResetPwd;
