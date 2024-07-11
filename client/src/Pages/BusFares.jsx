import React from "react";
import "../styles/busFares.css";
import { useNavigate } from "react-router-dom";

const BusFares = () => {
    const navigate = useNavigate();

  const sampleFares = [
    {
      departure: "New York",
      arrival: "Boston",
      fare: "$30",
      duration: "4 hours",
    },
    {
      departure: "San Francisco",
      arrival: "Los Angeles",
      fare: "$50",
      duration: "6 hours",
    },
    {
      departure: "Chicago",
      arrival: "Detroit",
      fare: "$25",
      duration: "5 hours",
    },
    {
      departure: "Houston",
      arrival: "Dallas",
      fare: "$20",
      duration: "3.5 hours",
    },
    {
      departure: "Seattle",
      arrival: "Portland",
      fare: "$15",
      duration: "3 hours",
    },
  ];

  return (
    <div className="main_fare">
    <div className="bus-fares">
       <div className="cards">
          <h2>Bus Fares</h2>
          <button className="cancel_button" onClick={()=>navigate("/")}>
            X
          </button>
        </div>
      <table>
        <thead>
          <tr>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Fare</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {sampleFares.map((fare, index) => (
            <tr key={index}>
              <td>{fare.departure}</td>
              <td>{fare.arrival}</td>
              <td>{fare.fare}</td>
              <td>{fare.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default BusFares;
