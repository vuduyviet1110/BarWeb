import React, { useState } from "react";
import { Button, Form, Col, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import {
  RegisterStart,
  RegisterSuccess,
  RegisterFailed,
} from "../redux/authSlice";
import { request } from "../utils/request";
import CustomInput from "../common/CustomInput";
import signIn from "../assets/images/Barava.jpg";
import { isValidEmail } from "../common/validattion";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gmail: "",
    password: "",
    rePassword: "",
    DOB: null,
  });

  const validateForm = () => {
    const errors = {};
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.rePassword)
      errors.rePassword = "Passwords do not match";
    if (!formData.DOB) errors.DOB = "Please enter your date of birth";
    if (formData.phone.length !== 10)
      errors.phone = "Phone number must be 10 digits";
    if (!isValidEmail(formData.gmail)) errors.gmail = "Invalid email format";

    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    if (formData.DOB > eighteenYearsAgo)
      errors.age = "You must be at least 18 years old";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field when the user starts typing
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, DOB: date }));
    setFormErrors((prev) => ({ ...prev, DOB: "", age: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    if (!validateForm()) {
      return;
    }

    dispatch(RegisterStart());
    setLoading(true);

    try {
      const response = await request.post("/sign-up", formData);
      dispatch(RegisterSuccess());
      setSignInSuccess(true);
      setTimeout(() => {
        setSignInSuccess(false);
        navigate("/sign-in");
      }, 3000);
    } catch (error) {
      dispatch(RegisterFailed());
      console.error("Error:", error);

      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data === "Email already exists"
        ) {
          setFormErrors((prev) => ({ ...prev, gmail: "Email already exists" }));
        } else {
          setFormErrors((prev) => ({
            ...prev,
            submit: "An error occurred. Please try again.",
          }));
        }
      } else if (error.request) {
        setFormErrors((prev) => ({
          ...prev,
          submit: "No response from server. Please try again.",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          submit: "An error occurred. Please try again.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${signIn})`,
        backgroundPosition: "top center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: "600px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "16px",
        }}
      >
        <h2 style={{ color: "brown", textAlign: "center" }}>Sign Up</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Form.Group as={Col} md="6">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name || "Enter your Name"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                isInvalid={!!formErrors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phone || "Enter your Phone Number"}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="email"
                  name="gmail"
                  value={formData.gmail}
                  onChange={handleChange}
                  placeholder="Email"
                  isInvalid={!!formErrors.gmail}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.gmail || "Enter your Email"}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label style={{ display: "block" }}>
                Date of Birth
              </Form.Label>
              <DatePicker
                selected={formData.DOB}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                isClearable
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={50}
                showMonthDropdown
                customInput={
                  <CustomInput
                    isInvalid={!!formErrors.DOB || !!formErrors.age}
                  />
                }
                placeholderText="Date of Birth"
              />
              {formErrors.DOB && (
                <div className="text-danger">{formErrors.DOB}</div>
              )}
              {formErrors.age && (
                <div className="text-danger">{formErrors.age}</div>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                isInvalid={!!formErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.password || "Enter your password"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Re-enter your password</Form.Label>
              <Form.Control
                required
                type="password"
                name="rePassword"
                value={formData.rePassword}
                onChange={handleChange}
                placeholder="Re-enter Password"
                isInvalid={!!formErrors.rePassword}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.rePassword || "Re-enter your password"}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {signInSuccess && (
            <div className="text-success fs-5 mb-3">
              You have successfully signed up!
            </div>
          )}
          {formErrors.submit && (
            <div className="text-danger fs-5 mb-3">{formErrors.submit}</div>
          )}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button
              href="/"
              style={{ backgroundColor: "brown", width: "100px" }}
            >
              Back
            </Button>
            <Button
              type="submit"
              style={{ width: "100px", backgroundColor: "#918717" }}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
