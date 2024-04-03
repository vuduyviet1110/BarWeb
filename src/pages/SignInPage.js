import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import signIn from "../assets/images/Barava.jpg";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
const FakeUsers = [
  { email: "a@a", password: "password1" },
  { email: "b@b", password: "password2" },
  { email: "c@c", password: "password3" },
];
function SignInPage() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [isAuth, setIsAuth] = useState();
  const [CurentUser, setCurrentUser] = useState({ email: "1", password: "" });
  const navigate = useNavigate();
  const handleEmailCheck = (e) => {
    const matchedUsers = FakeUsers.filter(
      (user) => user.email === e.target.value
    );
    if (matchedUsers.length > 0) {
      setCurrentUser(matchedUsers[0]);
      // In ra người dùng nếu tìm thấy mật khẩu khớp
    }
  };
  const handlePwdCheck = (e) => {
    if (CurentUser.password === e.target.value) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (
      form.checkValidity() === true &&
      Object.keys(CurentUser).length > 0
    ) {
      console.log(CurentUser);
      event.preventDefault();
      event.stopPropagation();
      if (isAuth) {
        localStorage.setItem("user_token", true);
        dispatch(login(CurentUser));
        return navigate("/");
      }
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleEmailCheck}
                required
                type="text"
                placeholder="Email"
              />
              <Form.Control.Feedback>
                You have fill this field{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label type="password">Password</Form.Label>
              <Form.Control
                required
                onChange={handlePwdCheck}
                type="password"
                placeholder="Password"
              />
              <Form.Control.Feedback>
                You have fill this field
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          {isAuth === false && (
            <span style={{ color: "red", fontSize: "18px" }}>
              Please check email or password again!!!
            </span>
          )}
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
