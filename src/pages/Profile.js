import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { Facebook, Instagram, TwitterX } from "react-bootstrap-icons";
const UserProfile = () => {
  const [selectedDate, setSelectedDate] = useState();
  const { user } = useSelector(selectUser);

  console.log(user);
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
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                  />
                  <h5 style={{ color: "red" }}>Marie Horwitz</h5>
                  <p style={{ color: "red" }}>Web Designer</p>
                </Col>
                <Col md={8}>
                  <Card.Body className="p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col className="mb-3">
                        <h6>Name</h6>
                        <p className="text-muted">{user.email}</p>
                        <Button
                          style={{
                            margin: "-6x 0 0 8px",
                            backgroundColor: "#b63635",
                            border: "none",
                            color: "#fff",
                            height: "30px",
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col className="mb-3">
                        <h6>Date Of Birth</h6>
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat="dd/MM/yyyy"
                          isClearable
                          placeholderText="Date Of Birth"
                        />
                        <Button
                          style={{
                            margin: "8px 0 0 0",
                            backgroundColor: "#b63635",
                            border: "none",
                            color: "#fff",
                            height: "30px",
                          }}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                    <Row className="pt-1">
                      <Col className="mb-3">
                        <h6>Email</h6>

                        <p className="text-muted">info@example.com</p>
                        <Button
                          style={{
                            margin: "-6x 0 0 8px",
                            backgroundColor: "#b63635",
                            border: "none",
                            color: "#fff",
                            height: "30px",
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col className="mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">123456789</p>
                        <Button
                          style={{
                            margin: "0x 0 0 8px",
                            backgroundColor: "#b63635",
                            border: "none",
                            color: "#fff",
                            height: "30px",
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-start">
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
