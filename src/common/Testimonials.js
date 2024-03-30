import React from "react";
import "../assets/css/HomePage.css";
import ava from "../assets/images/sign-in.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ChatLeftQuote, Quote } from "react-bootstrap-icons";
function Testimonials() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={2}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide
        style={{
          minHeight: "120px",
          minWidth: "80px",
          backgroundColor: "#cda452",
          padding: " 8px",
          borderRadius: "16px",
        }}
      >
        <div>
          <Quote
            style={{
              color: "brown",
              margin: "-8px  8px 0 0",
            }}
          />
          <span style={{}}>
            I'm happy to be here. The atmosphere is awesome!I'm happy to be
            here. The atmosphere is awesomeI'm happy to be here. The atmosphere
            is awesomeI'm happy to be here. The atmosphere is awesome
          </span>
          <Quote
            style={{
              transform: " rotate(180deg)",
              margin: "-8px 0 0 8px",
              color: "brown",
            }}
          />
        </div>

        <div style={{ display: "flex" }}>
          <img
            src={ava}
            style={{
              margin: "8px 30px",
              height: "140px",
              width: "140px",
              borderRadius: "50%",
              border: "10px solid lightgrey",
            }}
            alt=""
          ></img>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "16px" }}
          >
            <h5>Saul Doolman</h5>
            <span>Designer</span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide
        style={{
          minHeight: "120px",
          minWidth: "80px",
          backgroundColor: "#cda452",
          padding: " 8px",
          borderRadius: "16px",
        }}
      >
        <div>
          <Quote
            style={{
              color: "brown",
              margin: "-8px  8px 0 0",
            }}
          />
          <span style={{}}>
            I'm happy to be here. The atmosphere is awesome!I'm happy to be
            here. The atmosphere is awesomeI'm happy to be here. The atmosphere
            is awesomeI'm happy to be here. The atmosphere is awesome
          </span>
          <Quote
            style={{
              transform: " rotate(180deg)",
              margin: "-8px 0 0 8px",
              color: "brown",
            }}
          />
        </div>

        <div style={{ display: "flex" }}>
          <img
            src={ava}
            style={{
              margin: "8px 30px",
              height: "140px",
              width: "140px",
              borderRadius: "50%",
              border: "10px solid lightgrey",
            }}
            alt=""
          ></img>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "16px" }}
          >
            <h5>Saul Doolman</h5>
            <span>Designer</span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide
        style={{
          minHeight: "120px",
          minWidth: "80px",
          backgroundColor: "#cda452",
          padding: " 8px",
          borderRadius: "16px",
        }}
      >
        <div>
          <Quote
            style={{
              color: "brown",
              margin: "-8px  8px 0 0",
            }}
          />
          <span style={{}}>
            I'm happy to be here. The atmosphere is awesome!I'm happy to be
            here. The atmosphere is awesomeI'm happy to be here. The atmosphere
            is awesomeI'm happy to be here. The atmosphere is awesome
          </span>
          <Quote
            style={{
              transform: " rotate(180deg)",
              margin: "-8px 0 0 8px",
              color: "brown",
            }}
          />
        </div>

        <div style={{ display: "flex" }}>
          <img
            src={ava}
            style={{
              margin: "8px 30px",
              height: "140px",
              width: "140px",
              borderRadius: "50%",
              border: "10px solid lightgrey",
            }}
            alt=""
          ></img>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "16px" }}
          >
            <h5>Saul Doolman</h5>
            <span>Designer</span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide
        style={{
          minHeight: "120px",
          minWidth: "80px",
          backgroundColor: "#cda452",
          padding: " 8px",
          borderRadius: "16px",
        }}
      >
        <div>
          <Quote
            style={{
              color: "brown",
              margin: "-8px  8px 0 0",
            }}
          />
          <span style={{}}>
            I'm happy to be here. The atmosphere is awesome!I'm happy to be
            here. The atmosphere is awesomeI'm happy to be here. The atmosphere
            is awesomeI'm happy to be here. The atmosphere is awesome
          </span>
          <Quote
            style={{
              transform: " rotate(180deg)",
              margin: "-8px 0 0 8px",
              color: "brown",
            }}
          />
        </div>

        <div style={{ display: "flex" }}>
          <img
            src={ava}
            style={{
              margin: "8px 30px",
              height: "140px",
              width: "140px",
              borderRadius: "50%",
              border: "10px solid lightgrey",
            }}
            alt=""
          ></img>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "16px" }}
          >
            <h5>Saul Doolman</h5>
            <span>Designer</span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Testimonials;
