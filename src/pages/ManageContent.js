import { useEffect, useState } from "react";
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
import { request } from "../utils/request";

function ManageContent() {
  const [type, setType] = useState("Title");
  const [isEmpty, setisEmpty] = useState();
  const [sameImage, setSameImage] = useState();
  const [sucess, setSucess] = useState();
  const [contents, setContents] = useState({});
  const [ourStory, setOurstory] = useState({
    storyTitle: "storyTile",
    storyDes: "storyDes",
    storyBgImage: "",
    storySlideImage: "",
  });
  const handleSaveChangesTitle = async () => {
    // Handle saving the title here
    try {
      const formData = new FormData();
      formData.append("title", contents.title);
      formData.append("content", contents.content);
      formData.append("image", contents.image); // Thêm tệp tin vào FormData
      const isAnyFieldEmpty = Object.values(contents).some(
        (value) => value === "" || value === 0 || value === "undefined"
      );
      console.log(isAnyFieldEmpty);
      if (!isAnyFieldEmpty) {
        const res = await request.put("/admin/content", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for FormData
          },
        });

        if (res.data === "same image") {
          console.log("Response from server:", res.data);
          setSameImage(true);
        } else {
          console.log("Response from server:", res.data);
          setContents((prev) => ({ ...prev, image: res.data }));
        }
        setSucess(true);
      } else {
        setisEmpty(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSaveChangesOurStory = () => {
    // Handle saving the title here
    console.log("Our story", ourStory);
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get("/admin/content");
        setContents(res.data[0]);
        console.log(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, []);
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
        <div style={{ margin: "16px", color: "#c59d5a" }}>
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
              value={contents.title}
              onChange={(e) => {
                setContents((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </InputGroup>

          <h2>Current Description: </h2>
          <InputGroup className="mb-3">
            <Form.Control
              value={contents.content}
              style={{ height: "150px" }}
              as="textarea"
              onChange={(e) => {
                setContents((prev) => ({ ...prev, content: e.target.value }));
              }}
            />
          </InputGroup>
          <Form.Group controlId="formFile" className="mb-3">
            <Row xs={1} md={3} className="g-4">
              <Col>
                <Form.Control
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setContents((prev) => ({
                        ...prev,
                        image: e.target.files[0],
                      }));
                    } else {
                    }
                  }}
                  type="file"
                />
                <Image
                  width="50%"
                  height="50%"
                  src={contents.image}
                  thumbnail
                />
              </Col>
            </Row>
          </Form.Group>
          {isEmpty && <div>Please complete all the fields</div>}
          {/* {sameImage && <div>Same image???</div>} */}
          {sucess && (
            <div style={{ color: "green", fontSize: "30px" }}>
              Sucessfully updated!!!
            </div>
          )}
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
              placeholder="hello"
              aria-describedby="basic-addon2"
              value={contents.storyTitle}
              onChange={(e) => {
                setOurstory((prev) => ({
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
                setOurstory((prev) => ({ ...prev, storyDes: e.target.value }));
              }}
            />
          </InputGroup>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Background Image </h4>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setOurstory((prev) => ({
                    ...prev,
                    storyBgImage: e.target.files[0],
                  }))
                }
              />
              <Image src={ourStory.storyBgImage} thumbnail />
            </div>
            <div>
              <h4> Side Image </h4>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setOurstory((prev) => ({
                    ...prev,
                    storySlideImage: e.target.files[0],
                  }))
                }
              />
              <Image src={ourStory.storySlideImage} thumbnail />
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
