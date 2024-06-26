import "../assets/css/AdminPage.css";
import {
  Gear,
  Gift,
  ImageAlt,
  Newspaper,
  Ticket,
  UsbDrive,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../utils/request";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from "../redux/adminAuthSlice";
function AdminPage() {
  const currentAd = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const [ad, setAd] = useState();
  const handleLogout = (e) => {
    try {
      localStorage.removeItem("tcon");
      dispatch(logoutStart());
      dispatch(logoutSuccess());
      return navigate("/login");
    } catch (error) {
      dispatch(logoutFailed());
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get(`/admin/auth/${currentAd.id}`);
        console.log(res.data);
        setAd(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, []);
  return (
    <div
      style={{
        color: "black",
        minHeight: "100vh",
        background: `url(https://res.cloudinary.com/dyapfszsy/image/upload/v1715616726/bar_website/ookxwarmikb9airaaufq.jpg) top/100%`,
      }}
    >
      <div
        style={{
          backdropFilter: " blur(2px)",
          backgroundColor: "rgba(0,0,0,0.5)",
          minHeight: "100vh",
        }}
      >
        <div className="Header">
          <h2
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            SWI:P
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                padding: "8px",
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "20px",
                margin: "0 16px 0 0",
              }}
            >
              Hello👋, {currentAd?.name}
            </div>
            <h4
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                padding: "8px",
                margin: "0 8px 0 0 ",
                lineHeight: "36px",
                borderRadius: "8px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Log out
            </h4>
          </div>
        </div>

        <div style={{ display: "flex", height: "100%" }}>
          <div className="SideBar">
            {[
              { icon: <Gear />, title: "Manage Content", route: "content" },
              { icon: <ImageAlt />, title: "Manage Image", route: "image" },
              {
                icon: <Ticket />,
                title: "Manage Booking",
                route: "booking",
              },
              {
                icon: <Gift />,
                title: "Manage GiftCard",
                route: "gift-card",
              },

              {
                icon: <Newspaper />,
                title: "Manage Event",
                route: "event",
              },
              {
                icon: <UsbDrive />,
                title: "Manage User",
                route: "user",
              },
            ].map((tab, index) => (
              <h5 key={index}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to={tab.route}
                  style={{
                    display: "block",
                    margin: "4px 0",
                    padding: "0 8px",
                    lineHeight: "40px",
                    transition: "border-radius 0.3s, background-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderRadius = "8px";
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderRadius = "0";
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  {tab.icon}
                  <span style={{ margin: "0 8px" }}></span>
                  {tab.title}
                </NavLink>
              </h5>
            ))}
          </div>
          <div style={{ width: "80%" }}>
            {/* <h1>Bar Management</h1> */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
