import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

class Avg_Min_Temp_Year_Wise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chartType: 'bar', // default chart type
            filterYearStart: '',
            filterYearEnd: ''
        }
    }

    componentDidMount() {
        const endpoint = "https://data.edmonton.ca/resource/s4ws-tdws.json?$query=SELECT%20year,%20avg(minimum_temperature_c)%20group%20by%20year%20order%20by%20year";
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data })
            })
    }

    transformData(data) {
        let x = []; // For scatter and pie chart labels
        let y = []; // For scatter plot and pie chart values

        data.forEach(each => {
            x.push(each.year);
            y.push(parseFloat(each.avg_minimum_temperature_c));
        });

        return { x, y };
    }

    handleChartTypeChange = (type) => {
        this.setState({ chartType: type });
    }

    handleFilterChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClick = (event) => {
        console.log('Clicked:', event.points[0]);
        // You can perform actions based on the clicked data point here
    }

    render() {
        const { chartType, data, filterYearStart, filterYearEnd } = this.state;
        let plotData;

        let filteredData = data;
        if (filterYearStart && filterYearEnd) {
            filteredData = data.filter(entry => entry.year >= filterYearStart && entry.year <= filterYearEnd);
        }

        if (chartType === 'scatter') {
            const { x, y } = this.transformData(filteredData);
            plotData = [{
                type: 'scatter',
                mode: 'markers',
                x: x,
                y: y,
                marker: { color: 'maroon' } // Maroon color for scatter plot
            }];
        } else {
            plotData = [{
                type: chartType,
                x: filteredData.map(each => each.year),
                y: this.transformData(filteredData).y,
                marker: { color: chartType === 'bar' ? '#800080' : 'red' } // Lavender color for bar chart and red for line plot
            }];
        }

        return (
            <div>
                <center>
                    <Plot
                        data={plotData}
                        layout={{
                            width: 1000,
                            height: 800,
                            title: `Average Yearly Minimum Temperature in Edmonton from 2000-2024`,
                            xaxis: { title: 'Calendar Year' }, // Update x-axis label
                            yaxis: { title: 'Temperature (°C)' }
                        }}
                        onClick={this.handleClick}
                    />
                    <div className="buttons-container">
                        <button onClick={() => this.handleChartTypeChange('bar')}>Bar Chart</button>
                        <button onClick={() => this.handleChartTypeChange('line')}>Line Chart</button>
                        <button onClick={() => this.handleChartTypeChange('scatter')}>Scatter Plot</button>
                    </div>
                    <div className="filter-options">
                        <label>Filter by Year Start:</label>
                        <input type="number" name="filterYearStart" value={filterYearStart} onChange={this.handleFilterChange} />
                        <label>End:</label>
                        <input type="number" name="filterYearEnd" value={filterYearEnd} onChange={this.handleFilterChange} />
                    </div>
                </center>
            </div>
        )
    }
}

export default Avg_Min_Temp_Year_Wise;
