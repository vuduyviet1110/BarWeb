import { useEffect, useState } from "react";
import ava from "../assets/images/Barava.jpg";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [admin, setAdmin] = useState({ id: "", password: "" });
  const [isValid, setIsValid] = useState(true);
  const [isEmptyId, setIsEmptyid] = useState(false);
  const [isEmptyPwd, setIsEmptypwd] = useState(false);
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

  useEffect(() => {}, []);

  const handleClick = () => {
    if (admin.id === "admin" && admin.password === "1") {
      localStorage.setItem("access_token", true);
      return navigate("/admin/content");
    } else {
      setIsValid(false);
      if (!admin.id) {
        setIsEmptyid(true);
      } else if (admin.id) {
        setIsEmptyid(false);
      }
      if (!admin.password) {
        setIsEmptypwd(true);
      } else if (admin.password) {
        setIsEmptypwd(false);
      }
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

            {isEmptyId && (
              <span style={{ color: "red" }}>Please fill out this field</span>
            )}
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
            {isEmptyPwd && (
              <span style={{ color: "red" }}>Please fill out this field</span>
            )}
          </div>
          {!isValid && (
            <span style={{ color: "red" }}>
              Please check your id and password !
            </span>
          )}
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
