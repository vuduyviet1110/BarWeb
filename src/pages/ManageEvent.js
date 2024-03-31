import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Contents } from "../Fakeapi";
import { Col, Image, Row } from "react-bootstrap";

function ManageEvent() {
  const [events, setEvents] = useState(Contents[4].Events);

  console.log(events);
  const handleRemoveEvent = (indexToRemove) => {
    const updatedEvents = [...events];
    updatedEvents.splice(indexToRemove, 1);
    setEvents(updatedEvents);
  };

  const handleTitlesChange = (e, index) => {
    const updatedEvents = [...events]; // Tạo bản sao của mảng events
    updatedEvents[index].title = e.target.value; // Cập nhật title của sự kiện tại index
    setEvents(updatedEvents); // Cập nhật lại state events
  };

  const handleDesChange = (e, index) => {
    const updatedEvents = [...events]; // Tạo bản sao của mảng events
    updatedEvents[index].description = e.target.value; // Cập nhật description của sự kiện tại index
    setEvents(updatedEvents); // Cập nhật lại state events
  };

  const handleAddEvents = () => {
    const newEvent = {
      id: "",
      title: "",
      description: "",
      photo: "",
    };

    setEvents([...events, newEvent]);
  };

  return (
    <div style={{ margin: "16px", color: "#c59d5a" }}>
      <Row xs={1} md={2} className="g-4">
        {events.map((event, index) => (
          <Col key={index}>
            <h1>
              Event: {event.eventID}
              <Button
                style={{
                  backgroundColor: "rgb(169 43 43 / 80%)",
                  border: "none",
                  margin: "14px",
                  width: "10%",
                }}
                onClick={() => handleRemoveEvent(index)}
              >
                X
              </Button>
            </h1>
            <h2>Title:</h2>
            <InputGroup className="mb-3">
              <Form.Control
                aria-describedby="basic-addon2"
                value={event.title}
                onChange={(e) => handleTitlesChange(e, index)}
              />
              <Button
                style={{ backgroundColor: "#c59d5a" }}
                onClick={() => console.log(events)}
                id="button-addon2"
              >
                Update
              </Button>
            </InputGroup>

            <h2> Description: </h2>
            <InputGroup className="mb-3">
              <Form.Control
                value={event.description}
                as="textarea"
                style={{ height: "120px" }}
                placeholder="A space that gives you the most intimate experiences right in the heart of Hanoi's Old Quarter"
                aria-label="SWI:P"
                onChange={(e) => handleDesChange(e, index)}
              />
              <Button
                onClick={() => console.log(events)}
                style={{ backgroundColor: "#c59d5a" }}
                id="button-addon2"
              >
                Update
              </Button>
            </InputGroup>

            <h2> Photo: </h2>
            <Form.Control type="file" />
            <Image width="20%" height="20%" src={event.photo} thumbnail />
          </Col>
        ))}
      </Row>
      <Button
        style={{
          backgroundColor: "rgb(169 43 43 / 80%)",
          border: "none",
          margin: "14px 0",
          width: "20%",
        }}
        onClick={handleAddEvents}
      >
        + Add An Event
      </Button>
    </div>
  );
}

export default ManageEvent;
