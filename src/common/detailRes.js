import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { request } from "../utils/request";

import {
  isAllFieldFilled,
  isValidDate,
  isValidEmail,
  isValidPhoneNumber,
  isvalidTime,
} from "../common/validattion";
import { useCallback } from "react";
import CustomeModal from "../common/modal";
function DetailReservation({ result, id, field }) {
  const [modalState, setModalState] = useState({
    showAdd: false,
    showDelete: false,
    showUpdate: false,
    showconfirmDelete: false,
    showAccStatus: false,
    body: "",
    title: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [reservation, setReservation] = useState(result.reservation);
  const showToastSuccess = (reservation, title, message) => {
    const showToastState = {
      [reservation]: true,
      title: title || "",
      body: message || "",
    };
    setModalState((prevState) => ({ ...prevState, ...showToastState }));
  };

  const handleCloseModal = () =>
    setModalState({
      showAdd: false,
      showUpdate: false,
      showDelete: false,
      toastMessage: "",
    });

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

  const handleRemovereservation = useCallback(async (reservationId) => {
    try {
      await request.delete("/admin/reservation", {
        data: { reservationId: reservationId },
      });
      showToastSuccess(
        "showDelete",
        "Delete reservation card?",
        "reservation card deleted successfully"
      );
    } catch (error) {
      console.error("Error removing reservation card:", error);
    }
  }, []);

  const handleUpdatereservation = useCallback(async () => {
    const errors = validateFields(reservation);

    if (Object.keys(errors).length === 0) {
      try {
        await request.put("/admin/reservation", {
          MatchedReservation: reservation,
        });
        showToastSuccess(
          "showUpdate",
          "Update reservation card?",
          "reservation card updated successfully"
        );
        setValidationErrors("");
      } catch (err) {
        console.error("Error updating reservation card:", err);
        setValidationErrors(errors);
      }
    } else {
      setValidationErrors(errors);
    }
  }, [validateFields, reservation]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setReservation({ ...reservation, [name]: value });
    },
    [reservation]
  );
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="mt-4" style={{ flex: 1 }}>
          Bar Management
        </h1>
      </div>
      <div>
        <h4 style={{ textAlign: "center" }}>
          {field.toUpperCase()}: {reservation.reservation_id}
        </h4>
        <Row lg={2}>
          <Col className="d-flex flex-column gap-3">
            <div>
              <Form.Label>
                Name <strong style={{ color: "red" }}>(Fixed)</strong>
              </Form.Label>
              <Form.Control
                name="user_name"
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={reservation.user_name}
              />
            </div>
            <div>
              <Form.Label>
                Phone
                <strong style={{ color: "red" }}>(*) (Fixed)</strong>
              </Form.Label>
              <Form.Control
                name="user_phone"
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={reservation.user_phone}
              />
              {validationErrors.user_phone ? (
                <div style={{ color: "red", fontSize: "14px" }}>
                  Invalid phone number
                </div>
              ) : (
                <div style={{ color: "red", fontSize: "14px" }}> </div>
              )}
            </div>
            <div>
              <Form.Label>Date</Form.Label>
              <Form.Control
                name="table_date"
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={reservation.table_date}
              />
              {validationErrors.table_date ? (
                <div style={{ color: "red", fontSize: "14px" }}>
                  Invalid date format!
                </div>
              ) : (
                <div style={{ color: "red", fontSize: "14px" }}> </div>
              )}
            </div>
            <div>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                name="table_time"
                onChange={(e) => handleInputChange(e)}
                value={reservation.table_time}
              />
              {validationErrors.table_time ? (
                <div style={{ color: "red", fontSize: "14px" }}>
                  Invalid time format!
                </div>
              ) : (
                <div style={{ color: "red", fontSize: "14px" }}> </div>
              )}
            </div>
          </Col>
          <Col className="d-flex flex-column gap-3">
            <div>
              <Form.Label>
                Email <strong style={{ color: "red" }}>(Fixed) </strong>
              </Form.Label>

              <Form.Control
                required
                name="user_gmail"
                onChange={(e) => handleInputChange(e)}
                value={reservation.user_gmail}
              />
              {validationErrors.user_gmail ? (
                <div style={{ color: "red", fontSize: "14px" }}>
                  Invalid email !
                </div>
              ) : (
                <div style={{ color: "red", fontSize: "14px" }}> </div>
              )}
            </div>
            <div>
              <Form.Label>No ppl</Form.Label>
              <Form.Control
                name="number_people"
                type="number"
                placeholder="Number of people"
                onChange={(e) => handleInputChange(e)}
                value={reservation.number_people}
              />
            </div>
            <div>
              <Form.Label>Message</Form.Label>
              <Form.Control
                required
                type="text"
                name="message"
                onChange={(e) => handleInputChange(e)}
                value={reservation.message}
              />
            </div>
          </Col>
          {validationErrors.emptyField ? (
            <div style={{ color: "red", fontSize: "14px" }}>
              Fill all required fields
            </div>
          ) : (
            <div style={{ color: "red", fontSize: "14px" }}> </div>
          )}
        </Row>
        <Button
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "none",
            margin: "16px 8px 0 0 ",
            color: "white",
          }}
          onClick={() => handleUpdatereservation()}
        >
          Update
        </Button>
        <Button
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "none",
            margin: "16px 8px 0 0 ",
            color: "white",
          }}
          onClick={() => {
            showToastSuccess(
              "showconfirmDelete",
              "Delete reservation card?",
              "Deleted successfully"
            );
          }}
        >
          Remove
        </Button>
      </div>
      <CustomeModal
        show={modalState.showconfirmDelete}
        onHide={() => setModalState({ showconfirmDelete: false })}
        title={modalState.title}
        body={modalState.body}
        onConfirm={() => handleRemovereservation(reservation.reservation_id)}
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
    </Container>
  );
}

export default DetailReservation;
