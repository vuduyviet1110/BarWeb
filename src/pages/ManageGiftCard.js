import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { giftCards as initialGiftCards } from "../Fakeapi";
function ManageGiftCard() {
  const [giftcards, setGiftCard] = useState(initialGiftCards);
  const [isEditing, setIsEditing] = useState(false);
  const handleRemoveReservation = (indexToRemove) => {
    const updatedReservations = [...giftcards];
    updatedReservations.splice(indexToRemove, 1);
    setGiftCard(updatedReservations);
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

    setGiftCard([...giftcards, newReservation]);
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
        <h3>All GiftCards Order</h3>
        <Row lg={4}>
          {giftcards.map((order, index) => (
            <Col key={index}>
              <h4>Order: {order.orderId}</h4>
              <Form.Label>To</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={order.To}
              />

              <Form.Label>From</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={order.From}
              />
              <Form.Label>Message</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={order.Message}
              />
              <Form.Label>Recepient's Email</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={order.RecipentEmail}
              />
              <Form.Label>Recepient's Phone Number</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={order.RecipentPhoneNo}
              />
              <Form.Label>Amount</Form.Label>
              <Form.Control
                className="mt-3 mr-3"
                type="text"
                readOnly={isEditing === index ? false : true}
                onChange={(e) => {}}
                value={order.Amount}
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
      {/* <Button
        style={{
          backgroundColor: "rgb(169 43 43 / 80%)",
          border: "none",
          margin: "8px",
          width: "20%",
        }}
        onClick={handleAddReservation}
      >
        + Add GiftCard Order
      </Button> */}
    </Container>
  );
}

export default ManageGiftCard;
