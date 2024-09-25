import { Col, Container, Row } from "react-bootstrap";
import { request } from "../utils/request";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ItemCard from "../common/ItemCard";
import CustomeModal from "../common/modal";
function AdminSearch() {
  const [searchingquery, setSearchingquery] = useState({
    field: "",
    keyword: "",
  });
  const [show, setshow] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const field = query.get("field");
  const keyword = query.get("keyword");

  useEffect(() => {
    const fetchSearch = async () => {
      if (!field || !keyword) {
        return;
      }
      try {
        const res = await request.get(
          `/admin/search?field=${field}&keyword=${keyword}`
        );
        if (res.status === 200) {
          setSearchResult(res.data.data);
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchSearch();
  }, [field, keyword]);

  useEffect(() => {
    if (!field || !keyword) {
      setshow(true);
      return;
    } else {
      setshow(false);
      setSearchingquery({
        field: field,
        keyword: keyword,
      });
    }
  }, [field, keyword]);

  return (
    <Container className="py-4">
      <Row className="justify-content-center mt-3 text-light ">
        <Col md={12}>
          <h4 style={{ margin: "0 16px " }}>
            Result for field:{" "}
            <span className="text-danger"> "{searchingquery.field}"</span> and
            keyword:
            <span className="text-danger"> "{searchingquery.keyword}"</span>
          </h4>
          {searchResult.length === 0 && !show ? (
            <div
              className=" d-flex flex-column justify-content-center align-items-center "
              style={{ margin: "50px 8px" }}
            >
              <h2 className="text-warning">No results found</h2>
              <h4>Please try to search something else</h4>
            </div>
          ) : (
            <div className="result">
              {searchResult.map((result) => (
                <ItemCard search={searchingquery} result={result} />
              ))}
            </div>
          )}
        </Col>
      </Row>
      <CustomeModal
        title="Can not found"
        show={show}
        body="Please choose field and enter username"
        onHide={() => setshow(false)}
      />
    </Container>
  );
}

export default AdminSearch;
