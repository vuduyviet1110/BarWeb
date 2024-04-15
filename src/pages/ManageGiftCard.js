import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { giftCards as initialGiftCards } from "../Fakeapi";
import { request } from "../utils/request";
function ManageGiftCard() {
  const [giftcards, setGiftCard] = useState(initialGiftCards);
  const handleRemoveReservation = (indexToRemove) => {
    const updatedReservations = [...giftcards];
    updatedReservations.splice(indexToRemove, 1);
    setGiftCard(updatedReservations);
  };
  const handleChange = (index, field, value) => {
    const updatedGiftcards = [...giftcards];
    updatedGiftcards[index][field] = value;
    setGiftCard(updatedGiftcards);
  };
  const handleUpdateReservation = async (indexToUpdate) => {
    try {
      const updatedReservation = giftcards[indexToUpdate];
      const res = await request.put("/admin/gift-card/", updatedReservation);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
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
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get("/admin/gift-card");
        setGiftCard(res.data);
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
        <h3>All GiftCards Order</h3>

        <Row lg={4}>
          {giftcards.map((order, index) => (
            <Col key={index}>
              <h4>
                Order: {order.card_order_id}
                <Button
                  style={{
                    backgroundColor: "rgb(169 43 43 / 80%)",
                    border: "none",
                  }}
                  onClick={() => handleRemoveReservation(index)}
                >
                  X
                </Button>
              </h4>
              <Form.Label>To</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                onChange={(e) =>
                  handleChange(index, "receiver_name", e.target.value)
                }
                value={order.receiver_name}
              />

              <Form.Label>From</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                onChange={(e) =>
                  handleChange(index, "receiver_name", e.target.value)
                }
                value={order.From}
              />
              <Form.Label>Message</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                onChange={(e) => handleChange(index, "message", e.target.value)}
                value={order.message}
              />
              <Form.Label>Recepient's Email</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                onChange={(e) =>
                  handleChange(index, "receiver_email", e.target.value)
                }
                value={order.receiver_mail}
              />
              <Form.Label>Recepient's Phone Number</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                onChange={(e) =>
                  handleChange(index, "receiver_phone", e.target.value)
                }
                value={order.receiver_phone}
              />
              <Form.Label>
                Amount(card_id - 1:10, 2:20, 3:50, 4:100 )
              </Form.Label>
              <Form.Control
                className="mt-3 mr-3"
                type="text"
                onChange={(e) => handleChange(index, "card_id", e.target.value)}
                value={order.card_id}
              />
              <div>
                <Button
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "none",
                    margin: "10px",
                  }}
                  onClick={() => handleUpdateReservation(index)}
                >
                  Update
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
        + Add GiftCard Order
      </Button>
    </Container>
  );
}

export default ManageGiftCard;
