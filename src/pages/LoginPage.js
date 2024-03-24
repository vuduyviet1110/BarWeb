import { useState } from "react";
import ava from "../assets/images/Barava.jpg";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [admin, setAdmin] = useState({ id: "", password: "" });
  const handleIdChange = (e) => {
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      id: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const handlePasswordChange = (e) => {
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      password: e.target.value,
    }));
  };

  const handleClick = () => {
    if (admin.id === "admin" && admin.password === "password") {
      localStorage.setItem("access_token", true);
      return navigate("/admin/dashboard");
    } else {
      alert("please check your id or password again");
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
              value={admin.password}
              type="password"
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
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
