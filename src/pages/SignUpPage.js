import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import signIn from "../assets/images/Barava.jpg";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";
import { request } from "../utils/request";

function SignUpPage() {
  const [validated, setValidated] = useState(false);
  const [rePwd, setrePwd] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gmail: "",
    password: "",
    DOB: "",
  });
  const [invalidLength, setinvalidLength] = useState(false);
  const [invalidAge, setinvalidAge] = useState();
  const [phoneLength, setPhoneLength] = useState("");
  const [signInSuccess, setSignInSuccess] = useState();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const handleChangeInfo = (e) => {
    setFormData((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevInfo) => ({
      ...prevInfo,
      DOB: date ? date : false, // Set DOB field in formData to the selected date
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      formData.password.length < 6 ||
      invalidAge ||
      invalidLength ||
      !formData.DOB ||
      phoneLength === false
    ) {
      event.stopPropagation();
      if (formData.password.length < 6 || rePwd !== formData.password) {
        setinvalidLength(true);
      } else {
        setinvalidLength(false);
      }
      if (!formData.DOB) {
        setinvalidAge(true);
      } else {
        setinvalidAge(false);
      }
      setValidated(true);
      return;
    } else {
      try {
        const res = await request.post("/sign-up", formData);
        console.log(res.data);
        setSignInSuccess(true);
      } catch (error) {
        console.error("Error:", error);
      }
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label> Name</Form.Label>
              <Form.Control
                onChange={handleChangeInfo}
                required
                type="text"
                placeholder="Name"
                name="name"
              />
              <Form.Control.Feedback>Field is filled!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Enter your Name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                value={formData.phone}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setFormData((prevInfo) => ({
                      ...prevInfo,
                      phone: e.target.value,
                    }));
                  }
                }}
                onBlur={() => {
                  if (formData.phone.length === 10) {
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
                  type="gmail"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="gmail"
                  onChange={handleChangeInfo}
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
                selected={formData.DOB}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                onBlur={() => {
                  if (
                    formData.DOB &&
                    formData.DOB.getFullYear() >= currentYear - 18
                  ) {
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
                  This field is required/ You must be at least 18 years
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
                value={formData.password}
                name="password"
                onChange={handleChangeInfo}
                onBlur={() => {
                  if (formData.password.length >= 6) {
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
              {formData.password !== rePwd && (
                <span style={{ color: "red" }}> Password is not matched</span>
              )}
            </Form.Group>
          </Row>
          {signInSuccess && (
            <div style={{ color: "green", fontSize: "20px" }}>
              You have successfully signed up!!!
            </div>
          )}
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
