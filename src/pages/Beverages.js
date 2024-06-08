import { useEffect, useState, useRef } from "react";
import { CupStraw, CurrencyExchange } from "react-bootstrap-icons";
import { request } from "../utils/request";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/Beverage.css";
import {
  faBeerMugEmpty,
  faBottleWater,
  faMartiniGlassCitrus,
  faWineBottle,
} from "@fortawesome/free-solid-svg-icons";
function Beverages() {
  const [beverages, setBeverages] = useState([]);
  const [filteredBeverages, setFilteredBeverages] = useState([]);
  const [currency, setCurrency] = useState(false);
  const [collection, setCollection] = useState([]);
  const controls = useAnimation();
  const isMounted = useRef(false);

  const bev_responsive = [
    {
      name: "Cocktails",
      icon: <FontAwesomeIcon icon={faMartiniGlassCitrus} />,
    },
    {
      name: "Beers",
      icon: <FontAwesomeIcon icon={faBeerMugEmpty} />,
    },
    { name: "Soda", icon: <FontAwesomeIcon icon={faWineBottle} /> },
    {
      name: "Minerals",
      icon: <FontAwesomeIcon icon={faBottleWater} />,
    },
  ];

  const ExchangeCurrenciesToVND = (amount) => {
    const vnd = amount * 24768;
    return vnd.toLocaleString("vi-VN") + " VND";
  };

  useEffect(() => {
    if (isMounted.current) {
      controls.start("show");
    }
  }, [filteredBeverages, controls]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get("/admin/beverage");
        setBeverages(res.data);
        setFilteredBeverages(res.data);
        setCollection(bev_responsive);
        if (!isMounted.current) {
          isMounted.current = true;
          controls.start("show");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [controls]);

  const gridContainterVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const gridBev = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const gallery_filter = (itemData) => {
    if (itemData === "all") {
      setFilteredBeverages(beverages);
      controls.start("show");
    } else {
      const filterData = beverages.filter((item) => item.type === itemData);
      setFilteredBeverages(filterData);
      controls.start("show");
    }
  };

  return (
    <section id="menu" className="menu section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Beverage</h2>
          <p>Check Our Beverage</p>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div
            style={{
              justifyContent: "center",
              display: "grid",
              alignItems: "center",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                margin: "0 0 20px 0",
              }}
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                whileFocus={{ backgroundColor: "brown" }}
                style={{
                  margin: "0 8px 0 0",
                  borderRadius: "8px",
                  padding: "6px 14px 6px 14px",
                }}
                onClick={() => gallery_filter("all")}
              >
                <span>All</span>
              </motion.button>

              {collection.map((item) => (
                <div
                  style={{
                    margin: "0 8px 0 8px",
                  }}
                  key={item.name}
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1, backgroundColor: "#d1d5db" }}
                    style={{
                      padding: "6px 14px 6px 14px",
                      borderRadius: "8px",
                    }}
                    onClick={() => gallery_filter(item.name)}
                  >
                    <span className="tab-icon">{item.icon}</span>
                    <span
                      style={{
                        margin: "0 4px 0 4px",
                      }}
                      className="tab-text"
                    >
                      {item.name}
                    </span>
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              style={{
                backgroundColor: "transparent",
                width: "5%",
                color: "white",
                border: "1px solid white",
              }}
              onClick={() => setCurrency(!currency)}
            >
              <CurrencyExchange />
            </motion.button>
          </div>
        </div>

        <motion.section
          initial="hidden"
          animate={controls}
          variants={gridContainterVariants}
          className="grid-container"
        >
          {filteredBeverages.map((b) => (
            <motion.div
              key={b.id}
              variants={gridBev}
              style={{ margin: "16px" }}
            >
              <img src={b.image} className="menu-img" alt="" />
              <div className="menu-content">
                <a href="">{b.name}</a>
                {currency ? (
                  <span>{ExchangeCurrenciesToVND(b.price)}</span>
                ) : (
                  <span>{b.price} $</span>
                )}
              </div>
              <div className="menu-ingredients">{b.description}</div>
            </motion.div>
          ))}
        </motion.section>
      </div>
    </section>
  );
}

export default Beverages;
