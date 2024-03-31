import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/giftCard.css";
import Form from "react-bootstrap/Form";
import crystalTexture3 from "../assets/images/crystalTexture3.jpg";
import ava from "../assets/images/Barava.jpg";
import SwipLogo from "../assets/images/SwipLogo.png";
import crystalTexture2 from "../assets/images/crystalTexture2.jpg";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { giftCards } from "../Fakeapi";
function GiftCard() {
  const MY_BANK = {
    BANK_ID: "vietcombank",
    ACCOUNT_NO: "1015755738",
  };
  const [orderInfo, setOrderInfo] = useState(giftCards);
  const [type, setType] = useState("QR Code");
  const [doneBtn, SetDoneBtn] = useState();
  const handleDone = () => {
    if (
      orderInfo.Amount !== 0 &&
      orderInfo.From &&
      orderInfo.To &&
      orderInfo.RecipentEmail &&
      orderInfo.Message &&
      orderInfo.RecipentPhoneNo !== 0
    ) {
      SetDoneBtn(true);
    } else {
      SetDoneBtn(false);
    }
  };
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "rgb(79, 56, 4)" }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-12 col-lg-11 col-xl-10">
          <div className="card card0">
            <div className="row">
              <div className="col-md-6 d-block p-0 box">
                <div className="card rounded-0 border-0 card1 pr-xl-4 pr-lg-3">
                  <button style={{ margin: "8px", width: "20%" }}>
                    <Link style={{ display: "block" }} to="/">
                      Back
                    </Link>
                  </button>
                  <div className="row justify-content-center">
                    <div className="col-11">
                      <h1 className="text-center mt-4 mb-4" id="heading0">
                        SWI:P
                      </h1>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="col-5 fit-image"
                    >
                      <img
                        src={ava}
                        height="200px"
                        width="200px"
                        alt="gift card image"
                        style={{
                          borderRadius: "18px",
                        }}
                      />
                    </div>
                  </div>

                  <form className="form-card p-4 pl-5">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-12">
                            <label className="gift">To</label>
                          </div>
                          <div className="col-12">
                            <input
                              className="gift-input"
                              type="text"
                              name="to"
                              value={orderInfo.To}
                              placeholder="Mark"
                              required
                              onChange={(e) =>
                                setOrderInfo((prevOrderInfo) => ({
                                  ...prevOrderInfo,
                                  To: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-12">
                            <label className="gift">From</label>
                          </div>
                          <div className="col-12">
                            <input
                              className="gift-input"
                              type="text"
                              name="from"
                              value={orderInfo.From}
                              placeholder="Julia"
                              onChange={(e) =>
                                setOrderInfo((prevOrderInfo) => ({
                                  ...prevOrderInfo,
                                  From: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label className="gift">Recipient email</label>
                        <br />
                        <input
                          className="gift-input"
                          type="email"
                          name="email"
                          value={orderInfo.RecipentEmail}
                          placeholder="mark@mail.org"
                          onChange={(e) =>
                            setOrderInfo((prevOrderInfo) => ({
                              ...prevOrderInfo,
                              RecipentEmail: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-6">
                        <label className="gift">Select Amount</label>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) =>
                            setOrderInfo((prevOrderInfo) => ({
                              ...prevOrderInfo,
                              Amount: e.target.value,
                            }))
                          }
                          value={orderInfo.Amount}
                        >
                          <option value="">Amount</option>
                          <option value="10">10 $</option>
                          <option value="20">20 $</option>
                          <option value="50">50 $</option>
                          <option value="100">100 $</option>
                        </Form.Select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label className="gift">Message email</label>
                        <br />
                        <textarea
                          className="gift-input"
                          type="textarea"
                          value={orderInfo.Message}
                          placeholder="Happy Birthday dear friend !"
                          onChange={(e) =>
                            setOrderInfo((prevOrderInfo) => ({
                              ...prevOrderInfo,
                              Message: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-6">
                        <label className="gift">Phone No</label>
                        <br />
                        <input
                          className="gift-input"
                          type="text"
                          value={orderInfo.RecipentPhoneNo}
                          placeholder="Phone Number"
                          onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                              setOrderInfo((prevOrderInfo) => ({
                                ...prevOrderInfo,
                                RecipentPhoneNo: e.target.value,
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      {doneBtn === false && (
                        <h4
                          style={{
                            color: "red",
                          }}
                        >
                          Please complete all the fields!
                        </h4>
                      )}
                      <div className="col-12">
                        <h1>Preview</h1>
                        <div
                          style={{
                            width: orderInfo.Amount === "100" ? "67%" : "73%",
                            color: "white",
                            borderRadius: "16px",
                            height: "230px",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            margin: "16px 8px",
                            boxShadow: "rgb(175, 168, 168) 23px 14px 16px 8px",
                            alignItems: "center",
                            backgroundImage:
                              orderInfo.Amount === "100"
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
                                orderInfo.Amount === "100"
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
                            >
                              <h2>{orderInfo.Amount} $</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={handleDone}
                        style={{
                          backgroundColor: "#4f3804",
                          color: "white",
                          fontSize: "30px",
                          width: "40%",
                        }}
                      >
                        Done
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              {doneBtn === true && orderInfo.Amount && (
                <div className="col-md-6 col-sm-12 p-0 box">
                  <div className="card rounded-0 border-0 card2">
                    <div className="form-card">
                      <h2 id="heading" className="text-center">
                        Payment Information
                      </h2>
                      <div className="radio-group">
                        <h4>Select payment method</h4>
                        {["QR Code", "Transfer"].map((tab) => (
                          <button
                            onClick={() => setType(tab)}
                            key={tab}
                            style={{
                              backgroundColor: tab === type ? "#4f3804" : "",
                              color: tab === type ? "white" : "",
                              fontSize: "20px",
                              margin: "4px 16px",
                              border: "none",
                              padding: "8px",
                              borderRadius: "8px",
                            }}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {type === "Transfer" ? (
                        <div>
                          <h3 id="credit" className="mb-3">
                            Banking Information
                          </h3>
                          <div style={{ display: "flex" }}>
                            <h4>Account No:</h4>
                            <h4 style={{ margin: "0 0 0 8px" }}>1015023423</h4>
                          </div>
                          <div style={{ display: "flex" }}>
                            <h4>Bank Name: </h4>
                            <h4 style={{ margin: "0 0 0 8px" }}>Vietcombank</h4>
                          </div>
                          <div style={{ display: "flex" }}>
                            <h4>Acount Owner: </h4>
                            <h4 style={{ margin: "0 0 0 8px" }}> SWIP </h4>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {(orderInfo.Amount || orderInfo.Amount === 0) && (
                            <img
                              src={`https://img.vietqr.io/image/${
                                MY_BANK.BANK_ID
                              }-${
                                MY_BANK.ACCOUNT_NO
                              }-qr_only.png?orderInfo.Amount=${
                                orderInfo.Amount * 24768
                              }&addInfo=gift-card-${orderInfo.Amount}`}
                              alt=""
                            />
                          )}
                          <h4 style={{ marginTop: "20px" }}>
                            Nội dung chuyển khoản: gift-card{orderInfo.Amount}
                          </h4>
                          <h4 style={{ marginTop: "20px" }}>
                            Số tiền:
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(orderInfo.Amount)}
                            <span> ~ </span>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(orderInfo.Amount * 24768)}
                          </h4>
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        margin: "-16px 0 0 0",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h3 style={{ color: "#4f3804" }}>
                          Your Order has been Sent !
                        </h3>
                        <h5>
                          Status: <span>Pending</span>
                          <div>You will receive notifications</div>
                          <div>when payment is successfully done</div>
                        </h5>
                      </div>
                      <div>
                        <h3> Your order details</h3>
                        <span>
                          From: {orderInfo.From} - To: {orderInfo.To}
                        </span>
                        <div>
                          Amount (1) :
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(orderInfo.Amount)}
                          <span> ~ </span>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(orderInfo.Amount * 24768)}
                        </div>
                        <div>Recipent's Email: {orderInfo.RecipentEmail}</div>
                        <div>Recipent's Phone: {orderInfo.RecipentPhoneNo}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftCard;
