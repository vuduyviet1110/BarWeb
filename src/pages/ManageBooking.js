import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { request } from "../utils/request";
import Pagination from "../common/pagination";
import {
  isAllFieldFilled,
  isValidDate,
  isValidEmail,
  isValidPhoneNumber,
  isvalidTime,
} from "../common/validattion";
import { setupdateBookingPage, setTotalBookingPage } from "../redux/pageSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomeModal from "../common/modal";
function ManageBooking() {
  const [newReservation, setNewReservation] = useState();
  const [modalState, setModalState] = useState({
    showAdd: false,
    showDelete: false,
    showUpdate: false,
    showconfirmDelete: false,
    body: "",
    title: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [currentReservationId, setcurrReservationId] = useState(0);

  const dispatch = useDispatch();

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
  const { currentBookingPage, totalBookingPages } = useSelector(
    (state) => state.page
  );
  const validateFields = useCallback((reservation) => {
    const errors = {};

    // Validate for guest
    if (reservation.user_id === 1) {
      if (!isValidEmail(reservation.guest_gmail))
        errors.guest_gmail = "Invalid email";
      if (!isValidPhoneNumber(reservation.guest_phone))
        errors.guest_phone = "Invalid phone number";
    }
    // Validate for user
    else {
      if (!isValidEmail(reservation.user_gmail))
        errors.user_gmail = "Invalid email";
      if (!isValidPhoneNumber(reservation.user_phone))
        errors.user_phone = "Invalid phone number";
    }

    // Validate for common fields
    if (!isvalidTime(reservation.table_time))
      errors.table_time = "Invalid time format";
    if (!isValidDate(reservation.table_date))
      errors.table_date = "Invalid date format";
    if (!isAllFieldFilled(reservation))
      errors.emptyField = "Please fill in all fields";

    return errors;
  }, []);

  const showToastSuccess = (type, title, message) => {
    const showToastState = {
      [type]: true,
      title: title || "",
      body: message || "",
    };
    setModalState((prevState) => ({ ...prevState, ...showToastState }));
  };

  const fetchReservations = useCallback(async () => {
    try {
      const res = await request.get(
        `/admin/reservation?page=${currentBookingPage}`
      );
      dispatch(setTotalBookingPage(res.data.pagination.totalPages));

      setReservations(res.data.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  }, [currentBookingPage, dispatch]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleRemoveReservation = useCallback(
    async (reservation_id) => {
      try {
        await request.delete("/admin/reservation", {
          data: { reservation_id },
        });
        showToastSuccess(
          "showDelete",
          "Delete reservation?",
          "Reservation has been deleted successfully"
        );
        fetchReservations();
      } catch (error) {
        console.error("Error removing reservation :", error);
      }
    },
    [fetchReservations]
  );
  const handleEditReservation = useCallback(
    async (reservationId) => {
      const MatchedReservation = reservations.find(
        (reservation) => reservation.reservation_id === reservationId
      );
      const errors = validateFields(MatchedReservation);

      if (Object.keys(errors).length === 0) {
        try {
          await request.put("/admin/reservation", {
            MatchedReservation,
          });
          showToastSuccess(
            "showUpdate",
            "Update reservation?",
            "Reservation updated successfully"
          );
          fetchReservations();
          setValidationErrors("");
        } catch (error) {
          console.error(error);
          setValidationErrors(errors);
        }
      } else {
        setcurrReservationId(reservationId);
        setValidationErrors(errors);
      }
    },
    [fetchReservations, reservations, validateFields]
  );

  const handleInputChange = useCallback((event, reservationId) => {
    const { name, value } = event.target;
    // Update a copy of the reservations array
    setReservations((prev) =>
      prev.map((res) =>
        res.reservation_id === reservationId ? { ...res, [name]: value } : res
      )
    );
  }, []);
  console.log(validationErrors);
  const handleExistedAcc = () => {
    const updatedBooking = [
      ...reservations,
      {
        user_name: "",
        user_phone: "",
        user_gmail: "",
        table_time: "",
        table_date: "",
        number_people: "",
        message: "",
        account_status: true, // Set account_status thành true
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

    const errors = validateFields(MatchedRes);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await request.post("/admin/reservation", {
          newReservation,
        });
        if (res.data) {
          fetchReservations();
          showToastSuccess(
            "showAdd",
            "Add reservation?",
            "reservation has been added successfully"
          );
        }
      } catch (error) {
        console.error(error);
        setValidationErrors(errors);
      }
      setcurrReservationId(resID);
    } else {
      setcurrReservationId(resID);
      setValidationErrors(errors);
    }
  };

  const handlePageChange = async (page) => {
    console.log(page);
    dispatch(setupdateBookingPage(page));
  };

  return (
    <Container
      style={{
        borderRadius: "10px",
        color: "rgb(161, 158, 158)",
        paddingLeft: "10px",
        margin: "0 0 0 16px",
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
              <h4>Reservation: {reservation.reservation_id}</h4>
              {reservation.user_id === 1 ? (
                <div style={{ color: "green" }}>Guest booking 🙋‍♂️</div>
              ) : (
                <div style={{ color: "gold" }}>
                  {reservation.user_id !== undefined ? (
                    <span>Existed account booking👨 </span>
                  ) : (
                    <span>???</span>
                  )}
                </div>
              )}
              <Form.Group>
                <Form.Label>
                  Name <strong style={{ color: "red" }}>(Fixed)</strong>
                </Form.Label>
                <Form.Control
                  style={{ margin: "0 0 16px 0" }}
                  type="text"
                  placeholder="John"
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
                  style={{ margin: "0 0 16px 0" }}
                  type="text"
                  placeholder="0123456789"
                  name={
                    reservation.user_id === 1 ? "guest_phone" : "user_phone"
                  }
                  onChange={(event) => {
                    isValidPhoneNumber(event.target.value);
                    handleInputChange(event, reservation.reservation_id);
                  }}
                  value={
                    reservation.user_id === 1
                      ? reservation.guest_phone
                      : reservation.user_phone
                  }
                />

                {(validationErrors.guest_phone ||
                  validationErrors.user_phone) &&
                  reservation.reservation_id === currentReservationId && (
                    <span style={{ color: "red" }}>invalid phone number</span>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Date </Form.Label>
                <Form.Control
                  style={{ margin: "0 0 16px 0" }}
                  type="text"
                  placeholder="2022-03-02 (YYYY-MM-DD)"
                  name="table_date"
                  onChange={(event) => {
                    handleInputChange(event, reservation.reservation_id);
                  }}
                  value={reservation.table_date}
                />
                {validationErrors.table_date &&
                  reservation.reservation_id === currentReservationId && (
                    <span style={{ color: "red" }}>Invalid date format</span>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control
                  style={{ margin: "0 0 16px 0" }}
                  type="text"
                  name="table_time"
                  placeholder="02:30:00 (HH:MM:SS)"
                  onChange={(event) => {
                    handleInputChange(event, reservation.reservation_id);
                  }}
                  value={reservation.table_time}
                />
                {validationErrors.table_time &&
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
                  placeholder="john@gmail.com"
                  onChange={(event) => {
                    handleInputChange(event, reservation.reservation_id);
                  }}
                  value={
                    reservation.user_id === 1
                      ? reservation.guest_gmail
                      : reservation.user_gmail
                  }
                />
                {(validationErrors.user_gmail || validationErrors.user_gmail) &&
                  reservation.reservation_id === currentReservationId && (
                    <h5 style={{ color: "red" }}>Invalid email!</h5>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>N.o ppl</Form.Label>
                <Form.Control
                  style={{ margin: "0 0 16px 0" }}
                  type="text"
                  name="number_people"
                  placeholder="10"
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      handleInputChange(e, reservation.reservation_id);
                    }
                  }}
                  value={reservation.number_people}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Message (optional)</Form.Label>
                <Form.Control
                  style={{ margin: "0 0 16px 0" }}
                  type="text"
                  name="message"
                  placeholder="Hello"
                  onChange={(event) =>
                    handleInputChange(event, reservation.reservation_id)
                  }
                  value={reservation.message}
                />
              </Form.Group>

              {reservation.reservation_id === currentReservationId &&
                validationErrors.emptyField && (
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
                    onClick={() => {
                      showToastSuccess(
                        "showconfirmDelete",
                        "Delete gift card?",
                        "Deleted successfully"
                      );
                      setcurrReservationId(reservation.reservation_id);
                    }}
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
                      margin: "8px",
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
                      setValidationErrors();
                    }}
                  >
                    Cancel
                  </Button>
                )}
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
        onClick={handleExistedAcc}
      >
        + Add Reservation
      </Button>
      {reservations.length === 0 && (
        <Container
          style={{
            borderRadius: "10px",
            color: "rgb(161, 158, 158)",
            paddingLeft: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>(No Reservations)</h2>
        </Container>
      )}
      <Pagination
        currentPage={currentBookingPage}
        totalPages={totalBookingPages}
        handlePageChange={handlePageChange}
      />

      <CustomeModal
        show={modalState.showconfirmDelete}
        onHide={() => setModalState({ showconfirmDelete: false })}
        title={modalState.title}
        body={modalState.body}
        onConfirm={() => handleRemoveReservation(currentReservationId)}
      />
      <CustomeModal
        show={modalState.showAdd}
        onHide={() => setModalState({ showAdd: false })}
        title={modalState.title}
        body={modalState.body}
      />
      <CustomeModal
        show={modalState.showUpdate}
        onHide={() => setModalState({ showUpdate: false })}
        title={modalState.title}
        body={modalState.body}
      />
      <CustomeModal
        show={modalState.showDelete}
        onHide={() => setModalState({ showDelete: false })}
        title={modalState.title}
        body={modalState.body}
      />
      <CustomeModal
        show={modalState.showAccStatus}
        onHide={() => setModalState({ showAccStatus: false })}
        title={modalState.title}
        body={modalState.body}
        onConfirm={() => handleExistedAcc()}
      />
    </Container>
  );
}

export default ManageBooking;
