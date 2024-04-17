import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { request } from "../utils/request";
function ResetPwd() {
  const [CurrentUser, setCurrrentUser] = useState({
    user_id: 0,
    user_name: "0",
    user_gmail: "",
  });

  const [ResetPwd, setResetPwd] = useState("");
  const [validEmail, setvalidEmail] = useState("0");
  const handleSubmit = async (e) => {
    console.log(CurrentUser);
    try {
      e.preventDefault();
      const res = await request.post("/reset-password", CurrentUser);
      if (res.data === "No email existed") {
        setResetPwd(false);
        setvalidEmail(false);
        console.log(res.data);
      } else {
        setResetPwd(true);
        setvalidEmail(true);
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

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                id="typeEmail"
                placeholder="Your Email "
                onChange={(e) => {
                  setCurrrentUser((prev) => ({
                    ...prev,
                    user_gmail: e.target.value,
                  }));
                  console.log(e.target.value);
                }}
              />
              {ResetPwd && (
                <p style={{ color: "green" }} className="card-text py-2">
                  We have sent username and password to your email. Please check
                  it out!
                </p>
              )}
              {!validEmail && (
                <p style={{ color: "red" }} className="card-text py-2">
                  Please check your email again
                </p>
              )}
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
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResetPwd;
