import { useState, useEffect } from "react";
import "../assets/css/HomePage.css";
import { Breadcrumb, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Isotope from "isotope-layout";
import AOS from "aos";
import { request } from "../utils/request";
import GLightbox from "glightbox";
import Swiper from "swiper";
import beverage1 from "../assets/images/beverage1.jpg";
import beverage2 from "../assets/images/beverage2.jpg";
import beverage4 from "../assets/images/beverage4.jpg";
import beverage5 from "../assets/images/beverage5.jpg";
import beverage6 from "../assets/images/beverage6.jpg";
import beverage7 from "../assets/images/beverage7.jpg";
import "swiper/css";
import { Link } from "react-router-dom";
import {
  ArrowRightCircle,
  ArrowUpShort,
  CurrencyExchange,
  Facebook,
  Instagram,
  TwitterX,
} from "react-bootstrap-icons";
import ChangePwd from "../common/ChangePwd";
import BookingTable from "../common/booking";
function HomePage() {
  const userId = parseInt(localStorage.getItem("user_token"));
  const [currency, setCurrency] = useState(false);
  const [titleContent, setTitleContent] = useState();
  const [ourStoryContent, setourStoryContent] = useState();
  const [gallery, setGallery] = useState();
  const [events, setEvents] = useState();
  const [beverage, setBeverage] = useState();
  const ExchangeCurrenciesToVND = (amount) => {
    const vnd = amount * 24768;
    return vnd.toLocaleString("vi-VN") + " VND";
  };
  const [CurentUser, setCurrentUser] = useState({});
  const handleLogout = () => {
    setCurrentUser({
      user_DOB: "",
      user_gmail: "",
      user_id: 0,
      user_name: "", // Thay đổi từ "user_nam" thành "user_name"
      user_password: "",
      user_phone: "",
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_token");
    console.log("log out");
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    const fetchApi = async () => {
      try {
        const res = await request.get(`/${userId}`);
        setCurrentUser(res.data);
        console.log(res.data); // Log dữ liệu từ API
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, [userId]);

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

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const restitle = await request.get("/admin/content/title");
        const resOurstory = await request.get("/admin/content/ourstory");
        setTitleContent(restitle.data[0]);
        setourStoryContent(resOurstory.data[0]);
        console.log(resOurstory.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get("/admin/gallery");
        setGallery(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get("/admin/event");
        setEvents(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get("/admin/beverage");
        setBeverage(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className="main">
      <div id="topbar" className="d-flex align-items-center fixed-top">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-phone d-flex align-items-center">
              <span>033 779 7759</span>
            </i>
            <i className="bi bi-clock d-flex align-items-center ms-4">
              <span> Mon-Sat: 6PM - 2AM</span>
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
                {CurentUser.user_id > 0 ? (
                  <Link to={{ pathname: "/gift-card", state: { CurentUser } }}>
                    Gift Card
                  </Link>
                ) : (
                  <Link to={{ pathname: "/sign-in" }}>Gift Card</Link>
                )}
              </li>

              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
          {CurentUser.user_id > 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#fff" }}>
                Welcome, {CurentUser.user_name}
              </span>
              <ChangePwd CurentUser={CurentUser} handleLogout={handleLogout} />
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

      <section
        id="hero"
        style={{
          background: `url(${titleContent?.image}) top/99%`,
        }}
        className="d-flex align-items-center"
      >
        <div
          className="container position-relative text-center text-lg-start"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="row">
            <div className="col-lg-8">
              <h1>
                Welcome to
                <span> {titleContent?.title || "Swip"}</span>
              </h1>

              <h2 style={{ maxWidth: "60%", margin: "16px 0 0 0 " }}>
                {titleContent?.content}
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
            ></div>
          </div>
        </div>
      </section>

      <main id="main">
        <section
          id="about"
          style={{
            background: `url(${ourStoryContent?.bgimage}) center/99%`,
          }}
          className="about"
        >
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div
                className="col-lg-6 order-1 order-lg-2"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="about-img">
                  <img src={ourStoryContent?.slideimage} alt="" />
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
                <h3>{ourStoryContent?.title}</h3>
                <p className="fst-italic">{ourStoryContent?.content}</p>
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
                  <li data-filter=".filter-specialty">Bear</li>
                  <li data-filter=".filter-salads">Soda and minerals</li>
                </ul>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "transparent",
                    width: "5%",
                    border: "1px solid white",
                  }}
                  onClick={() => setCurrency(!currency)}
                >
                  <CurrencyExchange></CurrencyExchange>
                </Button>
              </div>
            </div>

            <div
              className="row menu-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {beverage?.map((b) => (
                <div>
                  {b.type === "Cocktails" && (
                    <div className="col-lg-6 menu-item filter-starters">
                      <img src={b.image} className="menu-img" alt="" />
                      <div className="menu-content">
                        <a href="#">{b.name}</a>
                        {currency ? (
                          <span>{ExchangeCurrenciesToVND(b.price)}</span>
                        ) : (
                          <span>{b.price} $</span>
                        )}
                      </div>
                      <div className="menu-ingredients">{b.description}</div>
                    </div>
                  )}

                  {b.type === "Beers" && (
                    <div className="col-lg-6 menu-item filter-specialty">
                      <img src={b.image} className="menu-img" alt="" />
                      <div className="menu-content">
                        <a href="#">{b.name}</a>
                        {currency ? (
                          <span>{ExchangeCurrenciesToVND(b.price)}</span>
                        ) : (
                          <span>{b.price} $</span>
                        )}
                      </div>
                      <div className="menu-ingredients">{b.description}</div>
                    </div>
                  )}

                  {(b.type === "Soda" || b.type === "Minerals") && (
                    <div className="col-lg-6 menu-item filter-salads">
                      <img src={b.image} className="menu-img" alt="" />
                      <div className="menu-content">
                        <a href="#">{b.name}</a>
                        {currency ? (
                          <span>{ExchangeCurrenciesToVND(b.price)}</span>
                        ) : (
                          <span>{b.price} $</span>
                        )}
                      </div>
                      <div className="menu-ingredients">{b.description}</div>
                    </div>
                  )}
                </div>
              ))}
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
              {events?.map((event) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={event.image}
                    style={{
                      borderRadius: "14px",
                      objectFit: "cover",
                    }}
                    alt="First slide"
                  />
                  <Carousel.Caption
                    style={{
                      boxShadow: "2px 2px 5px 2px #333",
                      borderRadius: "8px",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    <div>
                      <div className="price">
                        <h3>{event.title}</h3>
                      </div>
                      <p className="fst-italic">{event.description}</p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </section>

        <BookingTable CurentUser={CurentUser} />

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
              {gallery?.map((img) => (
                <div key={img.img_id} className="col-lg-3 col-md-4">
                  <div className="gallery-item">
                    <div className="gallery-lightbox" data-gall="gallery-item">
                      <img
                        src={img.img}
                        alt={img.img_alt || "Image"}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
        </section>
      </main>

      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-6">
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
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <ArrowRightCircle />
                    <a style={{ margin: "0 0px 0 10px" }} href="#">
                      Home
                    </a>
                  </li>
                  <li>
                    <ArrowRightCircle />
                    <a style={{ margin: "0 0px 0 10px" }} href="#">
                      About us
                    </a>
                  </li>
                  <li>
                    <ArrowRightCircle />
                    <a style={{ margin: "0 0px 0 10px" }} href="#">
                      Services
                    </a>
                  </li>
                  <li>
                    <ArrowRightCircle />
                    <a style={{ margin: "0 0px 0 10px" }} href="#">
                      Term of service
                    </a>
                  </li>
                  <li>
                    <ArrowRightCircle />
                    <a style={{ margin: "0 0px 0 10px" }} href="#">
                      Privacy policy
                    </a>
                  </li>
                </ul>
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
