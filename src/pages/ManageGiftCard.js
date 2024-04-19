import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { request } from "../utils/request";
function ManageGiftCard() {
  const [show, setShow] = useState(false);
  const [showAccStatus, setShowAccStatus] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [existedAcc, setExistedAcc] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState("false");
  const [currentOrderId, setcurrentOrderId] = useState(0);
  const [giftcards, setGiftCard] = useState([
    {
      card_id: "",
      card_order_id: "",
      card_status_id: "",
      message: "",
      payment_method: "",
      receiver_address: "",
      receiver_mail: "",
      receiver_name: "",
      receiver_phone: "",
      user_id: "",
    },
  ]);

  const handleRemoveReservation = async (giftCardId) => {
    try {
      const res = await request.delete("/admin/gift-card", {
        data: { giftCardId },
      });
      setShowRemove(true);
      setTimeout(() => {
        setShowRemove(false);
      }, 3000);
      if (res.data === `Deleted: ${giftCardId} `) {
      }
    } catch (error) {
      console.error(error);
    }
    console.log("số: ", giftCardId);
  };
  const handleUpdateGiftcard = async (giftcardId) => {
    const MatchedGiftCard = giftcards.find(
      (giftcard) => giftcard.card_order_id === giftcardId
    );
    const isAnyFieldEmpty = Object.values(MatchedGiftCard).some(
      (value) => value === "" || value === 0
    );
    if (!isAnyFieldEmpty) {
      try {
        const res = await request.put("/admin/gift-card", {
          MatchedGiftCard,
        });
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 3000);
        setUpdateSuccess(true);
        setcurrentOrderId(0); // Reset currentOrderId
      } catch (error) {
        console.error(error);
      }
    } else {
      setUpdateSuccess(false);
      setcurrentOrderId(giftcardId); // Set currentOrderId to highlight the item with missing fields
      console.log(updateSuccess);
    }
    console.log("matchedRes: ", MatchedGiftCard);
  };

  const handleInputChange = (e, giftcardId) => {
    const { name, value } = e.target;
    // Update a copy of the reservations array
    const updatedGiftCard = giftcards.map((giftcard) => {
      // Nếu card_order_id trùng với giftcardId, cập nhật trường tương ứng
      if (giftcard.card_order_id === giftcardId) {
        return {
          ...giftcard,
          [name]: value, // Cập nhật giá trị trường tương ứng với tên
        };
      }
      return giftcard; // Trả về phần tử không thay đổi cho các card_order_id khác
    });

    setGiftCard(updatedGiftCard);
  };
  const handleExistedAcc = () => {
    setExistedAcc(true);
    setShowAccStatus(false); // Ẩn modal sau khi chọn Existed Account
    const updatedGiftCards = [
      ...giftcards,
      {
        card_id: "",
        message: "",
        receiver_address: "",
        receiver_mail: "",
        receiver_name: 0,
        receiver_phone: "",
        account_status: true, // Set account_status thành true
      },
    ];
    setGiftCard(updatedGiftCards);
  };
  useEffect(() => {
    console.log("existedAcc:", existedAcc);
  }, [existedAcc]);
  const handleGuestAcc = () => {
    setExistedAcc(false);
    setShowAccStatus(false); // Ẩn modal sau khi chọn Guest
    const updatedGiftCards = [
      ...giftcards,
      {
        reservation_id: "",
        user_id: 0,
        user_name: "",
        user_phone: "",
        user_gmail: "",
        table_time: "",
        table_date: "",
        No_people: 0,
        message: "",
        account_status: false, // Set account_status thành true
      },
    ];
    setGiftCard(updatedGiftCards);
  };
  const handleAddGiftCard = () => {
    setShowAccStatus(true);
    // Update the gift cards state using the spread operator
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get("/admin/gift-card");
        console.log(res.data);
        setGiftCard(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  console.log(giftcards);
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
          {giftcards.map((order) => (
            <Col key={order.card_order_id}>
              <h4>Order: {order.card_order_id}</h4>
              <Form.Label>To</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                name="receiver_name"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.receiver_name}
              />

              <Form.Label>From</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                name="user_name"
                type="text"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.user_name}
              />
              <Form.Label>Message</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                name="message"
                type="text"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.message}
              />
              <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header>
                  <Modal.Title style={{ color: "green" }}>
                    Successfully Updated!!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>You have successfully updated</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              <Form.Label>Recepient's Email</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                name="receiver_mail"
                type="text"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.receiver_mail}
              />
              <Form.Label>Recepient's Phone Number</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                name="receiver_phone"
                type="text"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.receiver_phone}
              />
              <Form.Label>Recepient's Address</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                type="text"
                name="receiver_address"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.receiver_address}
              />
              <Form.Label>
                Amount(card_id - 1:10, 2:20, 3:50, 4:100 )
              </Form.Label>
              <Form.Control
                className="mt-3 mr-3"
                type="text"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.card_id}
                name="card_id"
              />
              {console.log(order.card_order_id, currentOrderId)}
              {updateSuccess === false &&
                order.card_order_id === currentOrderId && (
                  <div style={{ color: "red", fontSize: "18px" }}>
                    You need to complete all the field
                  </div>
                )}
              <div>
                <Button
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "none",
                    margin: "10px",
                  }}
                  onClick={() => handleUpdateGiftcard(order.card_order_id)}
                >
                  Update
                </Button>
                <Button
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "none",
                    margin: "10px",
                  }}
                  onClick={() => handleRemoveReservation(order.card_order_id)}
                >
                  Remove
                </Button>
                <Modal
                  show={showAccStatus}
                  onHide={() => setShowAccStatus(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title style={{ color: "green" }}>
                      Is this user you want to add an giftcard order already
                      have an account ?
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
                <Modal show={showRemove} onHide={() => setShowRemove(false)}>
                  <Modal.Header>
                    <Modal.Title style={{ color: "red" }}>
                      Successfully removed this account!!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    You have successfully removed. Please reload the page again
                    to see the change
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
        onClick={handleAddGiftCard}
      >
        + Add GiftCard Order
      </Button>
    </Container>
  );
}

export default ManageGiftCard;
