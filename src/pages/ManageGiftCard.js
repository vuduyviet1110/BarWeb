import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { request } from "../utils/request";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../common/pagination";
import {
  setTotalGiftCardPage,
  setupdateGiftCardPage,
} from "../redux/pageSlice";
import {
  isAllFieldFilled,
  isValidEmail,
  isValidPhoneNumber,
} from "../common/validattion";
import { useCallback } from "react";
import CustomeModal from "../common/modal";
function ManageGiftCard() {
  const [modalState, setModalState] = useState({
    showAdd: false,
    showDelete: false,
    showUpdate: false,
    showconfirmDelete: false,
    showAccStatus: false,
    body: "",
    title: "",
  });
  const [filtering, setFiltering] = useState({
    search: {
      field: "",
      keyword: "",
    },
    sort: {
      sortingAmount: "",
      sortingDate: "",
      sortingPayment: "",
    },
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [currentOrderId, setcurrentOrderId] = useState(0);
  const [ExistedAccount, setExistedAccount] = useState();

  const [newGiftCardOrder, setNewGiftCardOrder] = useState();
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
  const showToastSuccess = (type, title, message) => {
    const showToastState = {
      [type]: true,
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
  const sortKey = Object.keys(filtering.sort)[0];
  const sortValue = Object.values(filtering.sort)[0];
  const dispatch = useDispatch();
  const { currentGiftCardPage, totalGiftCardPages } = useSelector(
    (state) => state.page
  );

  const fetchGiftCards = useCallback(async () => {
    try {
      const res = await request.get(
        `/admin/gift-card?page=${currentGiftCardPage}&${sortKey}=${sortValue}`
      );
      dispatch(setTotalGiftCardPage(res.data.pagination.totalPages));
      setGiftCard(res.data.data);
    } catch (error) {
      console.error("Error fetching gift cards:", error);
    }
  }, [currentGiftCardPage, dispatch, sortKey, sortValue]);
  useEffect(() => {
    fetchGiftCards();
  }, [fetchGiftCards, currentGiftCardPage, sortKey, sortValue]);

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
        showToastSuccess(
          "showDelete",
          "Delete gift card?",
          "Gift card deleted successfully"
        );
        fetchGiftCards();
      } catch (error) {
        console.error("Error removing gift card:", error);
      }
    },
    [fetchGiftCards]
  );

  const handleUpdateGiftcard = useCallback(
    async (giftcardId) => {
      const giftcard = giftcards.find(
        (card) => card.card_order_id === giftcardId
      );
      const errors = validateFields(giftcard);

      if (Object.keys(errors).length === 0) {
        try {
          await request.put("/admin/gift-card", { giftcard });
          showToastSuccess(
            "showUpdate",
            "Update gift card?",
            "Gift card updated successfully"
          );
          fetchGiftCards();
          setValidationErrors("");
        } catch (err) {
          console.error("Error updating gift card:", err);
          setValidationErrors(errors);
        }
      } else {
        setcurrentOrderId(giftcardId);
        setValidationErrors(errors);
      }
    },
    [giftcards, validateFields, fetchGiftCards]
  );

  const handleInputChange = useCallback((e, giftcardId) => {
    const { name, value } = e.target;
    setGiftCard((prev) =>
      prev.map((card) =>
        card.card_order_id === giftcardId ? { ...card, [name]: value } : card
      )
    );
  }, []);
  const handleExistedAcc = () => {
    handleCloseModal();
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
    showToastSuccess(
      "showAccStatus",
      "Add gift card?",
      "Make sure user you going to add already have an account"
    );
  };

  const handleAddNewReservationToDBS = async (giftcardId) => {
    const MatchedGiftCard = giftcards.find(
      (giftcard) => giftcard.card_order_id === giftcardId
    );
    const errors = validateFields(MatchedGiftCard);

    if (Object.keys(errors).length === 0) {
      try {
        const res = await request.post("/admin/gift-card", {
          newGiftCardOrder,
        });
        if (res.data === "not existed") {
          setExistedAccount(false);
          return;
        } else {
          setExistedAccount(true);
          fetchGiftCards();
          showToastSuccess(
            "showAdd",
            "Added successfully!!",
            " Your gift card has been added successfully"
          );
        }
      } catch (error) {
        console.error(error);
        setValidationErrors(errors);
      }
      setcurrentOrderId(giftcardId); // Set currentReservationId to highlight the item with missing fields
    } else {
      setcurrentOrderId(giftcardId); // Set currentReservationId to highlight the item with missing fields
      setValidationErrors(errors);
    }
  };

  //Page handle
  const handlePageChange = async (page) => {
    dispatch(setupdateGiftCardPage(page));
  };

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
        <h1 className="mt-1" style={{ flex: 1 }}>
          Bar Management
        </h1>
        <h4 style={{ marginRight: "8px" }}>Sorting:</h4>
        <div style={{ width: "30%", display: "flex", gap: "10px" }}>
          <Form.Select
            onChange={(e) =>
              setFiltering({
                ...filtering,
                sort: { sortingDate: e.target.value },
              })
            }
          >
            <option> Date</option>
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </Form.Select>
          <Form.Select
            onChange={(e) =>
              setFiltering({
                ...filtering,
                sort: { sortingPayment: e.target.value },
              })
            }
          >
            <option> Payment</option>
            <option value="desc">Paid</option>
            <option value="asc">UnPaid</option>
          </Form.Select>
          <Form.Select
            onChange={(e) =>
              setFiltering({
                ...filtering,
                sort: { sortingAmount: e.target.value },
              })
            }
          >
            <option> Amount</option>
            <option value="desc">heighest</option>
            <option value="asc">lowest</option>
          </Form.Select>
        </div>
      </div>
      <div>
        <h3>All GiftCards Order</h3>

        <Row lg={4}>
          {giftcards.map((order) => (
            <Col key={order.card_order_id}>
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
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.user_gmail}
              />
              {validationErrors.senderEmail &&
                order.card_order_id === currentOrderId && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    Invalid email!
                  </div>
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
              {validationErrors.senderPhone &&
                order.card_order_id === currentOrderId && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    Invalid phone number!
                  </div>
                )}
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

              <CustomeModal
                show={modalState.showconfirmDelete}
                onHide={() => setModalState({ showconfirmDelete: false })}
                title={modalState.title}
                body={modalState.body}
                onConfirm={() => handleRemoveGiftcard(currentOrderId)}
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
              <CustomeModal
                show={modalState.showAccStatus}
                onHide={() => setModalState({ showAccStatus: false })}
                title={modalState.title}
                body={modalState.body}
                onConfirm={() => handleExistedAcc()}
              />

              <Form.Label>
                Recepient's Email<strong style={{ color: "red" }}>(*) </strong>
              </Form.Label>
              <Form.Control
                style={{ margin: "0 0 20px 0" }}
                name="receiver_mail"
                type="text"
                onChange={(e) => handleInputChange(e, order.card_order_id)}
                value={order.receiver_mail}
              />
              {validationErrors.recipientEmail &&
                order.card_order_id === currentOrderId && (
                  <div style={{ color: "red", fontSize: "14px" }}>
                    Invalid email!
                  </div>
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
              />
              {validationErrors.recipientPhone &&
                order.card_order_id === currentOrderId && (
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

              {validationErrors.emptyField &&
                order.card_order_id === currentOrderId && (
                  <div style={{ color: "red", fontSize: "18px" }}>
                    You need to complete all the field
                  </div>
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
                      showToastSuccess(
                        "showconfirmDelete",
                        "Delete gift card?",
                        "Deleted successfully"
                      );
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
                      setValidationErrors("");
                    }}
                  >
                    Cancel
                  </Button>
                )}
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

      {giftcards.length === 0 && (
        <Container
          style={{
            borderRadius: "10px",
            color: "rgb(161, 158, 158)",
            paddingLeft: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>(No Reservations)</h2>
        </Container>
      )}
      <Pagination
        currentPage={currentGiftCardPage}
        totalPages={totalGiftCardPages}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
}

export default ManageGiftCard;
