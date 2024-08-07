import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { request } from "../utils/request";
function ManageGiftCard() {
  const [show, setShow] = useState(false);
  const [newGiftCardOrder, setNewGiftCardOrder] = useState();
  const [showRemove, setShowRemove] = useState(false);
  const [showAccStatus, setShowAccStatus] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [isFieldCompleted, setIsFieldCompleted] = useState(true);
  const [validSenderEmail, setSenderValidEmail] = useState(true);
  const [validRecipientEmail, setRecipientValidEmail] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [validePhone, setValidPhone] = useState(true);
  const [currentOrderId, setcurrentOrderId] = useState(0);
  const [ExistedAccount, setExistedAccount] = useState();
  const [giftcards, setGiftCard] = useState([
    {
      card_order_id: "",
      card_status_id: "",
      message: "",
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
      setShowDeleteConfirm(false);
      setShowRemove(true);
      setTimeout(() => {
        setShowRemove(false);
      }, 3000);
      window.location.reload();
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
      (value) => value === "" || value === null || value === undefined
    );
    if (
      !isAnyFieldEmpty &&
      validSenderEmail &&
      validRecipientEmail &&
      validePhone
    ) {
      try {
        const res = await request.put("/admin/gift-card", {
          MatchedGiftCard,
        });
        setShow(true);
        setIsFieldCompleted(true);
        setTimeout(() => {
          setShow(false);
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    } else {
      setcurrentOrderId(giftcardId); // Set currentOrderId to highlight the item with missing fields
      if (isAnyFieldEmpty) {
        setIsFieldCompleted(false);
      } else {
        setIsFieldCompleted(true);
        console.log("isAnyFieldEmpty: ", isAnyFieldEmpty);
      }
    }
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
    console.log(giftcards);
    setGiftCard(updatedGiftCard);
  };

  const handleExistedAcc = () => {
    setShowAccStatus(false); // Ẩn modal sau khi chọn Existed Account
    const updatedGiftCards = [
      ...giftcards,
      {
        message: "",
        receiver_address: "",
        receiver_mail: "",
        user_name: "",
        user_gmail: "",
        user_phone: "",
        user_amount: "",
        receiver_name: "",
        receiver_phone: "",
        account_status: true, // Set account_status thành true
      },
    ];
    setGiftCard(updatedGiftCards);
  };
  useEffect(() => {
    giftcards.forEach((g) => {
      if (g.account_status) {
        setNewGiftCardOrder(giftcards[giftcards.length - 1]);
      }
    });
  }, [giftcards]);

  const handleAddGiftCard = () => {
    setShowAccStatus(true);
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
  const handleSenderEmail = (e) => {
    const { value } = e.target;
    if (isValidEmail(value)) {
      setSenderValidEmail(true);
    } else {
      setSenderValidEmail(false);
    }
  };
  const handlevalidRecipientsEmail = (e) => {
    const { value } = e.target;
    if (isValidEmail(value)) {
      setRecipientValidEmail(true);
    } else {
      setRecipientValidEmail(false);
    }
  };
  const handleAddNewReservationToDBS = async (giftcardId) => {
    const MatchedGiftCard = giftcards.find(
      (giftcard) => giftcard.card_order_id === giftcardId
    );
    const isAnyFieldEmpty = Object.values(MatchedGiftCard).some(
      (value) => value === "" || value === null || value === undefined
    );

    if (
      !isAnyFieldEmpty &&
      validSenderEmail &&
      validRecipientEmail &&
      validePhone
    ) {
      try {
        const res = await request.post("/admin/gift-card", {
          newGiftCardOrder,
        });
        if (res.data === "not existed") {
          setExistedAccount(false);
          return;
        } else {
          setExistedAccount(true);
          setShowAdd(true);
          setTimeout(() => {
            setShowAdd(false);
          }, 3000);
          window.location.reload();
        }
        setIsFieldCompleted(true);
      } catch (error) {
        console.error(error);
      }
      setcurrentOrderId(giftcardId); // Set currentReservationId to highlight the item with missing fields
    } else {
      setcurrentOrderId(giftcardId); // Set currentReservationId to highlight the item with missing fields
      if (isAnyFieldEmpty) {
        setIsFieldCompleted(false);
      } else {
        setIsFieldCompleted(true);
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
              {console.log(
                "currentId: ",
                currentOrderId,
                "card_order: ",
                order.card_order_id
              )}
              <h4>Order: {order.card_order_id}</h4>
              <Form.Label>
                Sender Name <strong style={{ color: "red" }}>(Fixed)</strong>
              </Form.Label>
              <Form.Control
                style={{ margin: "0 0 20px 0" }}
                name="user_name"
                type="text"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.user_name}
              />
              <Form.Label>
                Sender Email
                <strong style={{ color: "red" }}>(*) (Fixed)</strong>
              </Form.Label>
              <Form.Control
                style={{ margin: "0 0 20px 0" }}
                name="user_gmail"
                type="text"
                onBlur={handleSenderEmail}
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.user_gmail}
              />
              {!validSenderEmail && order.card_order_id === currentOrderId && (
                <h5 style={{ color: "red" }}>Invalid email!</h5>
              )}
              <Form.Label>
                Sender Phone <strong style={{ color: "red" }}>(Fixed)</strong>
              </Form.Label>
              <Form.Control
                style={{ margin: "0 0 20px 0" }}
                name="user_phone"
                type="text"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.user_phone}
              />

              <Form.Label>
                To <strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                style={{ margin: "0 0 20px 0" }}
                type="text"
                name="receiver_name"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.receiver_name}
              />
              <Form.Label>
                Card_status <strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>

              <Form.Select
                aria-label="Default select example"
                required
                name="card_status_id"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.card_status_id}
              >
                <option value=""></option>
                <option value="1">Pending</option>
                <option value="2">Success</option>
              </Form.Select>

              <Form.Label>
                Message <strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                style={{ margin: "0 0 20px 0" }}
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
              <Modal
                show={showDeleteConfirm}
                onHide={() => setShowDeleteConfirm(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title style={{ color: "green" }}>
                    Deletion confirmation
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this booking?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => handleRemoveReservation(currentOrderId)}
                  >
                    Yes, Delete this booking
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    No, Cancel Deletion
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                <Modal.Header>
                  <Modal.Title style={{ color: "green" }}>
                    Successfully Added!!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  You have successfully add new giftcard order!!!
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowAdd(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <Form.Label>
                Recepient's Email<strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                style={{ margin: "0 0 20px 0" }}
                name="receiver_mail"
                type="text"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.receiver_mail}
                onBlur={handlevalidRecipientsEmail}
              />
              {!validRecipientEmail &&
                order.card_order_id === currentOrderId && (
                  <h5 style={{ color: "red" }}>Invalid email!</h5>
                )}
              <Form.Label>
                Recepient's Phone Number
                <strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                style={{ margin: "0 0 20px 0" }}
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
              <Form.Label>
                Recepient's Address
                <strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                style={{ margin: "0 0 20px 0" }}
                type="text"
                name="receiver_address"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.receiver_address}
              />
              <Form.Label>
                Amount<strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                name="user_amount"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.user_amount}
              >
                <option value=""></option>
                <option value="10">10 $</option>
                <option value="20">20 $</option>
                <option value="50">50 $</option>
                <option value="100">100 $</option>
              </Form.Select>

              {isFieldCompleted === false &&
                order.card_order_id === currentOrderId && (
                  <div style={{ color: "red", fontSize: "18px" }}>
                    You need to complete all the field
                  </div>
                )}
              {console.log(
                ExistedAccount,
                "và ",
                order.card_order_id === currentOrderId
              )}
              {ExistedAccount === false &&
                order.card_order_id === currentOrderId && (
                  <div style={{ color: "red", fontSize: "18px" }}>
                    This person you add do not have account yet
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
                    onClick={() => {
                      setcurrentOrderId(order.card_order_id);
                      setShowDeleteConfirm(true);
                    }}
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
      <Modal show={showAccStatus} onHide={() => setShowAccStatus(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>
            Registered Account?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Make sure that you this user have an registered account
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleExistedAcc}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageGiftCard;
