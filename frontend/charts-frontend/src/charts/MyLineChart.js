import * as React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, ...];

const MyLineChart = (props) => {
  return (
    <LineChart
      width={window.innerWidth - 100}
      height={400} data={props.response}
      style={{ border: '1px solid lightblue', backgroundColor: 'white', borderRadius: '5px' }}
    >
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}

export default MyLineChart