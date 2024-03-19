import { useState } from "react";
import ava from "../assets/images/Barava.jpg";
export default function LoginPage() {
  const [admin, setAdmin] = useState({ id: "", password: "" });
  const handleIdChange = (e) => {
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      id: e.target.value,
    }));
    console.log(admin.id);
  };

  const handlePasswordChange = (e) => {
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      password: e.target.value,
    }));
    console.log(admin.password);
  };

  const handleClick = () => {
    const isLoggedIn = localStorage.setItem("access_token", true);
    return isLoggedIn;
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
        }}
      >
        <img
          src={ava}
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          alt="images"
        />

        <h3
          style={{
            margin: "16px",
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
            }}
          >
            <label htmlFor="adId">ID</label>
            <input
              type="text"
              value={admin.id}
              onChange={handleIdChange}
              placeholder="Enter Id"
              style={{ height: "35px", borderRadius: "8px" }}
              id="adId"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80px",
              width: "400px",
            }}
          >
            <label htmlFor="adPwd">Password</label>
            <input
              type="password"
              value={admin.password}
              style={{ height: "35px", borderRadius: "8px" }}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              id="adPwd"
            />
          </div>
        </div>
        <div style={{ border: " 1px solid rgb(200,200,200)", margin: "16px" }}>
          <button
            style={{ width: "100px", height: "40px", color: "brown" }}
            onClick={handleClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
