import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Col, Image, Row } from "react-bootstrap";
import { request } from "../utils/request";
import { useParams } from "react-router-dom";

function ManageEvent() {
  const { id } = useParams();
  const [sucess, setSucess] = useState();
  const [isEmpty, setisEmpty] = useState();
  const [currentEventIndex, setcurrentEventIndex] = useState();
  const [events, setEvents] = useState([
    {
      event_id: 3,
      admin_id: 3,
      description: "this is desctiption for event 3",
      title: "event 3",
      image:
        "https://res.cloudinary.com/dyapfszsy/image/upload/v1715709421/bar_website/supriseMoment_kobsgd.jpg",
    },
  ]);
  const HandleUpdate = async (index) => {
    const updatingEvent = events.find((e) => e.event_id === index);
    console.log(updatingEvent);

    const formData = new FormData();
    formData.append("content", updatingEvent.description);
    formData.append("title", updatingEvent.title);
    formData.append("event_id", updatingEvent.event_id);
    formData.append("image", updatingEvent.image); // Thêm tệp tin vào FormData
    formData.append("admin_id", id); // Thêm tệp tin vào FormData
    const isAnyFieldEmpty = Object.values(updatingEvent).some(
      (value) => value === "" || value === 0 || value === "undefined"
    );
    if (!isAnyFieldEmpty) {
      const res = await request.put("/admin/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for FormData
        },
      });
      if (res.data === "success") {
        setSucess(true);
        setTimeout(() => {
          setSucess(false);
        }, 3000);
        setcurrentEventIndex(index);
        setisEmpty(false);
      }
    } else {
      setcurrentEventIndex(index);
      setisEmpty(true);
    }
  };
  const HandleImgChange = (e, eventId) => {
    const file = e.target.files[0];
    if (file) {
      setEvents((prevEvents) => {
        const newEvents = [...prevEvents];
        const eventIndex = newEvents.findIndex(
          (event) => event.event_id === eventId
        );
        console.log(eventIndex);
        if (eventIndex !== -1) {
          newEvents[eventIndex] = { ...newEvents[eventIndex], image: file };
        }
        return newEvents;
      });
    }
  };

  const handleTitlesChange = (e, index) => {
    const updatedEvents = [...events]; // Tạo bản sao của mảng events
    updatedEvents[index - 1].title = e.target.value; // Cập nhật title của sự kiện tại index
    setEvents(updatedEvents); // Cập nhật lại state events
  };

  const handleDesChange = (e, index) => {
    const updatedEvents = [...events]; // Tạo bản sao của mảng events
    updatedEvents[index - 1].description = e.target.value; // Cập nhật description của sự kiện tại index
    setEvents(updatedEvents); // Cập nhật lại state events
  };

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
    <div style={{ margin: "16px", color: "#c59d5a" }}>
      <Row xs={1} md={2} className="g-4">
        {events.map((event) => (
          <Col key={event.event_id}>
            <h1>Event: {event.event_id}</h1>
            <h2>Title:</h2>
            <InputGroup className="mb-3">
              <Form.Control
                aria-describedby="basic-addon2"
                value={event.title}
                onChange={(e) => handleTitlesChange(e, event.event_id)}
              />
            </InputGroup>

            <h2> Description: </h2>
            <InputGroup className="mb-3">
              <Form.Control
                value={event.description}
                as="textarea"
                style={{ height: "120px" }}
                placeholder="A space that gives you the most intimate experiences right in the heart of Hanoi's Old Quarter"
                aria-label="SWI:P"
                onChange={(e) => handleDesChange(e, event.event_id)}
              />
            </InputGroup>

            <div>
              <h2> Photo: </h2>
              <Form.Control
                type="file"
                onChange={(e) => HandleImgChange(e, event.event_id)}
              />
              <Image width="20%" height="20%" src={event.image} thumbnail />
            </div>
            {console.log(currentEventIndex, "và", event.event_id)}
            {isEmpty && currentEventIndex === event.event_id && (
              <div>Please complete all the fields</div>
            )}
            {sucess && currentEventIndex === event.event_id && (
              <div style={{ color: "green", fontSize: "30px" }}>
                Sucessfully updated!!!
              </div>
            )}
            <Button
              onClick={() => HandleUpdate(event.event_id)}
              style={{
                backgroundColor: "#c59d5a",
                width: "20%",
                margin: "16px 0 0 0 ",
              }}
              id="button-addon2"
            >
              Update
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ManageEvent;
