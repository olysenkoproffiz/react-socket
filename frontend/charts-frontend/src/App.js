import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import MyLineChart from './charts/MyLineChart';
import MyBarChart from './charts/MyBarChart';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      endpoint: 'http://127.0.0.1:3001',
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("data", data => {
      let dataArray = [...this.state.response];

      switch (dataArray.length) {
        case 40:
          dataArray = [];
          break;

        default:
          dataArray = [...this.state.response];
      }

      dataArray.push(data);
      this.setState({
        ...this.state,
        response: dataArray,
      })
    });
  }

  render() {
    const { response } = this.state;

    // prepare data for LineChart
    // make received unix timestamp human readable and extract only the time data from it
    const improvedResponse = response.map((data) => {
      const formattedTime = new Date(data.timestamp).toTimeString().substring(0, 8);
      return (
        {
          value: data.value,
          timestamp: formattedTime
        }
      );
    })

    // prepare data for BarChart
    const range1 = this.state.response.filter((item) => {
      return (item.value > -100 && item.value < -10 || item.value === -10);
    });
    const range2 = this.state.response.filter((item) => {
      return (item.value > -10 && item.value < 0 || item.value === 0);
    });
    const range3 = this.state.response.filter((item) => {
      return (item.value > 0 && item.value < 10 || item.value === 10);
    });
    const range4 = this.state.response.filter((item) => {
      return (item.value > 10 && item.value < 20 || item.value === 20);
    });
    const range5 = this.state.response.filter((item) => {
      return (item.value > 20 && item.value < 30 || item.value === 30);
    });
    const range6 = this.state.response.filter((item) => {
      return (item.value > 30 && item.value < 40 || item.value === 40);

    });
    const range7 = this.state.response.filter((item) => {
      return (item.value > 40 && item.value < 50 || item.value === 50);
    });
    const range8 = this.state.response.filter((item) => {
      return (item.value > 50 && item.value < 100 || item.value === 100);
    });

    // forming object with data using response data from the server
    let modifiedResponseData = [
      { range: '-100--10', amount: range1.length },
      { range: '-10-0', amount: range2.length },
      { range: '0-10', amount: range3.length },
      { range: '10-20', amount: range4.length },
      { range: '20-30', amount: range5.length },
      { range: '30-40', amount: range6.length },
      { range: '40-50', amount: range7.length },
      { range: '50-100', amount: range8.length },
    ];

    return (
      <div className="App">
        <div style={{fontWeight: '600', paddingTop: '40px'}}>Hello from Socket.io React-charts app!</div>

        {/* render Line Chart */}
        <div style={lineChartStyle}>
          {response
            ?
            <div>
              <MyLineChart
                response={improvedResponse}
              />
            </div>
            : <p>Loading...</p>}
        </div>

        {/* render Bar chart */}
        <div style={lineChartStyle}>
          {response
            ?
            <div>
              <MyBarChart
                data={modifiedResponseData}
              />
            </div>
            : <p>Loading...</p>}
        </div>
      </div>
    );
  }
}

const lineChartStyle = { display: 'flex', justifyContent: 'center', marginTop: '20px', paddingBottom: '40px' };

export default App;
