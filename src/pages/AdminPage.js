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
import beverage3 from "../assets/images/talkingincouter.jpg";
function AdminPage() {
  const handleLogout = (e) => {
    localStorage.removeItem("access_token");
    return navigate("/login");
  };
  const navigate = useNavigate();

  return (
    <div
      style={{
        color: "black",
        height: "100%",
      }}
    >
      <div
        style={{
          padding: "8px",
          background: `url(${beverage3})`,
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <div className="Header">
          <h2
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            SWI:P
          </h2>
          <h4
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "8px",
              lineHeight: "35.4px",
              borderRadius: "8px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Log Out
          </h4>
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
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
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
