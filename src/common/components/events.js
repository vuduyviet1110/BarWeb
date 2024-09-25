import Carousel from "react-bootstrap/Carousel";

function Event({ events }) {
  return (
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
  );
}

export default Event;
