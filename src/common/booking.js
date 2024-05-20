import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ReactDatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { request } from "../utils/request";
import CustomInput from "../common/CustomInput";

function BookingTable({ CurentUser }) {
  const [bookingInfo, setBookingInfo] = useState({
    user_id: 0,
    table_date: "",
    table_time: "",
    number_people: "",
    message: "",
  });
  const [validEmail, setValidEmail] = useState(true);
  const [validePhone, setValidPhone] = useState(true);
  useEffect(() => {
    // Kiểm tra xem CurentUser đã có giá trị chưa
    if (CurentUser && CurentUser.user_id > 0) {
      // Cập nhật bookingInfo với user_id từ CurentUser
      setBookingInfo((prev) => ({
        ...prev,
        user_id: CurentUser.user_id,
        user_gmail: CurentUser.user_gmail,
        user_phone: CurentUser.user_phone,
        user_name: CurentUser.user_name,
      }));
    } else {
      setBookingInfo((prev) => ({
        ...prev,
        user_id: 0,
      }));
    }
  }, [CurentUser, CurentUser.user_id]); // Sẽ chạy lại khi CurentUser thay đổi

  const isValidEmail = (email) => {
    // Biểu thức chính quy để kiểm tra email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  function validatePhoneField(phoneNumberField) {
    // Get the phone number value
    const { value } = phoneNumberField.target;

    // Check if the phone number matches the regular expression
    if (value.length !== 10) {
      console.log("invalid phone");
      setValidPhone(false);
    } else setValidPhone(true);
  }
  const handleEmailValidation = (e) => {
    const { value } = e.target;
    if (isValidEmail(value)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };
  const [bookingSucess, setBookingSucess] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false || bookingInfo.table_time === "") {
      setBookingSucess(false);
      setBookingInfo((prev) => ({ ...prev, table_time: 0 }));
    } else {
      const res = await request.post("/booking", bookingInfo);
      setBookingSucess(true);
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
                  value={
                    CurentUser.user_id > 0
                      ? CurentUser.user_name
                      : bookingInfo.user_name
                  }
                  required
                  onChange={(e) => {
                    if (CurentUser.user_id === undefined) {
                      setBookingInfo((prev) => ({
                        ...prev,
                        user_name: e.target.value,
                      }));
                    }
                  }}
                  placeholder="Your Name"
                />
              </Form.Group>
            </Col>
            <Col lg={4} md={6}>
              <Form.Group>
                <Form.Control
                  type="text"
                  value={
                    CurentUser && CurentUser.user_id > 0
                      ? CurentUser.user_gmail
                      : bookingInfo.user_gmail
                  }
                  required
                  id="email"
                  onChange={(e) => {
                    // Nếu user_id là 0 và CurentUser tồn tại
                    if (CurentUser && CurentUser.user_id === undefined) {
                      setBookingInfo((prev) => ({
                        ...prev,
                        user_gmail: e.target.value,
                      }));
                    }
                  }}
                  onBlur={(e) => handleEmailValidation(e)}
                  placeholder="Your Email (a@a.com)"
                />
                {!validEmail && (
                  <h5 style={{ color: "red" }}>Invalid Email!</h5>
                )}
              </Form.Group>
            </Col>
            <Col lg={4} md={6}>
              <Form.Group>
                <Form.Control
                  value={
                    CurentUser.user_id > 0
                      ? CurentUser.user_phone
                      : bookingInfo.user_phone
                  }
                  id="phone"
                  required
                  type="number"
                  placeholder="Your Phone"
                  onBlur={(e) => validatePhoneField(e)}
                  onChange={(e) => {
                    if (CurentUser.user_id === undefined) {
                      setBookingInfo((prev) => ({
                        ...prev,
                        user_phone: e.target.value,
                      }));
                    }
                  }}
                />
                {!validePhone && (
                  <span style={{ color: "red" }}>Must be 10 digits</span>
                )}
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
                  customInput={<CustomInput />}
                  showYearDropdown
                  isClearable
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  showMonthDropdown
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
              placeholder="Message (optional)"
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
