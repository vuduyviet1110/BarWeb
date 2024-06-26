import { Button, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { request } from "../utils/request";
import { useSelector } from "react-redux";

function ManageImage() {
  const [galleryImgs, setGalleryImgs] = useState([{}]);
  const [success, setSuccess] = useState(false);
  const [noUpdate, setNoUpdate] = useState(false);
  const currentAd = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get("/admin/gallery");
        setGalleryImgs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApi();
  }, []);

  const handleImageChange = (index, newImage) => {
    setGalleryImgs((prevImgs) =>
      prevImgs.map((img, i) =>
        i + 1 === index ? { ...img, img: newImage } : img
      )
    );
  };
  const handleUpdate = async () => {
    const formData = new FormData();
    galleryImgs.forEach((img) => {
      formData.append(`images${img.img_id}`, img.img); // Assuming 'images[]' is the field name on the server
    });
    formData.append("ad_id", currentAd.id);

    const res = await request.put("/admin/gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for FormData
      },
    });

    if (res.data === "successfully") {
      setSuccess(true);
      setNoUpdate(false);
    } else if (res.data === "No images uploaded") {
      setNoUpdate(true);
    }
  };
  return (
    <div
      style={{
        color: "rgb(161, 158, 158)",
        margin: "0 0 0 22px",
        padding: "0 0 20px 0",
        height: "100%",
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
            {galleryImgs.map((photo) => (
              <Col key={photo.img_id}>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    handleImageChange(photo.img_id, e.target.files[0]);
                  }}
                />
                <h5 style={{ margin: "0 0 8px 0" }}>Current Image: </h5>
                <Image
                  style={{ margin: "10px 0 10px 0" }}
                  width="50%"
                  height="50%"
                  src={photo.img}
                  thumbnail
                />
              </Col>
            ))}
          </Row>
        </div>
        {success && (
          <div style={{ color: "green" }}>Update image successfully!!!</div>
        )}

        {noUpdate && (
          <div style={{ color: "gold" }}>No new image uploaded!!</div>
        )}
        <Button
          style={{
            display: "flex",
            margin: "16px 0 0 0",
            backgroundColor: "brown",
            border: "none",
          }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Form.Group>
    </div>
  );
}

export default ManageImage;
