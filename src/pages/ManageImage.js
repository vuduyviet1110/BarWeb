import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Contents } from "../Fakeapi";

import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { useState } from "react";
function ManageImage() {
  const [beverageImages, setBeverageImages] = useState(Contents[2].Beverage);
  const [galleryImgs, setGalleryImgs] = useState(Contents[3].Gallery);

  return (
    <div
      style={{
        color: "rgb(161, 158, 158)",
        margin: "0 0 0 22px",
        height: "100vh",
      }}
    >
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>
          <h1
            style={{
              backgroundColor: "rgb(255, 255, 160)",
              display: "inline-block",
              padding: "2px",
              borderRadius: "8px",
              color: "rgb(197, 157, 87)",
              boxShadow: "20px -10px 19px",
              margin: "8px 0px 8px -4px",
            }}
          >
            Gallery
          </h1>
        </Form.Label>
        <div style={{ display: "flex" }}>
          <Row xs={1} md={4} className="g-4">
            {galleryImgs.map((photo, index) => (
              <Col key={index}>
                <h6>Name: {photo}</h6>
                <Form.Control type="file" />
                <Image width="20%" height="20%" src={photo} thumbnail />
              </Col>
            ))}
          </Row>
        </div>
      </Form.Group>
    </div>
  );
}

export default ManageImage;
