import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { request } from "../utils/request";
function ManageGiftCard() {
  const [show, setShow] = useState(false);
  const [newGiftCardOrder, setNewGiftCardOrder] = useState();
  const [existedAcc, setExistedAcc] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showAccStatus, setShowAccStatus] = useState(false);
  const [isFieldCompleted, setIsFieldCompleted] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validePhone, setValidPhone] = useState(true);
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
    if (!isAnyFieldEmpty && validEmail && validePhone) {
      try {
        const res = await request.put("/admin/gift-card", {
          MatchedGiftCard,
        });
        setShow(true);
        setIsFieldCompleted(true);
        setTimeout(() => {
          setShow(false);
        }, 3000);
        setcurrentOrderId(0); // Reset currentOrderId
      } catch (error) {
        console.error(error);
      }
    } else {
      setcurrentOrderId(giftcardId); // Set currentOrderId to highlight the item with missing fields
      if (isAnyFieldEmpty) {
        setIsFieldCompleted(false);
      } else {
        setIsFieldCompleted(true);
      }
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
        receiver_name: "",
        receiver_phone: "",
        card_order_id: 0,
        account_status: true, // Set account_status thành true
      },
    ];
    setGiftCard(updatedGiftCards);
  };
  useEffect(() => {}, [existedAcc]);
  useEffect(() => {
    giftcards.forEach((g) => {
      if (g.account_status) {
        setNewGiftCardOrder(giftcards[giftcards.length - 1]);
      }
    });
  }, [giftcards]);
  const handleGuestAcc = () => {
    setExistedAcc(false);
    setShowAccStatus(false);
    const updatedGiftCards = [
      ...giftcards,
      {
        card_id: "",
        message: "",
        receiver_address: "",
        receiver_mail: "",
        receiver_name: "",
        receiver_phone: "",
        card_order_id: 0,
        account_status: false, // Set account_status thành true
      },
    ];
    setGiftCard(updatedGiftCards);
  };
  const handleAddGiftCard = () => {
    setShowAccStatus(true);
    // Update the gift cards state using the spread operator
  };
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
    if (isValidEmail(value) && value.length > 0) {
      setValidEmail(true);
      console.log(" valid email: ", validEmail);
    } else {
      setValidEmail(false);
    }
  };
  const handleAddNewReservationToDBS = async (giftcardId) => {
    const MatchedGiftCard = giftcards.find(
      (giftcard) => giftcard.card_order_id === giftcardId
    );
    const isAnyFieldEmpty = Object.values(MatchedGiftCard).some(
      (value) => value === "" || value === null || value === undefined
    );

    console.log(!isAnyFieldEmpty, "vaf", validEmail, "vaf", validePhone);
    if (!isAnyFieldEmpty && validEmail && validePhone) {
      try {
        // const res = await request.post("/admin/gift-card", {
        //   newGiftCardOrder,
        // });
        console.log("New giftcard - order:", newGiftCardOrder);
        setIsFieldCompleted(true);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    } else {
      setcurrentOrderId(currentOrderId); // Set currentReservationId to highlight the item with missing fields
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
        const res = await request.get("/admin/gift-card");
        setGiftCard(res.data);
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
                onBlur={handleEmailBlur}
              />
              {!validEmail && order.card_order_id === currentOrderId && (
                <h5 style={{ color: "red" }}>Invalid email!</h5>
              )}
              <Form.Label>Recepient's Phone Number</Form.Label>
              <Form.Control
                style={{ margin: "8px 8px 0 0" }}
                name="receiver_phone"
                type="text"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.receiver_phone}
                onBlur={validatePhoneField}
              />
              {!validePhone && order.card_order_id === currentOrderId && (
                <span style={{ color: "red" }}>
                  Phone must 10 digits/ must be number
                </span>
              )}
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

              {isFieldCompleted === false &&
                order.card_order_id === currentOrderId && (
                  <div style={{ color: "red", fontSize: "18px" }}>
                    You need to complete all the field
                  </div>
                )}
              <div>
                {order.account_status === undefined && (
                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                      margin: "10px 8px 8px 0",
                    }}
                    onClick={() => handleUpdateGiftcard(order.card_order_id)}
                  >
                    Update
                  </Button>
                )}

                {order.account_status === undefined && (
                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                    }}
                    onClick={() => handleRemoveReservation(order.card_order_id)}
                  >
                    Remove
                  </Button>
                )}
                {(order.account_status === false ||
                  order.account_status === true) && (
                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      border: "none",
                      margin: "0 0 0 8px",
                    }}
                    onClick={() =>
                      handleAddNewReservationToDBS(order.card_order_id)
                    }
                  >
                    Add New
                  </Button>
                )}
                {(order.account_status === false ||
                  order.account_status === true) && (
                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      border: "none",
                      margin: "0 0 0 8px",
                    }}
                    onClick={() => {
                      const updatedGiftCards = giftcards.slice(0, -1); // Tạo một bản sao mới của mảng mà không bao gồm phần tử cuối cùng
                      setGiftCard(updatedGiftCards);
                    }}
                  >
                    Cancel
                  </Button>
                )}
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
