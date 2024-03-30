import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { reservations as initialReservations } from "../Fakeapi";
function ManageBooking() {
  const [reservations, setReservations] = useState(initialReservations);
  const [isEditing, setIsEditing] = useState(false);
  const handleRemoveReservation = (indexToRemove) => {
    const updatedReservations = [...reservations];
    updatedReservations.splice(indexToRemove, 1);
    setReservations(updatedReservations);
  };
  const handleEditReservation = (indexToRemove) => {
    setIsEditing(indexToRemove);
  };
  const handleAddReservation = () => {
    const newReservation = {
      id: "",
      name: "",
      phoneNo: "",
      email: "",
      time: new Date(),
      NoPpl: 0,
      DOB: new Date(),
    };

    setReservations([...reservations, newReservation]);
    setIsEditing(false);
  };
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
          {reservations.map((reservation, index) => (
            <Col key={index}>
              <h4>Reservation: {reservation.id}</h4>
              <Form.Label>Name</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={reservation.name}
              />
              <Form.Label>Phone</Form.Label>

              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={reservation.phoneNo}
              />
              <Form.Label>D.O.B</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={reservation.DOB}
              />
              <Form.Label>Date</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={reservation.time}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={reservation.email}
              />
              <Form.Label>N.o ppl</Form.Label>
              <Form.Control
                className="mt-3 mr-3"
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={reservation.NoPpl}
              />
              <div>
                <Button
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "none",
                    margin: "10px",
                  }}
                  onClick={() => handleEditReservation(index)}
                >
                  Edit
                </Button>
                <Button
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    border: "none",
                  }}
                  onClick={() => handleRemoveReservation(index)}
                >
                  Remove
                </Button>
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
    </Container>
  );
}

export default ManageBooking;
