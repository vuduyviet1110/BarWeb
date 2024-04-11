import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import signIn from "../assets/images/Barava.jpg";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { request } from "../utils/request";

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isAuth, setIsAuth] = useState();
  const [CurrentUser, setCurrentUser] = useState({
    email: "1",
    password: "",
    id: 0,
  });
  // ...
  const handleEmailCheck = (e) => {
    setCurrentUser((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePwdCheck = (e) => {
    setCurrentUser((prev) => ({ ...prev, password: e.target.value }));
  };

  useEffect(() => {
    if (CurrentUser.id !== 0) {
      setIsAuth(true);
      localStorage.setItem("user_token", CurrentUser.id);
      dispatch(login(CurrentUser));
      navigate(`/`);
    }
  }, [CurrentUser]);
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      const res = await request.post("/sign-in", CurrentUser);
      if (res.data === "Incorrect Username and/or Password!") {
        setIsAuth(false);
      } else {
        const id = res.data.data.user_id;
        setCookie("token", res.data.token, 1);
        setCurrentUser((prev) => ({ ...prev, id: id }));
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
          minHeight: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
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

            <Form.Group as={Col} md="12" controlId="validationCustom02">
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
