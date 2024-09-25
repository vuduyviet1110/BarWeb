import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Row,
} from "react-bootstrap";
import logo from "../assets/images/Barava.jpg";
import { Link } from "react-router-dom";
function ItemCard({ search, result }) {
  return (
    <Card className="p-3 my-3">
      <Row className="align-items-center justify-content-between">
        <Col md={1}>
          <Image src={logo} roundedCircle fluid />
        </Col>
        <Col md={8}>
          <Link
            to={`/admin/${search.field}/${
              result?.reservation_id || result?.card_order_id || result?.user_id
            }`}
          >
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <span>Field: {search.field} </span>
              </Card.Title>
              <Row>
                <Col md={6}>
                  <Card.Subtitle className="text-muted mb-2">
                    Name: {result.user_name}
                  </Card.Subtitle>
                  <Card.Text className="text-muted mb-2">
                    Gmail:{result.user_gmail}
                  </Card.Text>
                  <Card.Text className="text-muted mb-2">
                    Phone:{result.user_phone}
                  </Card.Text>
                </Col>
                <Col md={6}>
                  {search.field === "reservation" ? (
                    <>
                      <Card.Text className="text-muted mb-2">
                        Booking at: {result?.table_time} date:{" "}
                        {result?.table_date}
                      </Card.Text>
                      <Card.Text className="text-muted mb-2">
                        Num of people:{result?.number_people}
                      </Card.Text>
                    </>
                  ) : search.field === "giftcard" ? (
                    <>
                      <Card.Text className="text-muted mb-2">
                        To: {result?.receiver_name}
                      </Card.Text>
                      <Card.Text className="text-muted mb-2">
                        Reciver phone: {result?.receiver_phone}
                      </Card.Text>
                      <Card.Text className="text-muted mb-2">
                        Type: Giftcard-{result?.user_amount}
                      </Card.Text>
                    </>
                  ) : (
                    <>{/* <Image  src={logo} roundedCircle fluid /> */}</>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Link>
        </Col>
        <Col
          md={3}
          className="d-flex flex-column justify-content-between align-items-end"
        >
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="light">Add to list</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>favorite</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default ItemCard;
