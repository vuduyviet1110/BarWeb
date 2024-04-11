import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/request";
function BookingTable({ CurentUser }) {
  const [bookingInfo, setBookingInfo] = useState({
    ...CurentUser,
    date: "",
    time: "",
    people: "",
    message: "",
  });
  const [bookingSucess, setBookingSucess] = useState({});
  const navigate = useNavigate();
  console.log(CurentUser);
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false || bookingInfo.time === "") {
      //   setValidated(true);
      setBookingSucess(false);
      setBookingInfo((prev) => ({ ...prev, time: 0 }));
    } else {
      if (CurentUser !== "No Users have been found") {
        const res = await request.post("/booking", bookingInfo);
        if (res.data === "Incorrect Username and/or Password!") {
          // setIsAuth(false);
        } else {
          setBookingSucess(true);
          alert("Booking Successful");
        }
      } else {
        navigate("/sign-in");
      }
    }
  };
  return (
    <section id="book-a-table" className="book-a-table">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Reservation</h2>
          <p>Book a Table</p>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="php-email-form"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <Row>
            <Col lg={4} md={6}>
              <Form.Group style={{ margin: "0 0 16px 0" }}>
                <Form.Control
                  type="text"
                  value={CurentUser?.user_name}
                  required
                  placeholder="Your Name"
                  minLength={4}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter at least 4 characters.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={4} md={6}>
              <Form.Group>
                <Form.Control
                  type="email"
                  value={CurentUser.user_gmail}
                  required
                  id="email"
                  placeholder="Your Email"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={4} md={6}>
              <Form.Group>
                <Form.Control
                  type="text"
                  value={CurentUser?.user_phone}
                  id="phone"
                  required
                  placeholder="Your Phone"
                  minLength={4}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter at least 4 characters.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={4} md={6}>
              <Form.Group
                style={{
                  margin: " 0 0 14px 0 ",
                }}
              >
                <ReactDatePicker
                  selected={bookingInfo.date}
                  onChange={(date) =>
                    setBookingInfo((prev) => ({ ...prev, date: date }))
                  }
                  required
                  dateFormat="MMMM d, yyyy "
                  placeholderText="Choose a date "
                />
              </Form.Group>
            </Col>
            <Col lg={4} md={6}>
              <Form.Group
                style={{
                  margin: " 0 0 14px 0 ",
                }}
              >
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      setBookingInfo((prev) => ({
                        ...prev,
                        time: e.target.value,
                      }));
                    }
                  }}
                  aria-label="Default select example"
                  required
                >
                  <option value="0">Time</option>
                  <option value="18">18h</option>
                  <option value="18.5">18h30</option>
                  <option value="19">19h</option>
                  <option value="19.5">19h30</option>
                  <option value="20">20h</option>
                  <option value="20.5">20h30</option>
                  <option value="21">21h</option>
                  <option value="21.5">21h30</option>
                  <option value="22">22h</option>
                  <option value="22.5">22h30</option>
                  <option value="23">23h</option>
                  <option value="23.5">23h30</option>
                  <option value="24">24</option>
                  <option value="24.5">24h30</option>
                  <option value="1">1h</option>
                  <option value="1.5">1h30</option>
                </Form.Select>
                {bookingInfo.time === 0 && (
                  <div style={{ color: "red" }}>You must select a time</div>
                )}
              </Form.Group>
            </Col>
            <Col lg={4} md={6}>
              <Form.Group>
                <Form.Control
                  type="number"
                  required
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      setBookingInfo((prev) => ({
                        ...prev,
                        people: e.target.value,
                      }));
                    }
                  }}
                  placeholder="# of people"
                  min={1}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter at least 1 character.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Control
              as="textarea"
              name="message"
              rows="5"
              onChange={(e) =>
                setBookingInfo((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              placeholder="Message"
            />
          </Form.Group>
          <div className="mb-3">
            <div className="loading">Loading</div>
            <div className="error-message"></div>
            <div className="sent-message">
              Your booking request was sent. We will call back or send an Email
              to confirm your reservation. Thank you!
            </div>
          </div>
          <div className="text-center">
            <Button type="submit">Book a Table</Button>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default BookingTable;
