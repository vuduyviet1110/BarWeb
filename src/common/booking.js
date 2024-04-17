import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ReactDatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/request";
function BookingTable({ CurentUser }) {
  const [bookingInfo, setBookingInfo] = useState({
    user_id: 0,
    table_date: "",
    table_time: "",
    number_people: "",
    message: "",
  });

  useEffect(() => {
    // Kiểm tra xem CurentUser đã có giá trị chưa
    if (CurentUser && CurentUser.user_id) {
      // Cập nhật bookingInfo với user_id từ CurentUser
      setBookingInfo((prev) => ({
        ...prev,
        user_id: CurentUser.user_id,
      }));
    }
  }, [CurentUser]); // Sẽ chạy lại khi CurentUser thay đổi

  console.log(bookingInfo);
  const [bookingSucess, setBookingSucess] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false || bookingInfo.table_time === "") {
      setBookingSucess(false);
      setBookingInfo((prev) => ({ ...prev, table_time: 0 }));
    } else {
      if (
        CurentUser &&
        Object.keys(CurentUser).length !== 0 &&
        CurentUser.table_time !== 0
      ) {
        const res = await request.post("/booking", bookingInfo);
        if (res.data === "Incorrect Username and/or Password!") {
          // Handle incorrect username/password case
        } else {
          setBookingSucess(true);
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
                  selected={bookingInfo.table_date}
                  onChange={(date) =>
                    setBookingInfo((prev) => ({ ...prev, table_date: date }))
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
                    const value = e.target.value; // Giá trị được chọn từ dropdown
                    let timeValue = ""; // Biến để lưu giá trị thời gian sau khi chuyển đổi

                    // Kiểm tra nếu giá trị được chọn là '0' thì không cần chuyển đổi, vẫn giữ nguyên là '0'
                    if (value === "0") {
                      timeValue = "0";
                    } else {
                      // Chuyển đổi giá trị giờ sang định dạng 'hour'
                      const hour = parseInt(value); // Lấy giờ từ giá trị được chọn
                      const minute = value.includes(":") ? 30 : 0; // Kiểm tra nếu giá trị được chọn có phải là 'hour:30' không
                      const hourString = hour < 10 ? `0${hour}` : `${hour}`; // Định dạng lại giờ
                      const minuteString = minute === 0 ? "00" : "30"; // Định dạng lại phút

                      timeValue = `${hourString}:${minuteString}:00`; // Tạo giá trị thời gian mới
                    }

                    // Cập nhật giá trị của table_time trong bookingInfo
                    setBookingInfo((prev) => ({
                      ...prev,
                      table_time: timeValue,
                    }));
                  }}
                  aria-label="Default select example"
                  required
                >
                  <option value="0">Time</option>
                  <option value="18">18h</option>
                  <option value="18:30:00">18h30</option>
                  <option value="19">19h</option>
                  <option value="19:30:00">19h30</option>
                  <option value="20">20h</option>
                  <option value="20:30:00">20h30</option>
                  <option value="21">21h</option>
                  <option value="21:30:00">21h30</option>
                  <option value="22">22h</option>
                  <option value="22:30:00">22h30</option>
                  <option value="23">23h</option>
                  <option value="23:30:00">23h30</option>
                  <option value="00">24</option>
                  <option value="00:30:00">24h30</option>
                  <option value="1">1h</option>
                  <option value="01:30:00">1h30</option>
                </Form.Select>
                {bookingInfo.table_time === 0 && (
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
                        number_people: e.target.value,
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
            {bookingSucess && (
              <div style={{ color: "green" }}>
                Your booking request was sent. We will call back to confirm your
                reservation. Thank you!
              </div>
            )}
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
