import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { Facebook, Instagram, TwitterX } from "react-bootstrap-icons";
import { request } from "../utils/request";
import { Form } from "react-bootstrap";
import CustomInput from "../common/CustomInput";

const UserProfile = () => {
  const userId = parseInt(localStorage.getItem("user_token"));
  const [CurrentUser, setCurrentUser] = useState({
    user_DOB: "",
    user_gmail: "",
    user_id: 0,
    user_name: "",
    user_phone: "",
    user_address: "",
  });
  const [IsEmptyDOB, setEmptyDOB] = useState(false);

  const [updateSucess, setUpdateSucess] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [invalidAge, setinvalidAge] = useState();
  const [existedEmail, setExistedEmail] = useState();
  const [validePhone, setValidPhone] = useState(true);

  const isValidEmail = (email) => {
    // Biểu thức chính quy để kiểm tra email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleAgeValidition = (DOB) => {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    if (DOB > eighteenYearsAgo) {
      console.log("dưới 18 tủi");
      setinvalidAge(true);
    } else {
      setinvalidAge(false);
      console.log("đã trên 18 tủi");
    }
  };
  function validatePhoneField(phoneNumberField) {
    // Get the phone number value
    const { value } = phoneNumberField.target;
    console.log(value);

    // Check if the phone number matches the regular expression
    if (value.length !== 10) {
      console.log("invalid phone");
      setValidPhone(false);
    } else setValidPhone(true);
  }
  // Xử lý khi rời khỏi trường nhập email
  const handleEmailBlur = (e) => {
    const { value } = e.target;
    if (isValidEmail(value)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };
  const handleDateChange = (date) => {
    setCurrentUser((prevInfo) => ({
      ...prevInfo,
      user_DOB: date ? date : false, // Set DOB field in formData to the selected date
    }));
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
      !CurrentUser.user_DOB ||
      !validePhone
    ) {
      setUpdateSucess(false);
    } else
      try {
        const res = await request.put("/profile", CurrentUser);
        if (res.data === "existed email") {
          setExistedEmail(true);
        } else {
          setUpdateSucess(true);
          setExistedEmail(false);
          setTimeout(() => setUpdateSucess(false), 3000);
        }
      } catch (error) {
        console.error("Error:", error);
        setUpdateSucess(false);
      }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "url(https://res.cloudinary.com/dyapfszsy/image/upload/v1715616726/bar_website/ookxwarmikb9airaaufq.jpg) right/100%",
      }}
    >
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
                            selected={CurrentUser.user_DOB}
                            onChange={(e) => {
                              if (e === null) {
                                setEmptyDOB(true);
                                handleDateChange(e);
                                handleAgeValidition(e);
                              } else {
                                setEmptyDOB(false);
                                handleDateChange(e);
                                handleAgeValidition(e);
                              }
                            }}
                            required
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            showIcon
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={50}
                            showMonthDropdown
                            customInput={<CustomInput />}
                            placeholderText="Date Of Birth"
                          />
                          {invalidAge && (
                            <span style={{ color: "red" }}>
                              You must be at least 18 years old
                            </span>
                          )}
                          {IsEmptyDOB && (
                            <span style={{ color: "#dc3545" }}>
                              Enter your DOB
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
                          {!validEmail && (
                            <span style={{ color: "red" }}>Invalid email</span>
                          )}
                          {existedEmail && (
                            <span style={{ color: "red" }}>Existed Email</span>
                          )}
                        </Col>
                        <Col className="mb-3">
                          <h6>Phone</h6>
                          <input
                            maxLength={10}
                            minLength={10}
                            className="form-control"
                            value={CurrentUser.user_phone}
                            onChange={(e) => {
                              setCurrentUser((prev) => ({
                                ...prev,
                                user_phone: e.target.value,
                              }));
                            }}
                            onBlur={validatePhoneField}
                            required
                          />
                          {!validePhone && (
                            <span style={{ color: "red" }}>
                              Must be 10 digits
                            </span>
                          )}
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
