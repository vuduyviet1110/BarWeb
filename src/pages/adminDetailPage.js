import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { request } from "../utils/request";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DetailGiftcardPage from "../common/detailGc";
import DetailUser from "../common/detailUser";
import DetailReservation from "../common/detailRes";
function DetailAdminPage() {
  const { field, id } = useParams();
  const [result, setResult] = useState({});
  const navigate = useNavigate();
  console.log(result);
  const fetchData = useCallback(async () => {
    const endpoints = {
      user: `/admin/user/${id}`,
      giftcard: `/admin/giftcard/${id}`,
      reservation: `/admin/reservation/${id}`,
    };

    try {
      if (endpoints[field]) {
        const res = await request(endpoints[field]);
        if (res.status === 200) {
          setResult(res.data);
        } else {
          throw new Error("Not found");
        }
      } else {
        navigate("/admin/field/NotFound/404");
      }
    } catch (error) {
      console.error(error);
    }
  }, [field, id, navigate]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  return (
    <div>
      {result?.giftcard ? (
        <DetailGiftcardPage
          fetchData={fetchData}
          result={result}
          id={id}
          field={field}
        />
      ) : result?.reservation ? (
        <Container>
          <DetailReservation
            fetchData={fetchData}
            result={result}
            id={id}
            field={field}
          />
        </Container>
      ) : result?.user ? (
        <Container>
          <DetailUser
            fetchData={fetchData}
            result={result}
            id={id}
            field={field}
          />
        </Container>
      ) : (
        <Container>
          <h3>Not found</h3>
        </Container>
      )}
    </div>
  );
}

export default DetailAdminPage;
