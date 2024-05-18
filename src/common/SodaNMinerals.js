import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { request } from "../utils/request";
function SodaNMinerals({ beverages }) {
  const { id } = useParams();
  const [sucess, setSucess] = useState();
  const [isEmpty, setisEmpty] = useState();
  const [currentDrinkIndex, setCurrentDrinkIndex] = useState();
  const [drinks, setDrinks] = useState(
    beverages.filter(
      (cocktail) => cocktail.type === "Soda" || cocktail.type === "Minerals"
    )
  );

  const handleUpdate = async (BevId) => {
    const currentBev = drinks.find((d) => d.bev_id === BevId);
    console.log(currentBev);
    const formData = new FormData();

    formData.append("bev_id", currentBev.bev_id);
    formData.append("name", currentBev.name);
    formData.append("description", currentBev.description);
    formData.append("price", currentBev.price);
    formData.append("image", currentBev.image); // Thêm tệp tin vào FormData
    formData.append("admin_id", id); // Thêm tệp tin vào FormData
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
        setCurrentDrinkIndex(BevId);
        setisEmpty(false);
      }
    } else {
      setCurrentDrinkIndex(BevId);
      setisEmpty(true);
    }
  };

  const handleNameChange = (e, BevId) => {
    const updatedDrinks = [...drinks];
    const index = updatedDrinks.findIndex((b) => b.bev_id === BevId);
    if (index !== -1) {
      updatedDrinks[index].name = e.target.value;
      setDrinks(updatedDrinks);
    } else {
      console.error(`Beer with bev_id ${BevId} not found`);
    }
  };

  const handleDescriptionChange = (e, BevId) => {
    const updatedDrinks = [...drinks];
    const index = updatedDrinks.findIndex((b) => b.bev_id === BevId);
    if (index !== -1) {
      updatedDrinks[index].description = e.target.value;
      setDrinks(updatedDrinks);
    } else {
      console.error(`Beer with bev_id ${BevId} not found`);
    }
  };

  const handlePriceChange = (e, BevId) => {
    const updatedDrinks = [...drinks];
    const index = updatedDrinks.findIndex((b) => b.bev_id === BevId);
    if (index !== -1) {
      updatedDrinks[index].price = e.target.value;
      setDrinks(updatedDrinks);
    } else {
      console.error(`Beer with bev_id ${BevId} not found`);
    }
  };
  const handleImgChange = (e, BevId) => {
    const file = e.target.files[0];
    if (file) {
      setDrinks((prevDrinks) => {
        const newDrink = [...prevDrinks];
        const DrinkIndex = newDrink.findIndex((c) => c.bev_id === BevId);
        if (DrinkIndex !== -1) {
          newDrink[DrinkIndex] = {
            ...newDrink[DrinkIndex],
            image: file,
          };
        }
        return newDrink;
      });
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
        Soda And Minerals
      </h2>
      <Row xs={1} md={3} className="g-4">
        {drinks.map((drink) => (
          <Col key={drink.bev_id}>
            <h2>Drink: {drink.bev_id}</h2>
            <h4>Name</h4>
            <div style={{ margin: "0 6px" }}>
              <InputGroup className="mb-3">
                <Form.Control
                  value={drink.name}
                  aria-label="SWI:P"
                  onChange={(e) => handleNameChange(e, drink.bev_id)}
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <h4>Description</h4>
              <InputGroup className="mb-3">
                <Form.Control
                  value={drink.description}
                  aria-label="SWI:P"
                  onChange={(e) => handleDescriptionChange(e, drink.bev_id)}
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <h4>Price</h4>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  value={drink.price}
                  aria-label="Amount (to the nearest dollar)"
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      handlePriceChange(e, drink.bev_id);
                    }
                  }}
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
              <div>
                <Form.Control
                  type="file"
                  onChange={(e) => handleImgChange(e, drink.bev_id)}
                />
                <Image src={drink.image} width="50%" height="50%" thumbnail />
              </div>
              {isEmpty && currentDrinkIndex === drink.bev_id && (
                <div>Please complete all the fields</div>
              )}
              {sucess && currentDrinkIndex === drink.bev_id && (
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
                onClick={() => handleUpdate(drink.bev_id)}
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
