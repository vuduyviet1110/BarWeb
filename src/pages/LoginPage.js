import { useEffect, useState } from "react";
import ava from "../assets/images/Barava.jpg";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/request";
import beverage3 from "../assets/images/loginAdmin.jpg";

export default function LoginPage() {
  const [admin, setAdmin] = useState({ ad_name: "", ad_password: "" });
  const [isValid, setIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();
  const handleIdChange = (e) => {
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      ad_name: e.target.value,
    }));
  };
  const handlePasswordChange = (e) => {
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      ad_password: e.target.value,
    }));
  };

  const handleClick = async () => {
    const isAnyFieldEmpty = Object.values(admin).some(
      (value) => value === "" || value === null || value === undefined
    );
    if (!isAnyFieldEmpty) {
      const res = await request.post("/admin/auth", admin);
      console.log(res.data);
      if (res.data === "Invalid") {
        setIsValid(false);
      } else if (res.data.admin) {
        localStorage.setItem("access_token", true);
        return navigate(`/admin/${res.data.admin.admin_id}/content`);
      }
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
          padding: 3,
          color: "brown",
          minHeight: "100vh",
          background: `url(${beverage3})`,
        }}
      >
        <img
          src={ava}
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          alt="images"
        />

        <h3
          style={{
            margin: "16px",
            color: "white",
          }}
        >
          Bar Management
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80px",
              width: "400px",
              color: "white",
            }}
          >
            <label htmlFor="adId">ID</label>
            <input
              type="text"
              value={admin.ad_name}
              onChange={handleIdChange}
              placeholder="Enter Id"
              style={{
                height: "38px",
                borderRadius: "8px",
                padding: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                color: "brown",
                border: "none",
              }}
              id="adId"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80px",
              width: "400px",
              color: "white",
            }}
          >
            <label htmlFor="adPwd">Password</label>
            <input
              value={admin.ad_password}
              type="password"
              style={{
                height: "38px",
                borderRadius: "8px",
                padding: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                color: "brown",
                border: "none",
              }}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              id="adPwd"
            />
          </div>
          {isEmpty && (
            <span style={{ color: "red" }}>
              Please fill out all the field!!!
            </span>
          )}
          {!isValid && (
            <span style={{ color: "red" }}>
              Please check your id and password !
            </span>
          )}
        </div>
        <div style={{ margin: "16px" }}>
          <button
            style={{
              width: "100px",
              height: "40px",
              color: "brown",
              border: "none",
              borderRadius: "8px",
            }}
            onClick={handleClick}
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
