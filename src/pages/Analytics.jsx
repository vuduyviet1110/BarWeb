import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Doughnut, Bar, Line } from "react-chartjs-2";

// Import Chart.js components and register them
import {
  Chart as ChartJS,
  CategoryScale, // To fix the "category" scale error
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement, // For Doughnut chart
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [abzugVoll, setAbzugVoll] = useState(100);
  const [fullScore, setFullScore] = useState(70);

  const [dataNeu, setDataNeu] = useState({
    labels: ["Gesamte Punktanzahl"],
    datasets: [
      {
        data: [50, 50],
        backgroundColor: ["#0069b4"],
        hoverBackgroundColor: ["#0069b4b3"],
      },
    ],
  });

  const [dataZwei, setDataZwei] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My sư dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#0069b4",
        borderColor: "#0069b4",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#0069b447",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#0069b447",
        pointHoverBorderColor: "#0069b4",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [10, 59, 80, 81, 56, 55, 40],
      },
    ],
  });

  const test = () => {
    if (dataNeu.labels[0] === "Gesamte Punktanzahl") {
      setDataNeu({
        labels: "",
        datasets: [{}],
      });
    } else {
      setDataNeu({
        labels: ["Gesamte Punktanzahl"],
        datasets: [
          {
            data: [fullScore, abzugVoll - fullScore],
            backgroundColor: ["#0069b4"],
            hoverBackgroundColor: ["#0069b4b3"],
          },
        ],
      });
    }
  };

  return (
    <div
      style={{
        margin: "20px",
        color: "lightslategray",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: "20px",
      }}
    >
      <h2>Your rencent analytics about your sales</h2>
      <Row lg={2} style={{ margin: "20px", fontSize: "20px" }}>
        <Col style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Line data={dataZwei} />
          <span style={{ alignSelf: "center" }}>
            Figure1: descripbe your sales
          </span>
        </Col>
      </Row>
      <Row lg={2}>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Button
            style={{ width: "50%", alignSelf: "center" }}
            variant="primary"
            onClick={test}
          >
            Show Score
          </Button>
          <div style={{ width: "50%", height: "auto", alignSelf: "center" }}>
            <Doughnut data={dataNeu} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
