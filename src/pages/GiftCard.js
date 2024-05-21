import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/giftCard.css";
import Form from "react-bootstrap/Form";
import crystalTexture3 from "../assets/images/crystalTexture3.jpg";
import crystalTexture2 from "../assets/images/crystalTexture2.jpg";
import ava from "../assets/images/Barava.jpg";
import SwipLogo from "../assets/images/SwipLogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { request } from "../utils/request";
function GiftCard() {
  const userId = parseInt(localStorage.getItem("user_token"));
  const [CurrentUser, setCurrentUser] = useState({});
  const [validEmail, setValidEmail] = useState(true);
  const [validePhone, setValidPhone] = useState(true);
  const navigate = useNavigate();
  const isValidEmail = (email) => {
    // Biểu thức chính quy để kiểm tra email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  function validatePhoneField(phoneNumberField) {
    // Get the phone number value
    const { value } = phoneNumberField.target;
    console.log(value);

    // Check if the phone number matches the regular expression
    if (value.length !== 10) {
      console.log("invalid phone");
      setValidPhone(false);
    } else setValidPhone(true);
  }
  // Xử lý khi rời khỏi trường nhập email
  const handleEmailBlur = (e) => {
    const { value } = e.target;
    if (isValidEmail(value)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchApi = async () => {
      try {
        const res = await request.get(`/${userId}`);
        setCurrentUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, [userId]);
  const MY_BANK = {
    BANK_ID: "vietcombank",
    ACCOUNT_NO: "1015755738",
  };
  const [orderInfo, setOrderInfo] = useState({
    user_id: userId,
    receiver_name: "",
    user_amount: 0,
    receiver_mail: "",
    receiver_message: "",
    receiver_address: "",
    receiver_phone: "",
  });
  const [type, setType] = useState("QR Code");
  const [doneBtn, SetDoneBtn] = useState();
  const handleDone = async () => {
    if (
      orderInfo.user_amount !== 0 &&
      orderInfo.receiver_name &&
      orderInfo.receiver_mail &&
      orderInfo.receiver_message &&
      orderInfo.receiver_message.length < 600 &&
      validEmail &&
      orderInfo.receiver_address &&
      orderInfo.receiver_phone !== 0 &&
      validePhone
    ) {
      SetDoneBtn(true);
      try {
        const res = await request.post("/giftCard", orderInfo);
        console.log(res.data);
      } catch (error) {
        console.log("can not place the order");
      }
    } else {
      SetDoneBtn(false);
    }
  };
  return (
    <div
      className="container-fluid"
      style={{ background: `url(${ava} ) center/100%` }}
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
                        alt="gift card imaSSge"
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
                              required
                              onChange={(e) =>
                                setOrderInfo((prevOrderInfo) => ({
                                  ...prevOrderInfo,
                                  receiver_name: e.target.value,
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
                              required
                              value={CurrentUser.user_name}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label className="gift">Recipient email</label>
                        <input
                          className="gift-input"
                          type="email"
                          name="email"
                          required
                          onBlur={handleEmailBlur}
                          value={orderInfo.receiver_mail}
                          placeholder="mark@mail.org"
                          onChange={(e) =>
                            setOrderInfo((prevOrderInfo) => ({
                              ...prevOrderInfo,
                              receiver_mail: e.target.value,
                            }))
                          }
                        />
                        {!validEmail && (
                          <h5 style={{ color: "red", margin: "-16px 0 0 0" }}>
                            Invalid email!
                          </h5>
                        )}
                      </div>
                      <div className="col-6">
                        <label className="gift">Select user_amount</label>
                        <Form.Select
                          aria-label="Default select example"
                          required
                          onChange={(e) =>
                            setOrderInfo((prevOrderInfo) => ({
                              ...prevOrderInfo,
                              user_amount: e.target.value,
                            }))
                          }
                          value={orderInfo.user_amount}
                        >
                          <option value="">user_amount</option>
                          <option value="10">10 $</option>
                          <option value="20">20 $</option>
                          <option value="50">50 $</option>
                          <option value="100">100 $</option>
                        </Form.Select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label className="gift">Recipent Adress</label>
                        <br />
                        <input
                          className="gift-input"
                          type="text"
                          required
                          value={orderInfo.receiver_address}
                          placeholder="1 Houton st, California !"
                          onChange={(e) =>
                            setOrderInfo((prevOrderInfo) => ({
                              ...prevOrderInfo,
                              receiver_address: e.target.value,
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
                          required
                          maxLength={10}
                          minLength={10}
                          value={orderInfo.receiver_phone}
                          placeholder="Phone Number"
                          onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                              setOrderInfo((prevOrderInfo) => ({
                                ...prevOrderInfo,
                                receiver_phone: e.target.value,
                              }));
                            }
                          }}
                          onBlur={validatePhoneField}
                        />
                        {!validePhone && (
                          <span style={{ color: "red" }}>
                            Must be 10 digits
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <label className="gift">Message email</label>
                        <br />
                        <textarea
                          className="gift-input"
                          type="textarea"
                          maxLength={600}
                          value={orderInfo.receiver_message}
                          placeholder="Happy Birthday dear friend (Max Length is 600) !"
                          onChange={(e) =>
                            setOrderInfo((prevOrderInfo) => ({
                              ...prevOrderInfo,
                              receiver_message: e.target.value,
                            }))
                          }
                        />
                      </div>
                      {orderInfo.receiver_message?.length > 600 && (
                        <h5 style={{ color: "red" }}>Max length is 600!!</h5>
                      )}
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
                            width:
                              orderInfo.user_amount === "100" ? "67%" : "73%",
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
                              orderInfo.user_amount === "100"
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
                                orderInfo.user_amount === "100"
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
                              <h2>{orderInfo.user_amount} $</h2>
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
              {doneBtn === true && orderInfo.user_amount && (
                <div className="col-md-6 col-sm-12 p-0 box">
                  <div className="card rounded-0 border-0 card2">
                    <div className="form-card">
                      <h2 id="heading" className="text-center">
                        Payment Information
                      </h2>
                      <div className="radio-group">
                        {["QR Code"].map((tab) => (
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

                      <div>
                        {(orderInfo.user_amount ||
                          orderInfo.user_amount === 0) && (
                          <div
                            style={{
                              backgroundColor: "rgb(0,0,0,0.1)",
                              borderRadius: "16px",
                              padding: "16px",
                            }}
                          >
                            <h3 id="credit" className="mb-3">
                              Banking Information
                            </h3>
                            <div style={{ display: "flex" }}>
                              <h4>Account No:</h4>
                              <h4 style={{ margin: "0 0 0 16px" }}>
                                1015755738
                              </h4>
                            </div>
                            <div style={{ display: "flex" }}>
                              <h4>Bank Name: </h4>
                              <h4 style={{ margin: "0 0 0 16px" }}>
                                Vietcombank
                              </h4>
                            </div>
                            <div style={{ display: "flex" }}>
                              <h4>Acount Owner: </h4>
                              <h4 style={{ margin: "0 0 0 16px" }}>
                                Vu Duy Viet
                              </h4>
                            </div>
                            <img
                              style={{ margin: "20px 0 0 0" }}
                              width="50%"
                              height="50%"
                              src={`https://img.vietqr.io/image/${
                                MY_BANK.BANK_ID
                              }-${MY_BANK.ACCOUNT_NO}-qr_only.png?amount=${
                                orderInfo.user_amount * 24768
                              }&addInfo=gift-card-${orderInfo.user_amount}`}
                              alt=""
                            />
                          </div>
                        )}

                        <h4 style={{ marginTop: "20px" }}>
                          Message: gift-card{orderInfo.user_amount}
                        </h4>
                        <h4 style={{ marginTop: "20px" }}>
                          Số tiền: <span> </span>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(orderInfo.user_amount)}
                          <span> ~ </span>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(orderInfo.user_amount * 24768)}
                        </h4>
                      </div>
                    </div>
                    <p
                      style={{
                        borderTop: "4px solid #bbb",
                        borderRadius: "8px",
                        margin: "0 0 32px 0",
                      }}
                    ></p>
                    <div>
                      <div
                        style={{
                          backgroundColor: "rgb(0,0,0,0.1)",
                          margin: "0 0 22px 0",
                          padding: "10px",
                          borderRadius: "18px",
                        }}
                      >
                        <h3 style={{ color: "#4f3804" }}>
                          Your Order has been Sent !
                        </h3>
                        <div>
                          <span style={{ fontSize: "28px" }}>
                            Status:{" "}
                            <span style={{ color: "red" }}>Pending...</span>
                          </span>

                          <div
                            style={{
                              paddingTop: "8px",
                              color: "red",
                              fontSize: "18px",
                            }}
                          >
                            You will receive notifications when payment is
                            successfully done
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          backgroundColor: "rgb(0,0,0,0.1)",
                          padding: "10px",
                          borderRadius: "18px",
                          fontSize: "20px",
                        }}
                      >
                        <h3> Your order details</h3>
                        <span>
                          From: {CurrentUser.user_name} - To:{" "}
                          {orderInfo.receiver_name}
                        </span>
                        <div>
                          user_amount (1) :
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(orderInfo.user_amount)}
                          <span> ~ </span>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(orderInfo.user_amount * 24768)}
                        </div>
                        <div>Recipent's Email: {orderInfo.receiver_mail}</div>
                        <div>Recipent's Phone: {orderInfo.receiver_phone}</div>
                      </div>
                      <Button
                        style={{
                          margin: "16px 0 0 0",
                          backgroundColor: "#4f3804",
                          color: "white",
                          width: "40%",
                        }}
                        onClick={(e) => navigate("orders")}
                      >
                        Review My orders
                      </Button>
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
