import React, { useEffect, useState } from "react";
import { request } from "../utils/request";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import crystalTexture3 from "../assets/images/crystalTexture3.jpg";
import crystalTexture2 from "../assets/images/crystalTexture2.jpg";
import ava from "../assets/images/Barava.jpg";
import { useNavigate } from "react-router-dom";
import SwipLogo from "../assets/images/SwipLogo.png";

const OrderReceipt = () => {
  const navigate = useNavigate();
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
  const [currentIndex, setCurrentIndex] = useState();
  const [CurentUser, setCurrentUser] = useState({});
  const [More, setMore] = useState(false);
  const userId = parseInt(localStorage.getItem("user_token"));
  const totalAmount = giftcards.reduce(
    (acc, card) => acc + Number(card.user_amount),
    0
  );

  useEffect(() => {
    if (!userId) {
      return;
    }
    const fetchApi = async () => {
      try {
        const res = await request.get(`/${userId}`);
        setCurrentUser(res.data);
        console.log(res.data); // Log dữ liệu từ API
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, [userId]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get(`/giftCard//${userId}`);
        setGiftCard(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);

  return (
    <section
      style={{ background: `url(${ava} ) center/100%`, minHeight: "100vh" }}
    >
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
                  <span style={{ color: "brown" }}>
                    {" "}
                    {CurentUser.user_name}
                  </span>
                  !
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0" style={{ color: "brown" }}>
                    All Your Orders:
                  </p>
                </div>
                {giftcards.map((b, index) => (
                  <div className="card shadow-0 border mb-4">
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
                                  ? "rgb(255 255 255 / 40%)"
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
                          <p className="text-muted mb-0 small">
                            Quantity: <span style={{ color: "brown" }}>1</span>
                          </p>
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
                                width: "4%",
                                borderRadius: "16px",
                                backgroundColor: "brown",
                              }}
                              aria-valuenow="4"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="d-flex justify-content-around mb-1">
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                              Status:{" "}
                              <span style={{ color: "brown" }}>
                                {b.card_status_id === 1
                                  ? "Pending..."
                                  : "Success!!!"}
                              </span>
                            </p>
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                              Delivered
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
                                {CurentUser.user_name}
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
                    Total orders: {giftcards.length}
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
      </div>
    </section>
  );
};

export default OrderReceipt;
