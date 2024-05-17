import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { request } from "../utils/request";
function ManageBooking() {
  const [newReservation, setNewReservation] = useState();
  const [showRemove, setShowRemove] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [existedAcc, setExistedAcc] = useState(false);
  const [currentReservationId, setcurrReservationId] = useState(0);
  const [showAccStatus, setShowAccStatus] = useState(false);
  const [isFieldCompleted, setIsFieldCompleted] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validePhone, setValidPhone] = useState(true);
  const [validDate, setIsValidDate] = useState(true);
  const [validTime, setIsValidTime] = useState(true);
  const [reservations, setReservations] = useState([
    {
      user_id: 0,
      user_name: "",
      guest_name: "",
      guest_gmail: "",
      guest_phone: "",
      user_phone: "",
      user_gmail: "",
      table_time: "",
      table_date: "",
      no_people: "",
      message: "",
    },
  ]);
  const isValidDate = (dateString) => {
    // Biểu thức chính quy để kiểm tra định dạng YYYY-MM-DD
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateString)) {
      return false;
    }
    // Kiểm tra xem ngày có hợp lệ không (ví dụ: 2024-02-30 là ngày không hợp lệ)
    const date = new Date(dateString);
    const [year, month, day] = dateString.split("-").map(Number);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };
  function validateTimeFormat(userInput) {
    // Regular expression for matching the format "HH:MM:SS"
    const timeFormatRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

    // Check if the input matches the regular expression
    const isValidFormat = timeFormatRegex.test(userInput);

    return isValidFormat;
  }
  const isValidEmail = (email) => {
    // Biểu thức chính quy để kiểm tra email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  function validatePhoneField(phoneNumberField) {
    // Get the phone number value
    const { value } = phoneNumberField.target;

    // Create a regular expression to match 10-digit numbers
    const phoneNumberRegex = /^\d{10}$/;

    // Check if the phone number matches the regular expression
    if (!phoneNumberRegex.test(value)) {
      console.log("Invalid phone number:", value);
      setValidPhone(false);
    } else {
      setValidPhone(true);
      console.log("Valid phone number:", value);
    }
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
  const handleRemoveReservation = async (reservation_id) => {
    try {
      const res = await request.delete("/admin/reservation", {
        data: { reservation_id },
      });
      setShowRemove(true);
      setTimeout(() => {
        setShowRemove(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
    console.log("số: ", reservation_id);
  };
  const handleEditReservation = async (reservationId) => {
    const MatchedReservation = reservations.find(
      (reservation) => reservation.reservation_id === reservationId
    );
    const isAnyFieldEmpty = Object.values(MatchedReservation).some(
      (value) => value === "" || value === 0
    );
    if (
      !isAnyFieldEmpty &&
      validEmail &&
      validePhone &&
      validDate &&
      validTime
    ) {
      try {
        const res = await request.put("/admin/reservation", {
          MatchedReservation,
        });
        setIsFieldCompleted(true);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    } else {
      setcurrReservationId(reservationId); // Set currentReservationId to highlight the item with missing fields
      if (isAnyFieldEmpty) {
        setIsFieldCompleted(false);
      } else {
        setIsFieldCompleted(true);
      }
    }

    console.log("matchedRes: ", MatchedReservation);
  };
  const handleInputChange = (event, reservationId) => {
    const { name, value } = event.target;
    // Update a copy of the reservations array
    const updatedReservations = reservations.map((reservation) => {
      // Nếu index trùng với reservationId, cập nhật trường tương ứng
      if (reservation.reservation_id === reservationId) {
        return {
          ...reservation,
          [name]: value, // Cập nhật giá trị trường tương ứng với tên
        };
      }
      return reservation; // Trả về phần tử không thay đổi cho các index khác
    });

    setReservations(updatedReservations);
  };
  const handleAddReservation = () => {
    setShowAccStatus(true);
  };
  const handleExistedAcc = () => {
    setExistedAcc(true);
    setShowAccStatus(false); // Ẩn modal sau khi chọn Existed Account
    const updatedBooking = [
      ...reservations,
      {
        user_name: "",
        user_phone: "",
        user_gmail: "",
        table_time: "",
        table_date: "",
        message: "",
        account_status: true, // Set account_status thành true
      },
    ];
    setReservations(updatedBooking);
  };
  useEffect(() => {
    console.log("existedAcc:", existedAcc);
  }, [existedAcc]);
  const handleGuestAcc = () => {
    setExistedAcc(false);
    setShowAccStatus(false); // Ẩn modal sau khi chọn Existed Account
    const updatedBooking = [
      ...reservations,
      {
        user_name: "",
        user_phone: "",
        user_gmail: "",
        table_time: "",
        table_date: "",
        message: "",
        account_status: false, // Set account_status thành true
      },
    ];
    setReservations(updatedBooking);
  };
  useEffect(() => {
    reservations.forEach((r) => {
      if (r.account_status === true || r.account_status === false) {
        setNewReservation(reservations[reservations.length - 1]);
      }
    });
  }, [reservations]);

  const handleAddNewReservationToDBS = async (resID) => {
    const MatchedRes = reservations.find((res) => res.reservation_id === resID);
    console.log(MatchedRes);
    const isAnyFieldEmpty = Object.values(MatchedRes).some(
      (value) => value === "" || value === null || value === undefined
    );
    console.log(!isAnyFieldEmpty, "vaf", validEmail, "vaf", validePhone);
    if (!isAnyFieldEmpty && validEmail && validePhone) {
      try {
        const res = await request.post("/admin/reservation", {
          newReservation,
        });
        console.log("all reservations:", reservations);
        console.log("New reservation:", newReservation);
        setIsFieldCompleted(true);
        setShowAdd(true);
        setTimeout(() => {
          setShowAdd(false);
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    } else {
      setcurrReservationId(resID); // Set currentReservationId to highlight the item with missing fields
      if (isAnyFieldEmpty) {
        setIsFieldCompleted(false);
      } else {
        setIsFieldCompleted(true);
        console.log(isAnyFieldEmpty);
      }
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get("/admin/reservation");
        setReservations(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <Container
      style={{
        borderRadius: "10px",
        color: "rgb(161, 158, 158)",
        paddingLeft: "10px",
        margin: "0 0 0 16px",
        backgroundColor: "rgb(0, 0, 0,0.6)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 className="mt-1 ">Bar Management</h1>
      <div>
        <h3>All Reservations</h3>
        <Row lg={4}>
          {reservations.map((reservation) => (
            <Col key={reservation.reservation_id}>
              {console.log(
                "currentId: ",
                currentReservationId,
                "reseId: ",
                reservation.resservation_id
              )}
              <h4>Reservation: {reservation.reservation_id}</h4>
              {reservation.user_id === 1 ? (
                <div style={{ color: "green" }}>Guest booking 🙋‍♂️</div>
              ) : (
                <div style={{ color: "gold" }}>
                  {reservation.user_id !== undefined ? (
                    <span>Existed account booking👨 </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              )}
              <Form.Group>
                <Form.Label>
                  Name <strong style={{ color: "red" }}>(Fixed)</strong>
                </Form.Label>
                <Form.Control
                  style={{ margin: "0 0 8px 0" }}
                  type="text"
                  name={reservation.user_id === 1 ? "guest_name" : "user_name"}
                  onChange={(event) =>
                    handleInputChange(event, reservation.reservation_id)
                  }
                  value={
                    reservation.user_id === 1
                      ? reservation.guest_name
                      : reservation.user_name
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Phone <strong style={{ color: "red" }}>(Fixed)</strong>
                </Form.Label>
                <Form.Control
                  style={{ margin: "0 0 8px 0" }}
                  type="text"
                  name={
                    reservation.user_id === 1 ? "guest_phone" : "user_phone"
                  }
                  onChange={(event) => {
                    validatePhoneField(event);
                    handleInputChange(event, reservation.reservation_id);
                  }}
                  value={
                    reservation.user_id === 1
                      ? reservation.guest_phone
                      : reservation.user_phone
                  }
                  onBlur={validatePhoneField}
                />
                {!validePhone &&
                  reservation.reservation_id === currentReservationId && (
                    <span style={{ color: "red" }}>invalid phone number</span>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Date (YYYY-MM-DD)</Form.Label>
                <Form.Control
                  style={{ margin: "0 0 8px 0" }}
                  type="text"
                  name="table_date"
                  onChange={(event) => {
                    handleInputChange(event, reservation.reservation_id);
                    setIsValidDate(isValidDate(event.target.value));
                  }}
                  onBlur={(e) => {
                    setIsValidDate(isValidDate(e.target.value));
                  }}
                  value={reservation.table_date}
                />
                {!validDate &&
                  reservation.reservation_id === currentReservationId && (
                    <span style={{ color: "red" }}>Invalid date format</span>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control
                  className="mt-3 mr-3"
                  type="text"
                  name="table_time"
                  placeholder="HH:MM:SS"
                  onChange={(event) => {
                    handleInputChange(event, reservation.reservation_id);
                    setIsValidTime(validateTimeFormat(event.target.value));
                  }}
                  value={reservation.table_time}
                />
                {console.log(validTime)}
                {validTime === false &&
                  reservation.reservation_id === currentReservationId && (
                    <span style={{ color: "red" }}>Invalid time format</span>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Email <strong style={{ color: "red" }}>(Fixed)</strong>
                </Form.Label>
                <Form.Control
                  style={{ margin: "0 0 8px 0" }}
                  type="text"
                  name="user_gmail"
                  onChange={(event) => {
                    handleInputChange(event, reservation.reservation_id);
                    handleEmailBlur(event);
                  }}
                  value={
                    reservation.user_id === 1
                      ? reservation.guest_gmail
                      : reservation.user_gmail
                  }
                />
                {!validEmail &&
                  reservation.reservation_id === currentReservationId && (
                    <h5 style={{ color: "red" }}>Invalid email!</h5>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>N.o ppl</Form.Label>
                <Form.Control
                  className="mt-3 mr-3"
                  type="text"
                  name="number_people"
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      handleInputChange(e, reservation.reservation_id);
                    }
                  }}
                  value={reservation.number_people}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  className="mt-3 mr-3"
                  type="text"
                  name="message"
                  onChange={(event) =>
                    handleInputChange(event, reservation.reservation_id)
                  }
                  value={reservation.message}
                />
              </Form.Group>
              {reservation.reservation_id === currentReservationId &&
                isFieldCompleted === false && (
                  <div style={{ color: "red", fontSize: "18px" }}>
                    You need to complete all the field
                  </div>
                )}
              <div>
                {reservation.account_status === undefined && (
                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                      margin: "10px",
                    }}
                    onClick={() =>
                      handleEditReservation(reservation.reservation_id)
                    }
                  >
                    Update
                  </Button>
                )}
                {reservation.account_status === undefined && (
                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      border: "none",
                    }}
                    onClick={() =>
                      handleRemoveReservation(reservation.reservation_id)
                    }
                  >
                    Remove
                  </Button>
                )}

                {(reservation.account_status === false ||
                  reservation.account_status === true) && (
                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      border: "none",
                      margin: "0 0 0 8px",
                    }}
                    onClick={() =>
                      handleAddNewReservationToDBS(reservation.reservation_id)
                    }
                  >
                    Add New
                  </Button>
                )}
                {(reservation.account_status === false ||
                  reservation.account_status === true) && (
                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      border: "none",
                      margin: "0 0 0 8px",
                    }}
                    onClick={() => {
                      const updatedRes = reservations.slice(0, -1); // Tạo một bản sao mới của mảng mà không bao gồm phần tử cuối cùng
                      setReservations(updatedRes);
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ color: "green" }}>
                      Successfully Added!!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    You have successfully Add new Reservation
                    {reservation.reservation_id}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowAdd(false)}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={show} onHide={() => setShow(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ color: "green" }}>
                      Successfully Updated!!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    You have successfully updated Ca
                    {reservation.reservation_id}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={showRemove} onHide={() => setShowRemove(false)}>
                  <Modal.Header>
                    <Modal.Title style={{ color: "red" }}>
                      Removed Successfully!!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    You have successfully Remove this booking. Please reload the
                    page to see the change!!!
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowRemove(false)}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Button
        style={{
          backgroundColor: "rgb(169 43 43 / 80%)",
          border: "none",
          margin: "8px",
          width: "20%",
        }}
        onClick={handleAddReservation}
      >
        + Add Reservation
      </Button>
      <Modal show={showAccStatus} onHide={() => setShowAccStatus(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>
            Is this user you want to add an giftcard order already have an
            account ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Existed Account or Guest?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleExistedAcc}>
            Existed Account
          </Button>
          <Button variant="secondary" onClick={handleGuestAcc}>
            Guest
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageBooking;
