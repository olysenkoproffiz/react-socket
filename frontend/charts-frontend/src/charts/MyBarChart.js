import * as React from 'react';
import { BarChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const MyBarChart = (props) => {
  return (
    <BarChart
      width={window.innerWidth - 100}
      height={400}
      data={props.data}
      style={{ border: '1px solid lightblue', backgroundColor: 'white', borderRadius: '5px' }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  );
}

export default MyBarChart