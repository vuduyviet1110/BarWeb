import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { giftCards as initialGiftCards } from "../Fakeapi";
function ManageUser() {
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
    <div
      style={{
        margin: "16px",
      }}
    >
      <h2
        style={{
          backgroundColor: "rgb(255, 255, 255,0.9)",
          display: "inline-block",
          borderRadius: "8px",
          color: "rgb(197, 157, 87)",
          boxShadow: "-20px 2px 30px 8px",
          margin: "16px",
        }}
      >
        View All User Accounts
      </h2>

      <div>
        <Row lg={4}>
          {giftcards.map((order, index) => (
            <Col key={index}>
              <h4
                style={{
                  backgroundColor: "rgb(255, 255, 255,0.9)",
                  display: "inline-block",
                  borderRadius: "8px",
                  padding: "6px",
                  color: "rgb(197, 157, 87)",
                  boxShadow: "-20px 2px 30px 8px",
                }}
              >
                Order: {order.orderId}
              </h4>
              <div></div>
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
    </div>
  );
}

export default ManageUser;
