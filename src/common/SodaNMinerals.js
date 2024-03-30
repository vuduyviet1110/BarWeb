import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

function SodaNMinerals({ Contents }) {
  const [drinks, setDrinks] = useState(Contents[2].Beverage.SodaNMinerals);

  const handleUpdate = () => {
    // Xử lý logic cập nhật thông tin drinks
  };

  const handleNameChange = (e, index) => {
    const updatedDrink = [...drinks];
    updatedDrink[index].name = e.target.value;
    setDrinks(updatedDrink);
    console.log(updatedDrink);
  };

  const handleDescriptionChange = (e, index) => {
    const updatedDrink = [...drinks];
    updatedDrink[index].des = e.target.value;
    setDrinks(updatedDrink);
    console.log(updatedDrink);
  };

  const handlePriceChange = (e, index) => {
    const updatedDrink = [...drinks];
    updatedDrink[index].price = e.target.value;
    setDrinks(updatedDrink);
    console.log(updatedDrink);
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
        Soda And Minerals
      </h2>
      <Row xs={1} md={3} className="g-4">
        {drinks.map((drink, index) => (
          <Col key={index}>
            <h4>Name</h4>
            <div style={{ margin: "0 6px" }}>
              <InputGroup className="mb-3">
                <Form.Control
                  value={drink.name}
                  aria-label="SWI:P"
                  onChange={(e) => handleNameChange(e, index)}
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <h4>Description</h4>
              <InputGroup className="mb-3">
                <Form.Control
                  value={drink.des}
                  aria-label="SWI:P"
                  onChange={(e) => handleDescriptionChange(e, index)}
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <h4>Price</h4>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  value={drink.price}
                  aria-label="Amount (to the nearest dollar)"
                  onChange={(e) => handlePriceChange(e, index)}
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
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

export default SodaNMinerals;
