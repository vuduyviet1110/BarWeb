import React, { useCallback, useEffect, useState } from "react";
import { request } from "../utils/request";
import {
  Binoculars,
  ChevronDown,
  ChevronUp,
  MicFill,
  Soundwave,
  X,
  XCircleFill,
} from "react-bootstrap-icons";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import crystalTexture3 from "../assets/images/crystalTexture3.jpg";
import crystalTexture2 from "../assets/images/crystalTexture2.jpg";
import ava from "../assets/images/Barava.jpg";
import "../assets/css/AdminPage.css";
import CustomeModal from "../common/modal";
import { Link, useNavigate } from "react-router-dom";
import SwipLogo from "../assets/images/SwipLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { convertToNormalDateTime } from "../common/validattion";
import useSpeechToText from "../hooks/useSpeechToText";
import Pagination from "../common/pagination";
import { setTotalOrderGcPage, setupdateOrderGcPage } from "../redux/pageSlice";
import NotFound from "./NotFound";

const OrderReceipt = () => {
  const navigate = useNavigate();
  const { currentOrderGcPage, totalOrderGcPages } = useSelector(
    (state) => state.page
  );
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
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState();
  const [searching, setSearching] = useState("");
  const [More, setMore] = useState(false);
  const [show, setShow] = useState(false);
  const user = useSelector(
    (state) => state.auth.login.currentUser?.matched_user
  );
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });

  const startStopListening = () => {
    isListening ? handleStopAndFetch() : startListening();
  };
  const totalAmount = giftcards.reduce(
    (acc, card) => acc + Number(card.user_amount),
    0
  );

  const stopVoiceInput = () => {
    return new Promise((resolve) => {
      const newTranscript = transcript.replace(/\./g, "");
      const newSearching =
        searching +
        (newTranscript.length
          ? (searching.length ? " " : "") + newTranscript
          : "");
      setSearching(newSearching);
      stopListening();
      resolve(newSearching);
    });
  };

  const handleStopAndFetch = async () => {
    const newSearchingValue = await stopVoiceInput();
    await fetchApi(newSearchingValue);
  };

  const handlePageChange = async (page) => {
    dispatch(setupdateOrderGcPage(page));
  };

  const fetchApi = useCallback(
    async (searchValue) => {
      try {
        const searchTerm = searchValue !== undefined ? searchValue : searching;
        const res = await request.get(
          `/giftCard/${user?.user_id}?page=${currentOrderGcPage}&keyword=${searchTerm}`
        );
        console.log(res.data.pagination.totalPages);
        dispatch(setTotalOrderGcPage(res.data.pagination.totalPages));
        setGiftCard(res.data.data);
        if (res.data.message) {
          setShow(true);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    [currentOrderGcPage, dispatch, searching, user?.user_id]
  );

  useEffect(() => {
    fetchApi();
  }, [currentOrderGcPage, user?.user_id, user]);

  const handleSearchSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    fetchApi();
  };

  return (
    <section
      style={{ background: `url(${ava} ) center/100%`, minHeight: "100vh" }}
    >
      <div
        className="Header "
        style={{
          color: "white",
          backgroundColor: "rgba(50, 50, 33,0.6)",
          lineHeight: "38px",
          height: "100%",
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <Link
          to={"/"}
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            padding: "8px",
            borderRadius: "8px",
            fontSize: "20px",
          }}
        >
          SWI:P
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // width: "26%",
          }}
        >
          <Form
            onSubmit={handleSearchSubmit}
            style={{ width: "100%", display: "flex" }}
          >
            <InputGroup>
              <Form.Control
                type="text"
                disabled={isListening}
                style={{ backgroundColor: "white", border: "none" }}
                onFocus={(e) => (e.target.style.border = "none")}
                onBlur={(e) => (e.target.style.border = "none")}
                value={
                  isListening
                    ? searching +
                      (transcript.length
                        ? (searching.length ? " " : "") + transcript
                        : "")
                    : searching
                }
                placeholder="Search by reciever name or card order id"
                onChange={(e) => setSearching(e.target.value)}
              />
              <Button
                style={{
                  color: "rgba(205, 205, 205, 0.8)",
                  backgroundColor: "white",
                  borderColor: "white",
                }}
                onClick={() => setSearching("")}
              >
                {searching.length ? (
                  <XCircleFill
                    style={{
                      height: "15px",
                      width: "15px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "15px",
                      width: "15px",
                    }}
                  />
                )}
              </Button>
            </InputGroup>
            <Button
              style={{
                backgroundColor: isListening ? "#d62d20" : "brown",
                borderColor: "lightgray",
              }}
              onClick={() => startStopListening()}
            >
              {isListening ? (
                <Soundwave
                  style={{
                    animationName: "pulse",
                    animationDuration: "0.5s",
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                    animationDirection: "alternate",
                  }}
                />
              ) : (
                <MicFill />
              )}
            </Button>
            <Button
              style={{ backgroundColor: "brown", borderColor: "lightgray" }}
              type="submit"
            >
              <Binoculars />
            </Button>
          </Form>
        </div>

        <div
          variant="secondary"
          id="dropdownMenuButton1"
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            padding: "8px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "15px",
            margin: "0 16px 0 0",
          }}
        >
          Hi, {user?.user_name}
        </div>
      </div>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-8">
            <div className="card" style={{ borderRadius: "10px" }}>
              <Button
                style={{
                  margin: "8px 0 8px 16px",
                  backgroundColor: "brown",
                  color: "white",
                  width: "15%",
                  border: "none",
                }}
                onClick={() => navigate("/")}
              >
                Home Page
              </Button>
              <div className="card-header px-4 py-5">
                <h5 className="text-muted mb-0">
                  Thanks for your Order,
                  <span style={{ color: "brown" }}> {user.user_name}</span>!
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div
                    className="lead fw-normal mb-0"
                    style={{ color: "brown" }}
                  >
                    All Your Orders:
                    {giftcards.length === 0 && (
                      <h3 style={{ alignItems: "center" }}>No order yet!</h3>
                    )}
                  </div>
                </div>
                {giftcards.map((b, index) => (
                  <div key={index} className="card shadow-0 border mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h5>
                            {" "}
                            Order:{" "}
                            <span style={{ color: "brown" }}> {index + 1}</span>
                          </h5>
                          <div>
                            Created at:
                            <span style={{ color: "brown", marginLeft: "8px" }}>
                              {convertToNormalDateTime(b.createdAt)}
                            </span>
                          </div>
                          <p className="small text-muted mb-0">
                            Card ID :{" "}
                            <span style={{ color: "brown" }}>
                              {" "}
                              {b.card_order_id}
                            </span>
                          </p>
                        </div>
                        <div
                          style={{
                            width: b.user_amount === "100" ? "17.9%" : "20%",
                            color: "white",
                            borderRadius: "16px",
                            height: b.user_amount === "100" ? "88px" : "90px",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            margin: "16px 8px",
                            boxShadow:
                              "rgb(175, 168, 168) 23px 14px 16px -11px",
                            alignItems: "center",
                            backgroundImage:
                              b.user_amount === "100"
                                ? `url(${crystalTexture2})`
                                : `url(${crystalTexture3})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                              backgroundColor:
                                b.user_amount === "100"
                                  ? "rgb(255 255 255 / 20%)"
                                  : "rgb(0 0 0 / 5%)",
                              backgroundImage: `url(${SwipLogo})`,
                              backgroundSize: "100% 100%",
                              height: "100%",
                              borderRadius: "16px",
                              width: "100%",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <div
                              style={{
                                margin: "0 8px 0 0",
                                color: "#874210",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0">
                            Card Type:
                            <span style={{ color: "brown" }}>
                              gift-card{b.user_amount}
                            </span>
                          </p>
                        </div>
                        <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                          <p className="text-muted mb-0 small">
                            Color:{" "}
                            {b.user_amount === "10" ||
                            b.user_amount === "20" ||
                            b.user_amount === "50" ? (
                              <span style={{ color: "brown" }}>
                                Silver Crystal
                              </span>
                            ) : (
                              <span style={{ color: "brown" }}>
                                Light Through Crystal
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                          <span className="text-muted mb-0 small">
                            Quantity: <span style={{ color: "brown" }}>1</span>
                          </span>
                        </div>
                      </div>
                      <hr
                        className="mb-4"
                        style={{ backgroundColor: "brown", opacity: 1 }}
                      />
                      <div className="row d-flex align-items-center">
                        <div className="col-md-2">
                          <p className="text-muted mb-0 small">Order Status</p>
                          {More && currentIndex === b.card_order_id ? (
                            <ChevronUp
                              onClick={(e) => {
                                setCurrentIndex(b.card_order_id);
                                setMore(!More);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          ) : (
                            <ChevronDown
                              onClick={(e) => {
                                setCurrentIndex(b.card_order_id);
                                setMore(!More);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          )}
                        </div>
                        <div className="col-md-10">
                          <div
                            className="progress"
                            style={{ height: "6px", borderRadius: "16px" }}
                          >
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: b.card_status_id === 1 ? "10%" : "50%",
                                borderRadius: "16px",
                                backgroundColor: "brown",
                              }}
                              aria-valuenow="4"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="d-flex justify-content-around mb-1">
                            <span className="text-muted mt-1 mb-0 small ms-xl-5">
                              Payment:{" "}
                              <span style={{ color: "brown" }}>
                                {b.card_status_id === 1
                                  ? "Pending..."
                                  : "Success!!!"}
                              </span>
                            </span>
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                              Delivery:{" "}
                              <span style={{ color: "brown" }}>
                                {b.card_status_id === 1
                                  ? "Pending..."
                                  : "On the way!!!"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      {More && currentIndex === b.card_order_id && (
                        <div
                          style={{
                            backgroundColor: "rgb(0,0,0,0.1)",
                            padding: "10px",
                            borderRadius: "18px",
                            fontSize: "20px",
                            transition: "height 4s ease-in-out",
                            height: `${More ? "200px" : "50px"}`,
                          }}
                          className="row d-flex "
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              margin: "8px",
                            }}
                          >
                            <span>
                              From:{" "}
                              <span style={{ color: "brown" }}>
                                {user.user_name}
                              </span>
                              - To:{" "}
                              <span style={{ color: "brown" }}>
                                {b.receiver_name}
                              </span>
                            </span>
                            <div>
                              Amount :{" "}
                              <span style={{ color: "brown" }}>
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(b.user_amount)}
                                <span> ~ </span>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(b.user_amount * 24768)}
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              margin: "8px",
                            }}
                          >
                            <div>
                              Recipent's Email:{" "}
                              <span style={{ color: "brown" }}>
                                {b.receiver_mail}
                              </span>
                            </div>
                            <div>
                              Recipent's Phone:{" "}
                              <span style={{ color: "brown" }}>
                                {b.receiver_phone}
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              margin: "8px",
                            }}
                          >
                            <div>
                              Recipent's Address:{" "}
                              <span style={{ color: "brown" }}>
                                {b.receiver_address}
                              </span>
                            </div>
                            <div>
                              Message:{" "}
                              <span style={{ color: "brown" }}>
                                {b.message}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-between pt-2">
                  <p className="fw-bold mb-0">
                    Total orders: {giftcards.length * totalOrderGcPages}
                  </p>
                  <p className="text-muted mb-0">
                    <span className="fw-bold me-4">Total Spend</span>
                    <span style={{ color: "brown" }}>{totalAmount}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentOrderGcPage}
          totalPages={totalOrderGcPages}
          handlePageChange={handlePageChange}
        />
        <CustomeModal
          show={show}
          Titlestyle={{ color: "brown" }}
          onHide={() => setShow(false)}
          subTitle={searching}
          title={"Not found order for: "}
          body={`Try to search by receiver name or card order id on each order( if you remember)`}
        />
      </div>
      <style>{`
      @keyframes pulse {
        0%,60% {
          transform: scale(1);
        }
        10%,100% {
          transform: scale(1.5);
        }
      }
    `}</style>
    </section>
  );
};

export default OrderReceipt;
