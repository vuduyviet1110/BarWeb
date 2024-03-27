import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import signIn from "../assets/images/Barava.jpg";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function SignInPage() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${signIn})`,
        backgroundPosition: "top center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minWidth: "500px",
          minHeight: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <h2 style={{ color: "brown" }}> Sign In</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>User Name</Form.Label>
              <Form.Control required type="text" placeholder="User Name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label type="password">Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check label="Remember " />
          </Form.Group>
          <Button
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "brown",
            }}
            type="submit"
          >
            Confirm
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignInPage;
