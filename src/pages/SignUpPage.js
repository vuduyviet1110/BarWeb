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
  const [rePwd, setrePwd] = useState("");
  const [invalidLength, setinvalidLength] = useState(false);
  const [invalidAge, setinvalidAge] = useState();
  const [phoneLength, setPhoneLength] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  console.log(selectedDate);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  console.log(selectedDate?.getFullYear());

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      pwd.length < 6 ||
      invalidAge ||
      invalidLength ||
      phoneLength === false
    ) {
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
          minWidth: "600px",
          minHeight: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "16px",
        }}
      >
        <h2 style={{ color: "brown" }}> Sign Up</h2>
        <Form
          noValidate
          validated={validated}
          method="Post"
          onSubmit={handleSubmit}
        >
          <Row className="mb-4">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label> Name</Form.Label>
              <Form.Control required type="text" placeholder="Name" />
              <Form.Control.Feedback>Field is filled!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Enter your Name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                value={phone}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setPhone(e.target.value);
                  }
                }}
                onBlur={() => {
                  if (phone.length === 10) {
                    setPhoneLength(true);
                  } else {
                    setPhoneLength(false);
                  }
                }}
                placeholder="Phone Number"
              />
              <Form.Control.Feedback>Field is filled!</Form.Control.Feedback>
              {phoneLength === false && (
                <span style={{ color: "red" }}>
                  Your phone number must be 10 digits
                </span>
              )}
              <Form.Control.Feedback type="invalid">
                Enter your Phone Number
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustomUsername">
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
                onBlur={() => {
                  if (selectedDate?.getFullYear() >= currentYear - 18) {
                    setinvalidAge(true);
                  } else {
                    setinvalidAge(false);
                  }
                }}
                isClearable
                showIcon
                required
                placeholderText="Date Of Birth"
              />
              {invalidAge && (
                <span style={{ color: "red" }}>
                  You must be at least 18 years old and do not
                </span>
              )}
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
              justifyContent: "center ",
              alignItems: "center",
              margin: "40px 0 0",
            }}
          >
            <Button
              href="/"
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
                width: "100px",
                backgroundColor: "#918717",
              }}
            >
              Confirm
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUpPage;
