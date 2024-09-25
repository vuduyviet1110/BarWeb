import { useState, useEffect, useRef } from "react";
import "../assets/css/HomePage.css";
import { Breadcrumb } from "react-bootstrap";
import AOS from "aos";
import { request } from "../utils/request";
import Swiper from "swiper";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import "swiper/css";
import { Link } from "react-router-dom";
import {
  ArrowRightCircle,
  ArrowUpShort,
  Facebook,
  Instagram,
  TwitterX,
} from "react-bootstrap-icons";
import ChangePwd from "../common/ChangePwd";
import BookingTable from "../common/components/booking";
import Beverages from "./Beverages";
import { useSelector } from "react-redux";
import { createAxios } from "../utils/AxiosInstance";
import { useDispatch } from "react-redux";
import { logoutFailed, logoutStart, logoutSuccess } from "../redux/authSlice";
import FallBackPage from "../common/FallBackPage";
import Gallery from "../common/components/gallery";
import Event from "../common/components/events";
import Contact from "../common/components/contact";
function HomePage() {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.auth.login.currentUser);
  const user = useSelector(
    (state) => state.auth.login?.currentUser?.matched_user
  );
  // const token = useSelector(
  //   (state) => state.auth.login.currentUser?.accessToken
  // );
  const [titleContent, setTitleContent] = useState();
  const [ourStoryContent, setourStoryContent] = useState();
  const [gallery, setGallery] = useState();
  const [events, setEvents] = useState();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const mainControls = useAnimation();
  // let axiosJWT = createAxios(data, dispatch, logoutSuccess);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100", "0%"]
  );

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  });

  const handleLogout = async () => {
    dispatch(logoutStart());
    try {
      await request.post("/auth/log-out");
      window.location.reload();
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailed());
    }
  };

  //gọi refresh token để tạo access_token và refresh_token mới

  useEffect(() => {
    if (!user?.user_id || !user) {
      return;
    }
    const fetchApi = async () => {
      try {
        const res = await request.get(`${user.user_id}`);
        console.log(res.data); // Log dữ liệu từ API
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, [user?.user_id, user]);

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
              <Link to="/login">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  style={{ padding: "0 4px" }}
                  whileFocus={{ backgroundColor: "brown" }}
                >
                  Management for Admin
                </motion.button>
              </Link>
            </ul>

            <ul style={{ marginLeft: "24px" }}>
              <li>En</li>
              <li>
                <a href="#section-id">VN</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <header id="header" className="fixed-top d-flex align-items-cente">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
          <h1 className="logo me-auto me-lg-0">
            <a href="/" style={{ fontWeight: "800" }}>
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
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                {user?.user_id > 0 ? (
                  <Link to={{ pathname: "/gift-card", state: { user } }}>
                    Gift Card
                  </Link>
                ) : (
                  <Link to={{ pathname: "/sign-in" }}>Gift Card</Link>
                )}
              </li>
              {user?.user_id > 1 && (
                <li>
                  <Link
                    to="/gift-card/orders"
                    style={{
                      margin: "0 0 0 0",
                      color: "white",
                      width: "40%",
                      cursor: "pointer",
                      transition: "color 0.2s ease-in-out",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#664d03")
                    } // Hover effect
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "white")
                    }
                  >
                    Orders
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          {user?.user_id > 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#fff" }}>Welcome, {user?.user_name}</span>
              <ChangePwd CurentUser={user} handleLogout={handleLogout} />
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

      {titleContent || ourStoryContent || gallery || events ? (
        <div>
          <section
            id="hero"
            style={{
              background: `url(${titleContent?.image}) top/99% `,
            }}
            className="d-flex align-items-center custom-background"
          >
            <div
              className="container position-relative text-center text-lg-start"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="row">
                <div className="col-lg-8">
                  <h1 className="d-none d-lg-block">
                    Welcome to
                    <span> {titleContent?.title || "Swip"}</span>
                  </h1>

                  <h2
                    className="d-none d-lg-block"
                    style={{ maxWidth: "60%", margin: "16px 0 0 0 " }}
                  >
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
                background: `url(${ourStoryContent?.bgimage}) center/100%`,
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
                    ref={containerRef}
                    className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"
                    data-aos-delay="100"
                    style={{
                      backgroundColor: "rgba(0,0,0, 0.3)",
                      fontSize: "18px",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  >
                    <motion.h2
                      animate="visible"
                      initial="hidden"
                      variants={{
                        hidden: { opacity: 0, y: 75 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {ourStoryContent?.title}
                    </motion.h2>
                    <motion.p
                      // style={{ translateX: paragraphOneValue }}
                      className="fst-italic"
                    >
                      {ourStoryContent?.content}
                    </motion.p>
                  </div>
                </div>
              </div>
            </section>

            <Beverages />
            <div style={{ padding: "40px 0 0 0" }}>
              <Event events={events} />
            </div>
            <div style={{ padding: "40px 0 0 0" }}>
              <BookingTable />
            </div>
            <div style={{ padding: "40px 0 0 0" }}>
              <Gallery gallery={gallery} />
            </div>
            <div style={{ padding: "40px 0 0 0" }}>
              <Contact />
            </div>
          </main>
        </div>
      ) : (
        <FallBackPage />
      )}

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
