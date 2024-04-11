import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

function Cocktails({ Contents }) {
  const [cocktails, setCocktails] = useState(Contents[2].Beverage.Cocktails);

  const handleUpdate = () => {
    // Xử lý logic cập nhật thông tin cocktails
  };

  const handleNameChange = (e, index) => {
    const updatedCocktails = [...cocktails];
    updatedCocktails[index].name = e.target.value;
    setCocktails(updatedCocktails);
    console.log(updatedCocktails);
  };

  const handleDescriptionChange = (e, index) => {
    const updatedCocktails = [...cocktails];
    updatedCocktails[index].des = e.target.value;
    setCocktails(updatedCocktails);
    console.log(updatedCocktails);
  };

  const handlePriceChange = (e, index) => {
    const updatedCocktails = [...cocktails];
    updatedCocktails[index].price = e.target.value;
    setCocktails(updatedCocktails);
    console.log(updatedCocktails);
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
        {cocktails.map((cocktail, index) => (
          <Col key={index}>
            <h4>Name</h4>
            <div style={{ margin: "0 6px" }}>
              <InputGroup className="mb-3">
                <Form.Control
                  value={cocktail.name}
                  aria-label="SWI:P"
                  onChange={(e) => handleNameChange(e, index)}
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <h4>Description</h4>
              <InputGroup className="mb-3">
                <Form.Control
                  value={cocktail.des}
                  aria-label="SWI:P"
                  onChange={(e) => handleDescriptionChange(e, index)}
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <h4>Price</h4>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  value={cocktail.price}
                  aria-label="Amount (to the nearest dollar)"
                  onChange={(e) => handlePriceChange(e, index)}
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
              <div key={index}>
                <Form.Control type="file" />
                <Image src={cocktail.photo} thumbnail />
              </div>
              <Button
                style={{
                  width: "100%",
                  margin: "8px 0",
                  backgroundColor: "brown",
                  border: "none",
                }}
                onClick={handleUpdate}
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
