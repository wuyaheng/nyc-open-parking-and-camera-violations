import React from "react";
import { Line } from "react-chartjs-2";

function ResultList(props) {
  var colorArray = [
    "#FFB399",
    "#E6B3B3",
    "#6680B3",
    "#FF99E6",
    "#1AB399",
    "#4D8066",
  ];

  const LineChart = ({ type }) => {
    const obj = {};

    let options = {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Number of Violations Over Time'
     },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            }
          }
        ],
        yAxes: [{
          ticks: {
              beginAtZero: true,
              min: 0,
              stepSize: 1
          },
          stacked: true
      }]
      }
    };

    props.results.forEach((arrest) => {
      const key = arrest[type]; 
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
     return (
        <Line
          data={{
            labels: entries.map((x) => x[0]),
            datasets: [
              {
                data: entries.map((x) => x[1]),
                backgroundColor: colorArray, 
              },
            ],
          }} 
          options={options} 
        />
      );

  };


  return (
    <div className="container-fluid mb-2">
      <div className="row mt-2">
      <div className="col-md-12" style={{paddingLeft: "2px", paddingRight: "2px"}}>
      <div className="card" style={{paddingBottom: "2px"}}>
        <LineChart type="issue_date"/> 
      </div>
      </div>
      </div>
    </div>
  );
}

export default ResultList;