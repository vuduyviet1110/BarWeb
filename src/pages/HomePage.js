import { useState, useEffect } from "react";
import "../assets/css/HomePage.css";
import { Breadcrumb, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import anhquaybar from "../assets/images/anhquaybar.jpg";
import christmas from "../assets/images/christmas.jpg";
import countDown from "../assets/images/countdown.jpg";
import supriseMoment from "../assets/images/supriseMoment.jpg";
import talkingincouter from "../assets/images/talkingincouter.jpg";
import Isotope from "isotope-layout";
import AOS from "aos";
import GLightbox from "glightbox";
import Swiper from "swiper";
import beverage1 from "../assets/images/beverage1.jpg";
import beverage2 from "../assets/images/beverage2.jpg";
import beverage4 from "../assets/images/beverage4.jpg";
import beverage5 from "../assets/images/beverage5.jpg";
import beverage6 from "../assets/images/beverage6.jpg";
import beverage7 from "../assets/images/beverage7.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "swiper/css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { changePwd, selectUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import {
  ArrowUpShort,
  Facebook,
  Instagram,
  TwitterX,
} from "react-bootstrap-icons";
import Testimonials from "../common/Testimonials";

function HomePage() {
  const { user } = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch();
  const [CurentUser, setCurrentUser] = useState(
    Array.isArray(user) ? "" : user
  );
  const [showModalChangePwd, setModalChangePwd] = useState(false);
  const [invalidOldPwd, setInvalidOldPwd] = useState();
  console.log(CurentUser);
  const handleClose = () => {
    setModalChangePwd(false);
  };
  const handleSaveChanges = () => {
    if (invalidOldPwd) {
      setModalChangePwd(true);
    } else {
      dispatch(changePwd(CurentUser));
      console.log(CurentUser);
      setModalChangePwd(false);
      alert("Your password is succesfully changed");
    }
  };
  const handleShow = () => setModalChangePwd(true);
  const handleOldPwd = (e) => {
    // fetch data từ database để xem người dùng có nhập đúng mật khẩu không
    if (user.password !== e.target.value) {
      setInvalidOldPwd(true);
    } else {
      setInvalidOldPwd(false);
    }
  };

  useEffect(() => {
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all);
      if (selectEl) {
        if (all) {
          selectEl.forEach((e) => e.addEventListener(type, listener));
        } else {
          selectEl.addEventListener(type, listener);
        }
      }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
      el.addEventListener("scroll", listener);
    };

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          navbarlink.classList.add("active");
        } else {
          navbarlink.classList.remove("active");
        }
      });
    };
    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select("#header");
      let offset = header.offsetHeight;

      let elementPos = select(el).offsetTop;
      window.scrollTo({
        top: elementPos - offset,
        behavior: "smooth",
      });
    };

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select("#header");
    let selectTopbar = select("#topbar");
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add("header-scrolled");
          if (selectTopbar) {
            selectTopbar.classList.add("topbar-scrolled");
          }
        } else {
          selectHeader.classList.remove("header-scrolled");
          if (selectTopbar) {
            selectTopbar.classList.remove("topbar-scrolled");
          }
        }
      };
      window.addEventListener("load", headerScrolled);
      onscroll(document, headerScrolled);
    }

    /**
     * Back to top button
     */
    let backtotop = select(".back-to-top");
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add("active");
        } else {
          backtotop.classList.remove("active");
        }
      };
      window.addEventListener("load", toggleBacktotop);
      onscroll(document, toggleBacktotop);
    }

    /**
     * Mobile nav toggle
     */
    on("click", ".mobile-nav-toggle", function (e) {
      select("#navbar").classList.toggle("navbar-mobile");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });

    /**
     * Mobile nav dropdowns activate
     */
    on(
      "click",
      ".navbar .dropdown > a",
      function (e) {
        if (select("#navbar").classList.contains("navbar-mobile")) {
          e.preventDefault();
          this.nextElementSibling.classList.toggle("dropdown-active");
        }
      },
      true
    );

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on(
      "click",
      ".scrollto",
      function (e) {
        if (select(this.hash)) {
          e.preventDefault();

          let navbar = select("#navbar");
          if (navbar.classList.contains("navbar-mobile")) {
            navbar.classList.remove("navbar-mobile");
            let navbarToggle = select(".mobile-nav-toggle");
            navbarToggle.classList.toggle("bi-list");
            navbarToggle.classList.toggle("bi-x");
          }
          scrollto(this.hash);
        }
      },
      true
    );

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener("load", () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash);
        }
      }
    });

    /**
     * Preloader
     */
    let preloader = select("#preloader");
    if (preloader) {
      window.addEventListener("load", () => {
        preloader.remove();
      });
    }

    /**
     * Menu isotope and filter
     */
    window.addEventListener("load", () => {
      let menuContainer = select(".menu-container");
      if (menuContainer) {
        let menuIsotope = new Isotope(menuContainer, {
          itemSelector: ".menu-item",
          layoutMode: "fitRows",
        });

        let menuFilters = select("#menu-flters li", true);

        on(
          "click",
          "#menu-flters li",
          function (e) {
            e.preventDefault();
            menuFilters.forEach(function (el) {
              el.classList.remove("filter-active");
            });
            this.classList.add("filter-active");

            menuIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            menuIsotope.on("arrangeComplete", function () {
              AOS.refresh();
            });
          },
          true
        );
      }
    });

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
      selector: ".glightbox",
    });

    /**
     * Events slider
     */
    new Swiper(".events-slider", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });

    /**
     * Testimonials slider
     */
    new Swiper(".testimonials-slider", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });

    /**
     * Initiate gallery lightbox
     */
    const galleryLightbox = GLightbox({
      selector: ".gallery-lightbox",
    });

    /**
     * Animation on scroll
     */
    window.addEventListener("load", () => {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    });
  }, []);
  return (
    <div className="main">
      <div id="topbar" className="d-flex align-items-center fixed-top">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-phone d-flex align-items-center">
              <span>+1 5589 55488 55</span>
            </i>
            <i className="bi bi-clock d-flex align-items-center ms-4">
              <span> Mon-Sat: 11AM - 23PM</span>
            </i>
          </div>

          <div className="languages d-none d-md-flex align-items-center">
            <ul>
              <li>En</li>
              <li>
                <a href="#">VN</a>
              </li>
            </ul>
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
                <a className="nav-link scrollto" href="#events">
                  Events
                </a>
              </li>

              <li>
                <a className="nav-link scrollto" href="#gallery">
                  Gallery
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/gift-card">
                  Giftcard
                </a>
              </li>

              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
          {CurentUser ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#fff" }}>Welcome, {user.email} </span>
              <Dropdown>
                <Dropdown.Toggle
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  <Image
                    src={talkingincouter}
                    roundedCircle
                    style={{
                      width: "40px",
                      height: "40px",
                      margin: "0 4px 0px 12px",
                    }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <div>
                      <Button
                        style={{
                          backgroundColor: "transparent",
                          color: "black",
                          border: "none",
                        }}
                        onClick={handleShow}
                      >
                        Change Password
                      </Button>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        color: "black",
                        border: "none",
                      }}
                    >
                      <Link
                        to={{ pathname: "/profile", state: { CurentUser } }}
                      >
                        Edit Profile
                      </Link>
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCurrentUser()} href="">
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        color: "black",
                        border: "none",
                      }}
                    >
                      Log Out
                    </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
                <Modal show={showModalChangePwd} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ color: "brown" }}>
                      Change Your Password
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ color: "brown" }}>
                    <Form.Label htmlFor="oldPwd">
                      Your Current Password
                    </Form.Label>

                    <Form.Control
                      onChange={handleOldPwd}
                      placeholder="Old Password"
                      type="password"
                    />
                    {invalidOldPwd && (
                      <div style={{ color: "red" }}>
                        Your Password is not correct
                      </div>
                    )}
                    <Form.Label htmlFor="NewPwd">Your New Password</Form.Label>
                    <Form.Control
                      onChange={(e) =>
                        setCurrentUser((prevInfo) => ({
                          ...prevInfo,
                          password: e.target.value,
                        }))
                      }
                      placeholder="New Password"
                      type="password"
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      style={{ backgroundColor: "brown" }}
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Dropdown>
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
                Welcome to <span>SWI:P</span>
              </h1>
              <h2>A space that gives you the most intimate experiences</h2>
              <h2>right in the heart of Hanoi's Old Quarter</h2>

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
            ></div>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div
                className="col-lg-6 order-1 order-lg-2"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="about-img">
                  <img src={anhquaybar} alt="" />
                </div>
              </div>
              <div
                className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"
                data-aos-delay="100"
                style={{
                  backgroundColor: "rgba(0,0,0, 0.3)",
                  fontSize: "18px",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              >
                <h3>
                  Voluptatem dignissimos provident quasi corporis voluptates sit
                  assumenda.
                </h3>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Duis aute irure dolor
                    in reprehenderit in voluptate velit.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate trideta storacalaperda mastiro
                    dolore eu fugiat nulla pariatur.
                  </li>
                </ul>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="menu section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Beverage</h2>
              <p>Check Our Beverage</p>
            </div>

            <div className="row" data-aos="fade-up" data-aos-delay="100">
              <div className="col-lg-12 d-flex justify-content-center">
                <ul id="menu-flters">
                  <li data-filter="*" className="filter-active">
                    All
                  </li>
                  <li data-filter=".filter-starters">Cooktail</li>
                  <li data-filter=".filter-salads">Bear</li>
                  <li data-filter=".filter-specialty">Soda and minerals</li>
                </ul>
              </div>
            </div>

            <div
              className="row menu-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="col-lg-6 menu-item filter-starters">
                <img src={beverage1} className="menu-img" alt="" />
                <div className="menu-content">
                  <a href="#">Beverage 1</a>
                  <span>$5.95</span>
                </div>
                <div className="menu-ingredients">
                  Lorem, deren, trataro, filede, nerada
                </div>
              </div>

              <div className="col-lg-6 menu-item filter-specialty">
                <img src={beverage2} className="menu-img" alt="" />
                <div className="menu-content">
                  <a href="#">Bread Barrel</a>
                  <span>$6.95</span>
                </div>
                <div className="menu-ingredients">
                  Lorem, deren, trataro, filede, nerada
                </div>
              </div>

              <div className="col-lg-6 menu-item filter-starters">
                <img src={beverage7} className="menu-img" alt="" />
                <div className="menu-content">
                  <a href="#">Crab Cake</a>
                  <span>$7.95</span>
                </div>
                <div className="menu-ingredients">
                  A delicate crab cake served on a toasted roll with lettuce and
                  tartar sauce
                </div>
              </div>

              <div className="col-lg-6 menu-item filter-salads">
                <img src={beverage4} className="menu-img" alt="" />
                <div className="menu-content">
                  <a href="#">Caesar Selections</a>
                  <span>$8.95</span>
                </div>
                <div className="menu-ingredients">
                  Lorem, deren, trataro, filede, nerada
                </div>
              </div>

              <div className="col-lg-6 menu-item filter-specialty">
                <img src={beverage5} className="menu-img" alt="" />
                <div className="menu-content">
                  <a href="#">Tuscan Grilled</a>
                  <span>$9.95</span>
                </div>
                <div className="menu-ingredients">
                  Grilled chicken with provolone, artichoke hearts, and roasted
                  red pesto
                </div>
              </div>

              <div className="col-lg-6 menu-item filter-starters">
                <img src={beverage6} className="menu-img" alt="" />
                <div className="menu-content">
                  <a href="#">Mozzarella Stick</a>
                  <span>$4.95</span>
                </div>
                <div className="menu-ingredients">
                  Lorem, deren, trataro, filede, nerada
                </div>
              </div>

              <div className="col-lg-6 menu-item filter-salads">
                <img src={beverage7} className="menu-img" alt="" />
                <div className="menu-content">
                  <a href="#">Greek Salad</a>
                  <span>$9.95</span>
                </div>
                <div className="menu-ingredients">
                  Fresh spinach, crisp romaine, tomatoes, and Greek olives
                </div>
              </div>

              <div className="col-lg-6 menu-item filter-salads">
                <img src={beverage1} className="menu-img" alt="" />
                <div className="menu-content">
                  <a href="#">Spinach Salad</a>
                  <span>$9.95</span>
                </div>
                <div className="menu-ingredients">
                  Fresh spinach with mushrooms, hard boiled egg, and warm bacon
                  vinaigrette
                </div>
              </div>

              <div className="col-lg-6 menu-item filter-specialty">
                <img src={beverage2} className="menu-img" alt="" />
                <div className="menu-content">
                  <a href="#">Lobster Roll</a>
                  <span>$12.95</span>
                </div>
                <div className="menu-ingredients">
                  Plump lobster meat, mayo and crisp lettuce on a toasted bulky
                  roll
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="events">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Events</h2>
              <p>Organize Your Events in our Bar</p>
            </div>

            <Carousel data-bs-theme="light">
              <Carousel.Item style={{ display: "flex" }}>
                <img
                  style={{ width: "250px", height: "650px" }}
                  className="d-block w-100"
                  src={christmas}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <div
                    style={{
                      boxShadow: "2px 2px 5px 2px #333 inset",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="price">
                      <h3>Birthday Parties</h3>
                      <p>
                        <span>$189</span>
                      </p>
                    </div>
                    <p className="fst-italic">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>

                    <p>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur
                    </p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={countDown}
                  style={{ width: "250px", height: "650px" }}
                  alt="Second slide"
                />
                <Carousel.Caption
                  style={{
                    boxShadow: "2px 2px 5px 2px #333 inset",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <div className="price">
                      <h3>Count Down</h3>
                      <p>
                        <span>$189</span>
                      </p>
                    </div>
                    <p className="fst-italic">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>

                    <p>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur
                    </p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={supriseMoment}
                  alt="Third slide"
                  style={{ width: "250px", height: "650px" }}
                />
                <Carousel.Caption
                  style={{
                    boxShadow: "2px 2px 5px 2px #333 inset",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <div className="price">
                      <h3>Birthday Parties</h3>
                      <p>
                        <span>$189</span>
                      </p>
                    </div>
                    <p className="fst-italic">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>

                    <p>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur
                    </p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>

        <section id="book-a-table" className="book-a-table">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Reservation</h2>
              <p>Book a Table</p>
            </div>

            <form
              action="forms/book-a-table.php"
              method="post"
              role="form"
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="row">
                <div className="col-lg-4 col-md-6 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    data-rule="email"
                    data-msg="Please enter a valid email"
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    placeholder="Your Phone"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <input
                    type="text"
                    name="date"
                    className="form-control"
                    id="date"
                    placeholder="Date"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="time"
                    id="time"
                    placeholder="Time"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <input
                    type="number"
                    className="form-control"
                    name="people"
                    id="people"
                    placeholder="# of people"
                    data-rule="minlen:1"
                    data-msg="Please enter at least 1 chars"
                  />
                  <div className="validate"></div>
                </div>
              </div>
              <div className="form-group mt-3">
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  placeholder="Message"
                ></textarea>
                <div className="validate"></div>
              </div>
              <div className="mb-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">
                  Your booking request was sent. We will call back or send an
                  Email to confirm your reservation. Thank you!
                </div>
              </div>
              <div className="text-center">
                <button type="submit">Book a Table</button>
              </div>
            </form>
          </div>
        </section>
        <section id="testimonials" className="testimonials section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Testimonials</h2>
              <p>What they're saying about us</p>
            </div>
            <Testimonials />
          </div>
        </section>

        <section id="gallery" className="gallery">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Gallery</h2>
              <p>Some photos from Our Bar</p>
            </div>
          </div>

          <div
            className="container-fluid"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="row g-0">
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <div className="gallery-lightbox" data-gall="gallery-item">
                    <img src={beverage1} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <div className="gallery-lightbox" data-gall="gallery-item">
                    <img src={beverage2} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <div className="gallery-lightbox" data-gall="gallery-item">
                    <img src={beverage4} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <div className="gallery-lightbox" data-gall="gallery-item">
                    <img src={beverage6} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <div className="gallery-lightbox" data-gall="gallery-item">
                    <img src={beverage5} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <div className="gallery-lightbox" data-gall="gallery-item">
                    <img src={beverage4} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <div className="gallery-lightbox" data-gall="gallery-item">
                    <img src={beverage1} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <div className="gallery-lightbox" data-gall="gallery-item">
                    <img src={beverage2} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Contact</h2>
              <p>Contact Us</p>
            </div>
          </div>

          <div data-aos="fade-up">
            <iframe
              style={{ border: "0 ", width: "100%", height: "350px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0029641234432!2d105.848146!3d21.032567399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5af3fc6599%3A0x71b6c0b7fd60df54!2sSWI%3AP%20Speakeasy%20bar!5e0!3m2!1sen!2s!4v1710955715155!5m2!1sen!2s"
              frameborder="0"
              allowFullScreen
            ></iframe>
          </div>

          <div className="container" data-aos="fade-up">
            <div className="row mt-5">
              <div className="col-lg-4">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>

                  <div className="open-hours">
                    <i className="bi bi-clock"></i>
                    <h4>Open Hours:</h4>
                    <p>Monday-Saturday: 11:00 AM - 2300 PM</p>
                  </div>

                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>info@example.com</p>
                  </div>

                  <div className="phone">
                    <i className="bi bi-phone"></i>
                    <h4>Call:</h4>
                    <p>+1 5589 55488 55s</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 mt-5 mt-lg-0">
                <form
                  action="forms/contact.php"
                  method="post"
                  role="form"
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="8"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="footer-info">
                  <h3>SWI:P</h3>
                  <p style={{ fontSize: "16px" }}>
                    <strong>Address:</strong> 20 Hang Non st, Hà Nội, Việt Nam,
                    <div></div>
                    <strong>Phone:</strong> 033 779 7759 <div></div>
                    <strong>Email:</strong> info@example.com
                  </p>
                  <div className="social-links mt-3">
                    <Link to="#" className="twitter">
                      <TwitterX />
                    </Link>
                    <Link
                      to="https://www.facebook.com/swipspeakeasybar"
                      className="facebook"
                    >
                      <Facebook />
                    </Link>
                    <Link to="#" className="instagram">
                      <Instagram />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i> <a href="#">Home</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Terms of service</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Privacy policy</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Web Design</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Web Development</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Product Management</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Marketing</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Graphic Design</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>Our Newsletter</h4>
                <p>
                  Tamen quem nulla quae legam multos aute sint culpa legam
                  noster magna
                </p>
                <form action="" method="post">
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright">
            &copy; Copyright
            <strong>
              <span> SWI:P </span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits"></div>
        </div>
      </footer>

      {/* <div id="preloader"></div> */}
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <ArrowUpShort color="brown" size={96} />
      </a>
    </div>
  );
}

export default HomePage;
