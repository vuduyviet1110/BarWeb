import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { request } from "../utils/request";
import { useSelector } from "react-redux";

function Cocktails({ beverages }) {
  const currentAd = useSelector((state) => state.auth.login.currentUser);
  const [cocktails, setCocktails] = useState(
    beverages.filter((cocktail) => cocktail.type === "Cocktails")
  );
  const [success, setSuccess] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentCocktailIndex, setCurrentCocktailIndex] = useState(null);

  const handleUpdate = async (BevId) => {
    const currentBev = cocktails.find((c) => c.bev_id === BevId);
    const formData = new FormData();

    formData.append("bev_id", currentBev.bev_id);
    formData.append("name", currentBev.name);
    formData.append("description", currentBev.description);
    formData.append("price", currentBev.price);
    formData.append("image", currentBev.image);
    formData.append("admin_id", currentAd.id);
    formData.append("type", currentBev.type);

    const isAnyFieldEmpty = Object.values(currentBev).some(
      (value) => value === "" || value === 0 || value === "undefined"
    );

    if (!isAnyFieldEmpty) {
      const res = await request.put("/admin/beverage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data === "success") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setCurrentCocktailIndex(BevId);
        setIsEmpty(false);
      }
    } else {
      setCurrentCocktailIndex(BevId);
      setIsEmpty(true);
    }
  };

  const handleNameChange = (e, BevId) => {
    const updatedCocktails = [...cocktails];
    const index = updatedCocktails.findIndex((b) => b.bev_id === BevId);
    if (index !== -1) {
      updatedCocktails[index].name = e.target.value;
      setCocktails(updatedCocktails);
    } else {
      console.error(`Beer with bev_id ${BevId} not found`);
    }
  };

  const handleDescriptionChange = (e, BevId) => {
    const updatedCocktails = [...cocktails];
    const index = updatedCocktails.findIndex((b) => b.bev_id === BevId);
    if (index !== -1) {
      updatedCocktails[index].description = e.target.value;
      setCocktails(updatedCocktails);
    } else {
      console.error(`Beer with bev_id ${BevId} not found`);
    }
  };

  const handlePriceChange = (e, BevId) => {
    const updatedCocktails = [...cocktails];
    const index = updatedCocktails.findIndex((b) => b.bev_id === BevId);
    if (index !== -1) {
      updatedCocktails[index].price = e.target.value;
      setCocktails(updatedCocktails);
    } else {
      console.error(`Beer with bev_id ${BevId} not found`);
    }
  };

  const handleImgChange = (e, BevId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCocktails((prevCocktails) => {
          const newCocktails = [...prevCocktails];
          const cocktailIndex = newCocktails.findIndex(
            (c) => c.bev_id === BevId
          );
          if (cocktailIndex !== -1) {
            newCocktails[cocktailIndex] = {
              ...newCocktails[cocktailIndex],
              image: file,
              imagePreview: event.target.result,
            };
          }
          return newCocktails;
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
        Cocktails
      </h2>
      <Row xs={1} md={3} className="g-4">
        {cocktails.map((cocktail) => (
          <Col key={cocktail.bev_id}>
            <h2>Drink: {cocktail.bev_id}</h2>
            <h4>Name</h4>
            <div style={{ margin: "0 6px" }}>
              <InputGroup className="mb-3">
                <Form.Control
                  value={cocktail.name}
                  aria-label="SWI:P"
                  onChange={(e) => handleNameChange(e, cocktail.bev_id)}
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <h4>Description</h4>
              <InputGroup className="mb-3">
                <Form.Control
                  value={cocktail.description}
                  aria-label="SWI:P"
                  onChange={(e) => handleDescriptionChange(e, cocktail.bev_id)}
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <h4>Price</h4>
              <InputGroup className="mb-3">
                <Form.Control
                  value={cocktail.price}
                  aria-label="Amount (to the nearest dollar)"
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      handlePriceChange(e, cocktail.bev_id);
                    }
                  }}
                />
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup>
              <div>
                <Form.Control
                  type="file"
                  onChange={(e) => handleImgChange(e, cocktail.bev_id)}
                />
                <div style={{ display: "flex", margin: "20px 0 10px 0" }}>
                  <div>
                    <h4>Current Image</h4>
                    <Image
                      src={cocktail.image}
                      thumbnail
                      width="40%"
                      height="40%"
                    />
                  </div>
                  <div>
                    <h4>Preview</h4>
                    {cocktail.imagePreview && (
                      <Image
                        src={cocktail.imagePreview}
                        alt={`Preview of ${cocktail.name}`}
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
              {isEmpty && currentCocktailIndex === cocktail.bev_id && (
                <div>Please complete all the fields</div>
              )}
              {success && currentCocktailIndex === cocktail.bev_id && (
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
                onClick={() => handleUpdate(cocktail.bev_id)}
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

export default Cocktails;
