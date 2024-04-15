import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { request } from "../utils/request";
function ManageBooking() {
  const [reservations, setReservations] = useState([
    {
      user_id: 0,
      user_name: "",
      user_phone: "",
      user_gmail: "",
      table_time: "",
      no_people: "",
      message: "",
    },
  ]);
  const handleRemoveReservation = (indexToRemove) => {
    const updatedReservations = [...reservations];
    updatedReservations.splice(indexToRemove, 1);
    setReservations(updatedReservations);
  };
  const handleEditReservation = (indexToRemove) => {};
  const handleInputChange = (event, index) => {
    // Destructure the target reservation for clarity
    const { target } = event;
    const { name, value } = target; // Get name and value from the event

    // Update a copy of the reservations array
    const updatedReservations = [...reservations];
    updatedReservations[index] = {
      ...updatedReservations[index],
      [name]: value, // Update specific property based on name
    };

    setReservations(updatedReservations);
  };
  const handleAddReservation = () => {
    const newReservation = {
      user_id: 0,
      user_name: "",
      user_phone: "",
      user_gmail: "",
      table_time: new Date(),
      No_people: 0,
      message: "",
    };

    setReservations([...reservations, newReservation]);
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
          {reservations.map((reservation, index) => (
            <Col key={index}>
              <h4>Reservation: {reservation.id}</h4>
              <Form.Group>
                <Form.Label>{reservation.user_name}</Form.Label>
                <Form.Control
                  style={{ margin: "0 0 8px 0" }}
                  type="text"
                  name="user_name"
                  onChange={(event) => handleInputChange(event, index)}
                  value={reservation.user_name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>phone</Form.Label>
                <Form.Control
                  style={{ margin: "0 0 8px 0" }}
                  type="text"
                  name="user_phone"
                  onChange={(event) => handleInputChange(event, index)}
                  value={reservation.user_phone}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  style={{ margin: "0 0 8px 0" }}
                  type="text"
                  name="table_date"
                  onChange={(event) => handleInputChange(event, index)}
                  value={reservation.table_time}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  style={{ margin: "0 0 8px 0" }}
                  type="text"
                  name="user_gmail"
                  onChange={(event) => handleInputChange(event, index)}
                  value={reservation.user_gmail}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>N.o ppl</Form.Label>
                <Form.Control
                  className="mt-3 mr-3"
                  type="text"
                  name="no_people"
                  onChange={(event) => handleInputChange(event, index)}
                  value={reservation.number_people}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  className="mt-3 mr-3"
                  type="text"
                  name="message"
                  onChange={(event) => handleInputChange(event, index)}
                  value={reservation.message}
                />
              </Form.Group>

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
