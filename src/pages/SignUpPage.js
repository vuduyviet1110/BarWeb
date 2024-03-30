import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import signIn from "../assets/images/Barava.jpg";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";

function SignUpPage() {
  const [validated, setValidated] = useState(false);
  const [phone, setPhone] = useState(0);
  const [pwd, setPwd] = useState("");
  const [rePwd, setrePwd] = useState("");
  const [invalidLength, setinvalidLength] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || pwd.length < 6) {
      event.preventDefault();
      event.stopPropagation();
      if (pwd.length < 6 || rePwd !== pwd) {
        // Hiển thị thông báo lỗi khi mật khẩu có độ dài nhỏ hơn 6 ký tự
        setinvalidLength(true);
      }
      if (pwd.length >= 6) {
        setinvalidLength(false);
      }
      setValidated(true);
    }
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
          padding: "16px",
        }}
      >
        <h2 style={{ color: "brown" }}> Sign Up</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label> Name</Form.Label>
              <Form.Control required type="text" placeholder="Name" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                value={phone}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!isNaN(inputValue)) {
                    setPhone(inputValue);
                  }
                }}
                placeholder="Phone Number"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter your email address
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                // value={pwd}
                // onChange={(e) => setPwd(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              {invalidLength && (
                <span style={{ color: "red" }}>
                  Password must be at least 6 characters!!
                </span>
              )}
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Form.Label>Date Of Birth</Form.Label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                isClearable
                showIcon
                placeholderText="Date Of Birth"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                onBlur={() => {
                  if (pwd.length >= 6) {
                    setinvalidLength(false);
                  } else {
                    setinvalidLength(true);
                  }
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
              {invalidLength && (
                <span style={{ color: "red" }}>
                  Password must be at least 6 characters!!
                </span>
              )}
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Re-enter your password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password Again"
                required
                value={rePwd}
                onChange={(e) => setrePwd(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please re-enter your password
              </Form.Control.Feedback>
              {pwd !== rePwd && (
                <span style={{ color: "red" }}> Password must giống nhau</span>
              )}
            </Form.Group>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              margin: "50px 0 0",
            }}
          >
            <Button
              style={{
                backgroundColor: "brown",
                width: "100px",
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                width: "100px",
                backgroundColor: "brown",
              }}
            >
              Confirm
            </Button>
            <Button
              style={{
                width: "100px",
                backgroundColor: "brown",
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUpPage;
