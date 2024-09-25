import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { request } from "../utils/request";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

function Beers({ beverages }) {
  const [sucess, setSucess] = useState();
  const [isEmpty, setisEmpty] = useState();
  const [currentBeerIndex, setcurrentBeerIndex] = useState();
  const [beers, setBeers] = useState(
    beverages.filter((cocktail) => cocktail.type === "Beers")
  );
  const currentAd = useSelector((state) => state.auth.login.currentUser);

  const handleUpdate = async (Bev_id) => {
    const currentBev = beers.find((b) => b.bev_id === Bev_id);
    const formData = new FormData();

    formData.append("bev_id", currentBev.bev_id);
    formData.append("name", currentBev.name);
    formData.append("description", currentBev.description);
    formData.append("price", currentBev.price);
    formData.append("image", currentBev.image); // Thêm tệp tin vào FormData
    formData.append("admin_id", currentAd.id); // Thêm tệp tin vào FormData
    formData.append("type", currentBev.type); // Thêm tệp tin vào FormData
    const isAnyFieldEmpty = Object.values(currentBev).some(
      (value) => value === "" || value === 0 || value === "undefined"
    );
    if (!isAnyFieldEmpty) {
      const res = await request.put("/admin/beverage", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for FormData
        },
      });
      if (res.data === "success") {
        setSucess(true);
        setTimeout(() => {
          setSucess(false);
        }, 3000);
        setcurrentBeerIndex(Bev_id);
        setisEmpty(false);
      }
    } else {
      setcurrentBeerIndex(Bev_id);
      setisEmpty(true);
    }
  };

  const handleNameChange = (e, Bev_id) => {
    const updatedBeers = [...beers];
    const index = updatedBeers.findIndex((b) => b.bev_id === Bev_id);
    if (index !== -1) {
      updatedBeers[index].name = e.target.value;
      setBeers(updatedBeers);
    } else {
      console.error(`Beer with bev_id ${Bev_id} not found`);
    }
  };

  const handleDescriptionChange = (e, bev_id) => {
    const updatedBeers = [...beers];
    const index = updatedBeers.findIndex((beer) => beer.bev_id === bev_id);
    if (index !== -1) {
      updatedBeers[index].description = e.target.value;
      setBeers(updatedBeers);
    } else {
      console.error(`Beer with bev_id ${bev_id} not found`);
    }
  };

  const handlePriceChange = (e, Bev_id) => {
    const updatedBeers = [...beers];
    const index = updatedBeers.findIndex((beer) => beer.bev_id === Bev_id);
    if (index !== -1) {
      updatedBeers[index].price = e.target.value;
      setBeers(updatedBeers);
    } else {
      console.error(`Beer with bev_id ${Bev_id} not found`);
    }
  };
  const handleImgChange = (e, BevId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBeers((prevBeers) => {
          const newBeers = [...prevBeers];
          const BeerIndex = newBeers.findIndex((c) => c.bev_id === BevId);
          if (BeerIndex !== -1) {
            newBeers[BeerIndex] = {
              ...newBeers[BeerIndex],
              image: file,
              imagePreview: event.target.result,
            };
          }
          return newBeers;
        });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <h2
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          display: "inline-block",
          borderRadius: "8px",
          color: "rgb(197, 157, 87)",
          boxShadow: "-20px 2px 30px 8px",
          margin: "8px 0px 8px -4px",
        }}
      >
        Beers
      </h2>
      <Row xs={1} md={3} className="g-4">
        {beers.map((beer) => (
          <Col key={beer.bev_id}>
            <h2>Drink: {beer.bev_id}</h2>
            <h4>Name</h4>
            <div style={{ margin: "0 6px" }}>
              <InputGroup className="mb-3">
                <Form.Control
                  value={beer.name}
                  aria-label="SWI:P"
                  onChange={(e) => handleNameChange(e, beer.bev_id)}
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <h4>Description</h4>
              <InputGroup className="mb-3">
                <Form.Control
                  value={beer.description}
                  aria-label="SWI:P"
                  onChange={(e) => handleDescriptionChange(e, beer.bev_id)}
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <h4>Price</h4>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  value={beer.price}
                  aria-label="Amount (to the nearest dollar)"
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      handlePriceChange(e, beer.bev_id);
                    }
                  }}
                />
              </InputGroup>
              <div>
                <Form.Control
                  type="file"
                  onChange={(e) => handleImgChange(e, beer.bev_id)}
                />
                <div
                  style={{
                    display: "flex",
                    margin: "20px 0 10px 0",
                    gap: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ minWidth: "50%" }}>
                    <h4>Current Image</h4>
                    <Image
                      src={beer.image}
                      thumbnail
                      width="40%"
                      height="40%"
                    />
                  </div>
                  <div>
                    <h4>Preview</h4>
                    {beer.imagePreview && (
                      <Image
                        src={beer.imagePreview}
                        alt={`Preview of ${beer.name}`}
                        width="65%"
                        style={{
                          borderRadius: "8px",
                          borderWidth: "4px",
                          borderStyle: "solid",
                          borderColor: "white",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              {isEmpty && currentBeerIndex === beer.bev_id && (
                <div>Please complete all the fields</div>
              )}
              {sucess && currentBeerIndex === beer.bev_id && (
                <div style={{ color: "green", fontSize: "30px" }}>
                  Successfully updated!!!
                </div>
              )}
              <Button
                style={{
                  width: "100%",
                  margin: "8px 0",
                  backgroundColor: "brown",
                  border: "none",
                }}
                onClick={(e) => handleUpdate(beer.bev_id)}
              >
                Save
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Beers;
