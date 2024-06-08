import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import signIn from "../assets/images/Barava.jpg";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { request } from "../utils/request";
import { loginFailed, loginStart, loginSuccess } from "../redux/authSlice";
import axios from "axios";
function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isAuth, setIsAuth] = useState();
  const [CurrentUser, setCurrentUser] = useState({
    user_gmail: "1",
    user_password: "",
    user_id: 0,
  });
  // ...
  const handleEmailCheck = (e) => {
    setCurrentUser((prev) => ({ ...prev, user_gmail: e.target.value }));
  };

  const handlePwdCheck = (e) => {
    setCurrentUser((prev) => ({ ...prev, user_password: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      dispatch(loginStart());
      try {
        const res = await request.post("/auth/sign-in", CurrentUser);
        if (
          res.data === "Incorrect Username and/or Password!" ||
          res.data === "wrong pwd"
        ) {
          setIsAuth(false);
          setTimeout(() => {
            setIsAuth(true);
          }, 3000);
          console.log(res.data);
        } else {
          dispatch(loginSuccess(res.data));
          navigate("/");
        }
      } catch (error) {
        dispatch(loginFailed());
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
          minWidth: "500px",
          borderRadius: "8px",
          minHeight: "400px",
          backgroundColor: "rgb(127 123 123 / 30%)",
        }}
      >
        <h2 style={{ color: "brown" }}> Sign In</h2>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleEmailCheck}
                required
                type="email"
                placeholder="Email"
              />
              <Form.Control.Feedback type="invalid">
                You fill out this field
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              style={{ marginTop: "18px" }}
              as={Col}
              md="12"
              controlId="validationCustom02"
            >
              <Form.Label type="password">Password</Form.Label>
              <Form.Control
                required
                onChange={handlePwdCheck}
                type="password"
                placeholder="Password"
              />

              <Form.Control.Feedback type="invalid">
                Please fill out this field
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          {isAuth === false && (
            <span style={{ color: "red", fontSize: "18px" }}>
              Please check email or password again!!!
            </span>
          )}

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
            Log In
          </Button>
          <div style={{ display: "flex", margin: "18px 0" }}>
            <a
              href="/reset-password"
              style={{
                backgroundColor: "transparent",
                flex: 1,
                display: "block",
                textAlign: "center",
                color: "yellow",
                fontSize: "22px",
                textDecoration: "underline",
                fontWeight: "800",
              }}
            >
              Forget Password
            </a>
            <a
              href="/sign-up"
              style={{
                backgroundColor: "transparent",
                flex: 1,
                display: "block",
                textAlign: "center",
                color: "yellow",
                fontSize: "22px",
                textDecoration: "underline",
                fontWeight: "800",
              }}
            >
              Sign Up
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignInPage;
