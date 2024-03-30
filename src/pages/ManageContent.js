import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cocktails from "../common/Cocktails";
import InputGroup from "react-bootstrap/InputGroup";
import SodaNMinerals from "../common/SodaNMinerals";
import Beers from "../common/Beer";
import { Contents } from "../Fakeapi";
function ManageContent() {
  const [type, setType] = useState("Title");
  const [title, setTitle] = useState("Swi:p");
  const [des, setDes] = useState(
    "A space that gives you the most intimate experiences right in the heart of Hanoi's Old Quarter"
  );
  const [storyTitle, setStoryTitle] = useState("storyTile");
  const [storyDes, setStoryDes] = useState("storyDes");
  const handleTitleChange = () => {
    // Handle saving the title here
    console.log("Updated Title:", title);
    // You can perform further actions like sending data to backend, etc.
  };
  const handleDesChange = () => {
    console.log("Updated Des:", des);
  };
  const handleStoryTitlesChange = () => {
    // Handle saving the title here
    console.log("Updated Title:", storyTitle);
    // You can perform further actions like sending data to backend, etc.
  };
  const handleStoryDesChange = () => {
    console.log("Updated Des:", storyDes);
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
          <h2>Current Title: </h2>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="SWI:P"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Button
              style={{ backgroundColor: "#c59d5a" }}
              onClick={handleTitleChange}
              id="button-addon2"
            >
              Update
            </Button>
          </InputGroup>

          <h2>Current Description: </h2>
          <InputGroup className="mb-3">
            <Form.Control
              value={des}
              style={{ height: "150px" }}
              as="textarea"
              placeholder="A space that gives you the most intimate experiences right in the heart of Hanoi's Old Quarter"
              aria-label="SWI:P"
              onChange={(e) => {
                setDes(e.target.value);
              }}
            />
            <Button
              onClick={handleDesChange}
              style={{ backgroundColor: "#c59d5a" }}
              id="button-addon2"
            >
              Update
            </Button>
          </InputGroup>
        </div>
      )}
      {type === "Our Story" && (
        <div style={{ margin: "16px", color: "#c59d5a", height: "100vh" }}>
          <h2>Current Story Title: </h2>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="SWI:P"
              aria-describedby="basic-addon2"
              value={storyTitle}
              onChange={(e) => {
                setStoryTitle(e.target.value);
              }}
            />
            <Button
              style={{ backgroundColor: "#c59d5a" }}
              onClick={handleStoryTitlesChange}
              id="button-addon2"
            >
              Update
            </Button>
          </InputGroup>

          <h2>Current Story Description: </h2>
          <InputGroup className="mb-3">
            <Form.Control
              value={storyDes}
              as="textarea"
              style={{ height: "150px" }}
              placeholder="A space that gives you the most intimate experiences right in the heart of Hanoi's Old Quarter"
              aria-label="SWI:P"
              onChange={(e) => {
                setStoryDes(e.target.value);
              }}
            />
            <Button
              onClick={handleStoryDesChange}
              style={{ backgroundColor: "#c59d5a" }}
              id="button-addon2"
            >
              Update
            </Button>
          </InputGroup>
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
