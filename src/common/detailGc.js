import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { request } from "../utils/request";

import {
  isAllFieldFilled,
  isValidEmail,
  isValidPhoneNumber,
} from "../common/validattion";
import { useCallback } from "react";
import CustomeModal from "../common/modal";
function DetailGiftcardPage({ fetchData, result, id, field }) {
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
  const [giftcard, setGifcard] = useState(result.giftcard);
  const showToastSuccess = (giftcard, title, message) => {
    const showToastState = {
      [giftcard]: true,
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

  const validateFields = useCallback((giftcard) => {
    const errors = {};
    if (!isValidEmail(giftcard.user_gmail))
      errors.senderEmail = "Invalid email";
    if (!isValidEmail(giftcard.receiver_mail))
      errors.recipientEmail = "Invalid email";
    if (!isValidPhoneNumber(giftcard.receiver_phone))
      errors.recipientPhone = "Invalid phone number";
    if (!isValidPhoneNumber(giftcard.user_phone))
      errors.senderPhone = "Invalid phone number";
    if (!isAllFieldFilled(giftcard))
      errors.emptyField = "Please fill in all fields";
    return errors;
  }, []);

  const handleRemoveGiftcard = useCallback(
    async (giftcardId) => {
      try {
        await request.delete("/admin/gift-card", {
          data: { giftCardId: giftcardId },
        });
        fetchData();
        showToastSuccess(
          "showDelete",
          "Delete gift card?",
          "Gift card deleted successfully"
        );
      } catch (error) {
        console.error("Error removing gift card:", error);
      }
    },
    [fetchData]
  );

  const handleUpdateGiftcard = useCallback(async () => {
    const errors = validateFields(giftcard);

    if (Object.keys(errors).length === 0) {
      try {
        await request.put("/admin/gift-card", { giftcard });
        fetchData();
        showToastSuccess(
          "showUpdate",
          "Update gift card?",
          "Gift card updated successfully"
        );
        setValidationErrors("");
      } catch (err) {
        console.error("Error updating gift card:", err);
        setValidationErrors(errors);
      }
    } else {
      setValidationErrors(errors);
    }
  }, [validateFields, giftcard, fetchData]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setGifcard({ ...giftcard, [name]: value });
    },
    [giftcard]
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
          {field.toUpperCase()}: {giftcard.card_order_id}
        </h4>
        <Row lg={3}>
          <Col className="d-flex flex-column gap-3">
            <div>
              <Form.Label>
                Sender Name <strong style={{ color: "red" }}>(Fixed)</strong>
              </Form.Label>
              <Form.Control
                name="user_name"
                giftcard="text"
                onChange={(e) => handleInputChange(e)}
                value={giftcard.user_name}
              />
            </div>
            <div>
              <Form.Label>
                Sender Email
                <strong style={{ color: "red" }}>(*) (Fixed)</strong>
              </Form.Label>
              <Form.Control
                name="user_gmail"
                giftcard="text"
                onChange={(e) => handleInputChange(e)}
                value={giftcard.user_gmail}
              />
              {validationErrors.senderEmail ? (
                <div style={{ color: "red", fontSize: "14px" }}>
                  Invalid email!
                </div>
              ) : (
                <div style={{ color: "red", fontSize: "14px" }}> </div>
              )}
            </div>
            <div>
              <Form.Label>
                Sender Phone <strong style={{ color: "red" }}>(Fixed)</strong>
              </Form.Label>
              <Form.Control
                name="user_phone"
                giftcard="text"
                onChange={(e) => handleInputChange(e)}
                value={giftcard.user_phone}
              />
              {validationErrors.senderPhone ? (
                <div style={{ color: "red", fontSize: "14px" }}>
                  Invalid phone number!
                </div>
              ) : (
                <div style={{ color: "red", fontSize: "14px" }}> </div>
              )}
            </div>
            <div>
              <Form.Label>
                To <strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                giftcard="text"
                name="receiver_name"
                onChange={(e) => handleInputChange(e)}
                value={giftcard.receiver_name}
              />
            </div>
          </Col>
          <Col className="d-flex flex-column gap-3">
            <div>
              <Form.Label>
                Card_status <strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>

              <Form.Select
                aria-label="Default select example"
                required
                name="card_status_id"
                onChange={(e) => handleInputChange(e)}
                value={giftcard.card_status_id}
              >
                <option value=""></option>
                <option value="1">Pending</option>
                <option value="2">Success</option>
              </Form.Select>
            </div>
            <div>
              <Form.Label>
                Message <strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                name="message"
                giftcard="text"
                onChange={(e) => handleInputChange(e)}
                value={giftcard.message}
              />
            </div>
            <div>
              <Form.Label>
                Amount<strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                name="user_amount"
                onChange={(e) => handleInputChange(e)}
                value={giftcard.user_amount}
              >
                <option value=""></option>
                <option value="10">10 $</option>
                <option value="20">20 $</option>
                <option value="50">50 $</option>
                <option value="100">100 $</option>
              </Form.Select>
            </div>
          </Col>
          <Col className="d-flex flex-column gap-3">
            <div>
              <Form.Label>
                Recepient's Email<strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                name="receiver_mail"
                giftcard="text"
                onChange={(e) => handleInputChange(e)}
                value={giftcard.receiver_mail}
              />
              {validationErrors.recipientEmail ? (
                <div style={{ color: "red", fontSize: "14px" }}>
                  Invalid email!
                </div>
              ) : (
                <div style={{ color: "red", fontSize: "14px" }}></div>
              )}
            </div>
            <div>
              <Form.Label>
                Recepient's Phone Number
                <strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                name="receiver_phone"
                giftcard="text"
                onChange={(e) => handleInputChange(e)}
                value={giftcard.receiver_phone}
              />
              {validationErrors.recipientPhone ? (
                <span style={{ color: "red" }}>
                  Phone must 10 digits/ must be number
                </span>
              ) : (
                <span style={{ color: "red" }}> </span>
              )}
            </div>
            <div>
              <Form.Label>
                Recepient's Address
                <strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                giftcard="text"
                name="receiver_address"
                onChange={(e) => handleInputChange(e)}
                value={giftcard.receiver_address}
              />
            </div>

            {validationErrors.emptyField && (
              <div style={{ color: "red", fontSize: "18px" }}>
                You need to complete all the field
              </div>
            )}
          </Col>
        </Row>
        <Button
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "none",
            margin: "16px 8px 0 0 ",
            color: "white",
          }}
          onClick={() => handleUpdateGiftcard()}
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
              "Delete gift card?",
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
        onConfirm={() => handleRemoveGiftcard(giftcard.card_order_id)}
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

export default DetailGiftcardPage;
