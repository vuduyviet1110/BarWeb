import { Card, Form, Button } from "react-bootstrap";
function ResetPwd() {
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
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              id="typeEmail"
              placeholder="Email input"
            />
          </Form.Group>
          <Button style={{ backgroundColor: "#874210" }} className="w-100">
            Reset password
          </Button>
          <div
            style={{ fontSize: "18px" }}
            className="d-flex justify-content-between mt-4"
          >
            <a href="/sign-in">Login</a>
            <a href="/sign-up">Register</a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResetPwd;
