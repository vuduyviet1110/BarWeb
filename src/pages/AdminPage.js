import "../assets/css/AdminPage.css";
import {
  Cart,
  Gear,
  Gift,
  ImageAlt,
  Question,
  Ticket,
} from "react-bootstrap-icons";
import { NavLink, Outlet } from "react-router-dom";
import beverage3 from "../assets/images/talkingincouter.jpg";

function AdminPage() {
  return (
    <div
      style={{
        color: "black",
        padding: "8px",
        background: `url(${beverage3}) top center`,
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <div className="Header">
          <h2>SWI:P</h2>
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
                icon: <Cart />,
                title: "Manage Order Wine",
                route: "wine-order",
              },
              {
                icon: <Question />,
                title: "Manage Feedback",
                route: "feedback",
              },
            ].map((tab) => (
              <h5>
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
          <div className="Content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
