import { useState } from "react";
import "../assets/css/HomePage.css";
import barIntro from "../assets/images/barInto.mp4";
import { Breadcrumb, Image } from "react-bootstrap";
import ava from "../assets/images/events-bg.jpg";
function HomePage() {
  const [CurentUser, setCurrentUser] = useState(false);

  return (
    <div className="main">
      <div className="Topbar">
        <div id="topbar" class="d-flex align-items-center fixed-top">
          <div class="container d-flex justify-content-center justify-content-md-between">
            <div class="contact-info d-flex align-items-center">
              <i class="bi bi-phone d-flex align-items-center">
                <span>033 779 77595</span>
              </i>
              <i class="bi bi-clock d-flex align-items-center ms-4">
                <span> Mon-Sat: 11AM - 23PM</span>
              </i>
            </div>

            <div class="languages d-none d-md-flex align-items-center">
              <ul>
                <li>En</li>
                <li>
                  <a href="#">Vn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <header id="header" className="fixed-top d-flex align-items-cente">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
          <h1 className="logo me-auto me-lg-0">
            <a href="index.html" style={{ fontWeight: "800" }}>
              SWI:P
            </a>
          </h1>

          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  Our Story
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#menu">
                  Beverage
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#specials">
                  Order exclusive wine
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#events">
                  Events
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#chefs">
                  Bartenders
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#gallery">
                  Gallery
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#gallery">
                  Giftcard
                </a>
              </li>
              {/* <li className="dropdown">
                <a href="#">
                  <span>Drop Down</span> <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="#">Drop Down 1</a>
                  </li>
                  <li className="dropdown">
                    <a href="#">
                      <span>Deep Drop Down</span>{" "}
                      <i className="bi bi-chevron-right"></i>
                    </a>
                    <ul>
                      <li>
                        <a href="#">Deep Drop Down 1</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 2</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 3</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 4</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 5</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Drop Down 2</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 4</a>
                  </li>
                </ul>
              </li> */}
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

          {CurentUser ? (
            <div>
              <span>Welcome, Viet</span>
              <Image
                src={ava}
                roundedCircle
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "0 4px 0px 12px",
                }}
              />
            </div>
          ) : (
            <div>
              <Breadcrumb style={{ display: "flex", alignItems: "center" }}>
                <Breadcrumb.Item href="/sign-in">Sign in</Breadcrumb.Item>
                <Breadcrumb.Item href="/sign-up">Sign up</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          )}
        </div>
      </header>

      <section id="hero" className="d-flex align-items-center">
        <div
          className="container position-relative text-center text-lg-start"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="row">
            <div className="col-lg-8">
              <h1>
                Welcome to <span className="logoTitle">SWI:P</span>
              </h1>
              <h2>
                A space that gives you the most intimate experiences right in
                the heart of Hanoi's Old Quarter
              </h2>

              <div className="btns">
                <a
                  href="#book-a-table"
                  className="btn-book animated fadeInUp scrollto"
                >
                  Book a Table now !
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 d-flex align-items-center justify-content-center position-relative"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <a href={barIntro} className="glightbox play-btn">
                c
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
