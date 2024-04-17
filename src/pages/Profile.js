import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { Facebook, Instagram, TwitterX } from "react-bootstrap-icons";
import { request } from "../utils/request";
import { Form } from "react-bootstrap";

const UserProfile = () => {
  const userId = parseInt(localStorage.getItem("user_token"));
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [CurrentUser, setCurrentUser] = useState({
    user_DOB: "",
    user_gmail: "",
    user_id: 0,
    user_name: "",
    user_phone: "",
    user_address: "",
  });
  const [updateSucess, setUpdateSucess] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [invalidAge, setinvalidAge] = useState();

  const isValidEmail = (email) => {
    // Biểu thức chính quy để kiểm tra email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Xử lý khi rời khỏi trường nhập email
  const handleEmailBlur = (e) => {
    const { value } = e.target;
    if (isValidEmail(value)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };
  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchApi = async () => {
      try {
        const res = await request.get(`/${userId}`);
        setCurrentUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !validEmail ||
      invalidAge ||
      !CurrentUser.user_DOB
    ) {
      setUpdateSucess(false);
    } else
      try {
        const res = await request.put("/profile", CurrentUser);
        if (res.data) {
          setUpdateSucess(true);
        }
      } catch (error) {
        console.error("Error:", error);
        setUpdateSucess(false);
      }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col lg={6} mb={4} mb-lg={0}>
            <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
              <Row className="g-0">
                <Col
                  md={4}
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                  />
                  <h5 style={{ color: "red" }}>{CurrentUser.user_name}</h5>
                  <p style={{ color: "red" }}>Web Designer</p>
                </Col>
                <Col md={8}>
                  <Form onSubmit={handleUpdate}>
                    <Card.Body className="p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <Row className="pt-1">
                        <Col className="mb-3">
                          <h6>Name</h6>
                          <input
                            className="form-control"
                            value={CurrentUser.user_name}
                            onChange={(e) => {
                              setCurrentUser((prev) => ({
                                ...prev,
                                user_name: e.target.value,
                              }));
                            }}
                            required
                          />
                        </Col>
                        <Col className="mb-3">
                          <h6>Date Of Birth</h6>
                          <DatePicker
                            selected={CurrentUser.user_DOB} // Set selected date
                            onChange={(date) => {
                              setCurrentUser((prev) => ({
                                ...prev,
                                user_DOB: date, // Update user_DOB directly with the selected date
                              }));
                            }}
                            onBlur={() => {
                              if (
                                CurrentUser.user_DOB &&
                                CurrentUser.user_DOB.getFullYear() >=
                                  currentYear - 18
                              ) {
                                setinvalidAge(true);
                              } else {
                                setinvalidAge(false);
                              }
                            }}
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            placeholderText="Date Of Birth"
                            className="form-control"
                            required
                          />
                          {invalidAge && (
                            <span style={{ color: "red" }}>
                              You must be at least 18 years
                            </span>
                          )}
                        </Col>
                      </Row>
                      <Row className="pt-1">
                        <Col className="mb-3">
                          <h6>Email</h6>
                          <input
                            className="form-control"
                            value={CurrentUser.user_gmail}
                            onChange={(e) => {
                              setCurrentUser((prev) => ({
                                ...prev,
                                user_gmail: e.target.value,
                              }));
                            }}
                            onBlur={handleEmailBlur}
                            required
                          />
                          {!validEmail && <span>invalid email</span>}
                        </Col>
                        <Col className="mb-3">
                          <h6>Phone</h6>
                          <input
                            className="form-control"
                            value={CurrentUser.user_phone}
                            onChange={(e) => {
                              setCurrentUser((prev) => ({
                                ...prev,
                                user_phone: e.target.value,
                              }));
                            }}
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mb-3">
                          <h6>Address</h6>
                          <input
                            className="form-control"
                            value={CurrentUser.user_address}
                            onChange={(e) => {
                              setCurrentUser((prev) => ({
                                ...prev,
                                user_address: e.target.value,
                              }));
                            }}
                            required
                          />
                        </Col>
                      </Row>
                      {updateSucess === true && (
                        <div style={{ color: "green", fontSize: "18px" }}>
                          Update Sucessfully!!
                        </div>
                      )}
                      <Row className="pt-1">
                        <Button
                          type="submit"
                          style={{
                            backgroundColor: "#b63635",
                            border: "none",
                            color: "#fff",
                            height: "40px",
                          }}
                        >
                          Save
                        </Button>
                      </Row>

                      <div
                        className="d-flex justify-content-start"
                        style={{
                          margin: "16px 0 0 0 ",
                        }}
                      >
                        <a href="#!">
                          <Facebook className="fab fa-facebook-f fa-lg me-3" />
                        </a>
                        <a href="#!">
                          <TwitterX className="fab fa-twitter fa-lg me-3" />
                        </a>
                        <a href="#!">
                          <Instagram className="fab fa-instagram fa-lg" />
                        </a>
                      </div>
                    </Card.Body>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UserProfile;
