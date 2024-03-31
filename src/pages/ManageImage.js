import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Contents } from "../Fakeapi";

import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { useState } from "react";
function ManageImage() {
  const [homeImages, setHomeImages] = useState(
    Contents[0].HomePage.HomeImage.barAva
  );
  const [storyImages, setStoryImages] = useState(Contents[1].OurStory);
  const [beverageImages, setBeverageImages] = useState(Contents[2].Beverage);
  const [galleryImgs, setGalleryImgs] = useState(Contents[3].Gallery);

  return (
    <div style={{ color: "rgb(161, 158, 158)", margin: "0 0 0 22px" }}>
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
            Main Home Page
          </h1>
        </Form.Label>

        <Row xs={1} md={3} className="g-4">
          <Col>
            <Form.Control
              onChange={(e) => setHomeImages(e.target.value)}
              type="file"
            />
            <Image width="15%" height="15%" src={homeImages} thumbnail />
          </Col>
        </Row>
      </Form.Group>

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
            Our Story section
          </h1>
        </Form.Label>
        <div style={{ display: "flex" }}>
          <div>
            <h4>Background Image </h4>
            <Form.Control type="file" />
            <Image src="holder.js/171x180" thumbnail />
          </div>
          <div>
            <h4> Side Image </h4>
            <Form.Control type="file" />
            <Image src="holder.js/171x180" thumbnail />
          </div>
        </div>
      </Form.Group>

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
            Beverage
          </h1>
        </Form.Label>
        <div>
          <h4
            style={{
              backgroundColor: "rgb(0, 0, 0)",
              display: "inline-block",
              padding: "2px",
              borderRadius: "8px",
              color: "rgb(197, 157, 87)",
              boxShadow: "20px -10px 19px",
              margin: "8px 0px 8px -4px",
            }}
          >
            Cocktails
          </h4>
          <Row xs={1} md={4} className="g-4">
            {beverageImages.Cocktails.map((cocktail, index) => (
              <Col key={index}>
                <h6>Name: {cocktail.name}</h6>
                <Form.Control type="file" />
                <Image src={cocktail.photo} thumbnail />
              </Col>
            ))}
          </Row>
        </div>
        <div>
          <h4
            style={{
              backgroundColor: "rgb(0, 0, 0)",
              display: "inline-block",
              padding: "2px",
              borderRadius: "8px",
              color: "rgb(197, 157, 87)",
              boxShadow: "20px -10px 19px",
              margin: "8px 0px 8px -4px",
            }}
          >
            Beer
          </h4>
          <Row xs={1} md={4} className="g-4">
            {beverageImages.Beers.map((beer, index) => (
              <Col key={index}>
                <h6>Name: {beer.name}</h6>
                <Form.Control type="file" />
                <Image src={beer.photo} thumbnail />
              </Col>
            ))}
          </Row>
        </div>
        <div>
          <h4
            style={{
              backgroundColor: "rgb(0, 0, 0)",
              display: "inline-block",
              padding: "2px",
              borderRadius: "8px",
              color: "rgb(197, 157, 87)",
              boxShadow: "20px -10px 19px",
              margin: "8px 0px 8px -4px",
            }}
          >
            Soda and minerals
          </h4>
          <Row xs={1} md={4} className="g-4">
            {beverageImages.SodaNMinerals.map((drink, index) => (
              <Col key={index}>
                <h6>Name: {drink.name}</h6>
                <Form.Control type="file" />
                <Image src={drink.photo} thumbnail />
              </Col>
            ))}
          </Row>
        </div>
      </Form.Group>

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
