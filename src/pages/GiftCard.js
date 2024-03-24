import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/giftCard.css";
import Form from "react-bootstrap/Form";
import anhquaybar from "../assets/images/anhquaybar.jpg";
import ava from "../assets/images/Barava.jpg";
import { Link } from "react-router-dom";
function GiftCard() {
  useEffect(() => {
    var cardNum = document.getElementById("cr_no");
    var expDate = document.getElementById("exp");
    if (cardNum && expDate) {
      cardNum.onkeyup = function (e) {
        if (this.value == this.lastValue) return;
        var caretPosition = this.selectionStart;
        var sanitizedValue = this.value.replace(/[^0-9]/gi, "");
        var parts = [];
        for (var i = 0, len = sanitizedValue.length; i < len; i += 4) {
          parts.push(sanitizedValue.substring(i, i + 4));
        }
        for (var i = caretPosition - 1; i >= 0; i--) {
          var c = this.value[i];
          if (c < "0" || c > "9") {
            caretPosition--;
          }
        }
        caretPosition += Math.floor(caretPosition / 4);
        this.value = this.lastValue = parts.join("-");
        this.selectionStart = this.selectionEnd = caretPosition;
      };
      //For Date formatted input
      expDate.onkeyup = function (e) {
        if (this.value == this.lastValue) return;
        var caretPosition = this.selectionStart;
        var sanitizedValue = this.value.replace(/[^0-9]/gi, "");
        var parts = [];
        for (var i = 0, len = sanitizedValue.length; i < len; i += 2) {
          parts.push(sanitizedValue.substring(i, i + 2));
        }
        for (var i = caretPosition - 1; i >= 0; i--) {
          var c = this.value[i];
          if (c < "0" || c > "9") {
            caretPosition--;
          }
        }
        caretPosition += Math.floor(caretPosition / 2);
        this.value = this.lastValue = parts.join("/");
        this.selectionStart = this.selectionEnd = caretPosition;
      };
    }
  }, []);
  const MY_BANK = {
    BANK_ID: "vietcombank",
    ACCOUNT_NO: "1015755738",
  };
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("QR Code");
  return (
    <div className="container-fluid">
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
                              placeholder="Mark"
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
                              placeholder="Julia"
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
                          placeholder="mark@mail.org"
                        />
                      </div>
                      <div className="col-6">
                        <label className="gift">Select Amount</label>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) => setAmount(e.target.value)}
                        >
                          <option>Amount</option>
                          <option value="10">10 $</option>
                          <option value="20">20 $</option>
                          <option value="30">30 $</option>
                          <option value="50">50 $</option>
                          <option value="100">100 $</option>
                        </Form.Select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <label className="gift">Message email</label>
                        <br />
                        <input
                          className="gift-input"
                          type="text"
                          name="msg"
                          placeholder="Happy Birthday dear friend !"
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <h1>Preview</h1>

                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#4f3804",
                            color: "white",
                            borderRadius: "16px",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            margin: "16px 8px",
                            boxShadow: "#afa8a8 -6px 8px 10px 11px",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                width: "50%",
                                height: "fit-content",
                                borderRadius: "16px",
                                justifyContent: "center",
                                flex: 1,
                                textAlign: "center",
                              }}
                            >
                              <div>Since 2022</div>
                              <h3>SWI:P</h3>
                              <h5>Hang non</h5>
                            </div>
                            <div style={{ flex: 1, textAlign: "center" }}>
                              Card Balance
                              <h2>{amount} $</h2>
                            </div>
                          </div>
                          <h2 style={{ flex: 1, textAlign: "center" }}>
                            Swi:p
                          </h2>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 p-0 box">
                <div className="card rounded-0 border-0 card2">
                  <div className="form-card">
                    <h2 id="heading" className="text-center">
                      Payment Information
                    </h2>
                    <div className="radio-group">
                      <h4>Select payment method</h4>
                      {["QR Code", "MOMO"].map((tab) => (
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

                    {type === "MOMO" ? (
                      <div>
                        <h3 id="credit" className="mb-3">
                          Credit card
                        </h3>
                        <input
                          type="text"
                          name="holdername"
                          placeholder="Your card name"
                        />
                        <div className="row">
                          <div className="col-12">
                            <input
                              type="text"
                              name="cardno"
                              id="cr_no"
                              placeholder="0000 0000 0000 0000"
                              minLength="19"
                              maxLength="19"
                            />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-9 col-md-7">
                            <input
                              type="text"
                              name="exp"
                              id="exp"
                              placeholder="MM/YY"
                              minLength="5"
                              maxLength="5"
                            />
                          </div>
                          <div className="col-3 col-md-5">
                            <input
                              type="password"
                              name="cvcpwd"
                              placeholder="&#9679;&#9679;&#9679;"
                              className="placeicon"
                              minLength="3"
                              maxLength="3"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <img
                          src={`https://img.vietqr.io/image/${
                            MY_BANK.BANK_ID
                          }-${MY_BANK.ACCOUNT_NO}-qr_only.png?amount=${
                            amount * 24768
                          }&addInfo=gift-card-${amount}`}
                          alt=""
                        />
                        <h4 style={{ marginTop: "20px" }}>
                          Nội dung chuyển khoản: gift-card{amount}
                        </h4>
                        <h4 style={{ marginTop: "20px" }}>
                          Số tiền:
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(amount)}
                          ~
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(amount * 24768)}
                        </h4>
                        <input
                          type="submit"
                          value="Done"
                          style={{ backgroundColor: "#4f3804", color: "white" }}
                        />
                      </div>
                    )}

                    {/* <div className="bottom">
                      <div className="row justify-content-center">
                        <div className="col-12">
                          <h4 id="total" className="text-center">
                            Total:{amount} $
                            <span className="text-dark">VAT</span>
                          </h4>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-8">
                          <input
                            type="submit"
                            value="PURCHASE CARD"
                            className="btn btn-success"
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftCard;
