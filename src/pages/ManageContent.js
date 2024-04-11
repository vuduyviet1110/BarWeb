import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cocktails from "../common/Cocktails";
import InputGroup from "react-bootstrap/InputGroup";
import { Image } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import SodaNMinerals from "../common/SodaNMinerals";
import Beers from "../common/Beer";
import { Contents } from "../Fakeapi";
function ManageContent() {
  const [type, setType] = useState("Title");
  const [contents, setContents] = useState({
    title: "Title",
    des: "A space that gives you the most intimate experiences right in the heart of Hanoi's Old Quarter",
    storyTitle: "storyTile",
    storyDes: "storyDes",
    homeImages: Contents[0].HomePage.HomeImage.barAva,
    storyImages: Contents[1].OurStory,
  });
  const handleSaveChangesTitle = () => {
    // Handle saving the title here
    console.log("Updated Title:", contents.title);
    // You can perform further actions like sending data to backend, etc.
    console.log("Updated Des:", contents.des);
  };
  const handleSaveChangesOurStory = () => {
    // Handle saving the title here
    console.log("Updated Title:", contents.storyTitle);
    console.log("Updated Des:", contents.storyDes);
  };
  return (
    <div
      style={{
        margin: "8px",
      }}
    >
      <div style={{ display: "flex" }}>
        {["Title", "Our Story", "Beverage"].map((tab, index) => (
          <h3
            key={index}
            onClick={() => {
              setType(tab);
            }}
            style={{
              backgroundColor: type === tab ? "#c59d5a" : "rgb(64, 38, 3)",
              margin: "0 16px",
              cursor: "pointer",
              minWidth: "150px",
              textAlign: "center",
              borderRadius: "8px",
              color: type === tab ? "rgb(0,0,0)" : "rgb(161, 158, 158)",
            }}
          >
            {tab}
          </h3>
        ))}
      </div>
      {type === "Title" && (
        <div style={{ margin: "16px", color: "#c59d5a", height: "100vh" }}>
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
          <h2>Current Title: </h2>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="SWI:P"
              value={contents.title}
              onChange={(e) => {
                setContents((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </InputGroup>

          <h2>Current Description: </h2>
          <InputGroup className="mb-3">
            <Form.Control
              value={contents.des}
              style={{ height: "150px" }}
              as="textarea"
              placeholder="A space that gives you the most intimate experiences right in the heart of Hanoi's Old Quarter"
              aria-label="SWI:P"
              onChange={(e) => {
                setContents((prev) => ({ ...prev, des: e.target.value }));
              }}
            />
          </InputGroup>
          <Form.Group controlId="formFile" className="mb-3">
            <Row xs={1} md={3} className="g-4">
              <Col>
                <Form.Control
                  onChange={(e) =>
                    setContents((prev) => ({
                      ...prev,
                      homeImages: e.target.value,
                    }))
                  }
                  type="file"
                />
                <Image
                  width="15%"
                  height="15%"
                  src={contents.homeImages}
                  thumbnail
                />
              </Col>
            </Row>
          </Form.Group>
          <Button
            onClick={handleSaveChangesTitle}
            style={{ backgroundColor: "#c59d5a" }}
            id="button-addon2"
          >
            Update
          </Button>
        </div>
      )}
      {type === "Our Story" && (
        <div style={{ margin: "16px", color: "#c59d5a", height: "100vh" }}>
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
          </Form.Group>
          <h2>Current Story Title: </h2>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="SWI:P"
              aria-describedby="basic-addon2"
              value={contents.storyTitle}
              onChange={(e) => {
                setContents((prev) => ({
                  ...prev,
                  storyTitle: e.target.value,
                }));
              }}
            />
          </InputGroup>

          <h2>Current Story Description: </h2>
          <InputGroup className="mb-3">
            <Form.Control
              value={contents.storyDes}
              as="textarea"
              style={{ height: "150px" }}
              placeholder="A space that gives you the most intimate experiences right in the heart of Hanoi's Old Quarter"
              aria-label="SWI:P"
              onChange={(e) => {
                setContents((prev) => ({ ...prev, storyDes: e.target.value }));
              }}
            />
          </InputGroup>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Background Image </h4>
              <Form.Control type="file" />
              <Image src={contents.storyImages.BackgroundImage} thumbnail />
            </div>
            <div>
              <h4> Side Image </h4>
              <Form.Control type="file" />
              <Image src={contents.storyImages.SideImage} thumbnail />
            </div>
          </div>
          <Button
            onClick={handleSaveChangesOurStory}
            style={{ backgroundColor: "#c59d5a", marginTop: "16px" }}
            id="button-addon2"
          >
            Update
          </Button>
        </div>
      )}
      {type === "Beverage" && (
        <div style={{ margin: "30px 16px", color: "#c59d5a" }}>
          <Cocktails Contents={Contents} />
          <Beers Contents={Contents} />
          <SodaNMinerals Contents={Contents} />
        </div>
      )}
    </div>
  );
}

export default ManageContent;
