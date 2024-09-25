import "../assets/css/AdminPage.css";
import {
  BarChartFill,
  Binoculars,
  Calendar2CheckFill,
  Gear,
  Gift,
  GiftFill,
  ImageAlt,
  Newspaper,
  PeopleFill,
  Ticket,
  TicketPerforatedFill,
  UsbDrive,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

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
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
function AdminPage() {
  const navigate = useNavigate();
  const currentAd = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();
  const [searching, setSearching] = useState({
    field: "",
    keyword: "",
  });
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
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(searching);
    navigate(
      `/admin/search?field=${searching.field}&keyword=${searching.keyword}`
    );
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get(`/admin/auth/${currentAd.id}`);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, [currentAd?.id]);
  if (!currentAd?.id || !currentAd) {
    navigate("/admin/content/notfound/404/");
  }
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
          <Link
            to={"/admin/content"}
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              padding: "8px",
              borderRadius: "8px",
              fontSize: "20px",
            }}
          >
            SWI:P
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form onSubmit={handleSearchSubmit}>
              <InputGroup>
                <Form.Select
                  onChange={(e) =>
                    setSearching({ ...searching, field: e.target.value })
                  }
                  aria-label="Search by field"
                >
                  <option value="">Search by field</option>
                  <option value="reservation">Reservation</option>
                  <option value="giftcard">Gift Card</option>
                  <option value="user">User</option>
                </Form.Select>

                <Form.Control
                  placeholder="Search by username"
                  onChange={(e) =>
                    setSearching({ ...searching, keyword: e.target.value })
                  }
                />

                <Button variant="outline-secondary" type="submit">
                  <Binoculars />
                </Button>
              </InputGroup>
            </Form>
          </div>

          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdownMenuButton1"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                padding: "8px",
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "15px",
                margin: "0 16px 0 0",
              }}
            >
              Hi, {currentAd?.name}
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby="dropdownMenuButton1">
              <Dropdown.Item
                style={{
                  color: "rgba(0, 0, 0, 0.8)",
                  borderRadius: "8px",
                  textAlign: "center",
                  height: "100%",
                }}
                onClick={handleLogout}
              >
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div style={{ display: "flex", height: "100%" }}>
          <div className="SideBar">
            {[
              { icon: <Gear />, title: "Manage Content", route: "content" },
              { icon: <ImageAlt />, title: "Manage Image", route: "image" },
              {
                icon: <TicketPerforatedFill />,
                title: "Manage Booking",
                route: "booking",
              },
              {
                icon: <GiftFill />,
                title: "Manage GiftCard",
                route: "gift-card",
              },

              {
                icon: <Calendar2CheckFill />,
                title: "Manage Event",
                route: "event",
              },
              {
                icon: <PeopleFill />,
                title: "Manage User",
                route: "user",
              },
              {
                icon: <BarChartFill />,
                title: "Analytics",
                route: "sales",
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
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
