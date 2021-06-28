import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './SketchPad.css'


const ENDPOINT = "http://localhost:4001";

function SketchPad() {
  const id = '1';
  const name = 'sketchLine';
  const color = 'black';
  const graphDiameter = 1000;
  const [graphDataPoints, setGraphDataPoints] = useState([{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 7, y: -3 }]);
  const [dataPoints, setDataPoints] = useState([0, 0])
  const testData = [{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 7, y: -3 }]

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      withCredentials: true,
    });
    socket.on("FromAPI", data => {
      //processJoystickData(data);
    });
  }, []);

  function calculateNewCoordinates(oldCoordinates, newInput) { };
  function test() {
    setDataPoints([dataPoints[0] - 1, dataPoints[1]]);
    graphDataPoints.push({x:dataPoints[0],y:dataPoints[1]})
    setGraphDataPoints(graphDataPoints);
    console.log(graphDataPoints);
  }

  function processJoystickData(data) {
    if (data.x_data < 72) {
      setDataPoints([dataPoints[0] - 1, dataPoints[1]]);
    }
    else if (data.x_data > 76) {
      setDataPoints([dataPoints[0] + 1, dataPoints[1]]);
    }
    if (data.y_data < 72) {
      setDataPoints([dataPoints[0], dataPoints[1] - 1]);
    }
    else if (data.y_data > 76) {
      setDataPoints([dataPoints[0], dataPoints[1] + 1]);
    }
    graphDataPoints.push({x:dataPoints[0],y:dataPoints[1]})
    setGraphDataPoints(graphDataPoints);
  };

  return (
    <div className="SketchPad">
      <div>
        <h3>Not Weather Station</h3>
        <LineChart width={graphDiameter} height={graphDiameter} data={graphDataPoints}>
          <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
          <XAxis dataKey="x" />
          <YAxis />
        </LineChart>
      </div>
      <button onClick={() => test()}>
        Click me
      </button>
    </div>
  );
}

export default SketchPad