import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/giftCard.css";
import Form from "react-bootstrap/Form";
import anhquaybar from "../assets/images/anhquaybar.jpg";
import ava from "../assets/images/Barava.jpg";
function GiftCard() {
  useEffect(() => {
    var cardNum = document.getElementById("cr_no");
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
    var expDate = document.getElementById("exp");
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
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-12 col-lg-11 col-xl-10">
          <div className="card card0">
            <div className="row">
              <div className="col-md-6 d-block p-0 box">
                <div className="card rounded-0 border-0 card1 pr-xl-4 pr-lg-3">
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

                  {/* <div className="row justify-content-center">
                    <div className="col-11">
                      <p className="text-center mt-0 mb-3" id="sub-heading2">
                        of unlimited access and infinite joy
                      </p>
                    </div>
                  </div> */}
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
                        <Form.Select aria-label="Default select example">
                          <option>Amount</option>
                          <option value="1">10 $</option>
                          <option value="2">20 $</option>
                          <option value="3">30 $</option>
                          <option value="3">50 $</option>
                          <option value="3">100 $</option>
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
                            backgroundColor: "#c9b39f",
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
                              <p>4.0$</p>
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
                      <div className="radio selected" data-value="credit">
                        <img
                          src="https://i.imgur.com/28akQFX.jpg"
                          width="200px"
                          height="60px"
                          alt="credit card image"
                        />
                      </div>
                      <div className="radio" data-value="paypal">
                        <img
                          src="https://i.imgur.com/5QFsx7K.jpg"
                          width="200px"
                          height="60px"
                          alt="paypal image"
                        />
                      </div>
                      <br />
                    </div>
                    <h3 id="credit" className="mb-3">
                      Credit card
                    </h3>
                    <input
                      type="text"
                      name="holdername"
                      placeholder="John Smith"
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

                    <div className="bottom">
                      <div className="row justify-content-center">
                        <div className="col-12">
                          <h4 id="total" className="text-center">
                            Total: $69.94 +{" "}
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
                    </div>
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
