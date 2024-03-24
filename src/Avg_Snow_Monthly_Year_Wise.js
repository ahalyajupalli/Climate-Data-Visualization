import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './App.css'; // Corrected import statement

class Monthly_Snow_Year extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedYear: '2023', // Default selected year
            chartType: 'bar', // Default chart type
        };
    }

    componentDidMount() {
        // Fetch data for all years initially
        const endpoint = "https://data.edmonton.ca/resource/s4ws-tdws.json?$select=year,month,avg(total_snow_cm)&$group=year,month&$order=year,month";
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data });
            });
    }

    handleYearChange = (event) => {
        this.setState({ selectedYear: event.target.value });
    }

    transformData(data) {
        let monthlySnow = Array.from({ length: 12 }, () => 0); // Initialize array for monthly snowfall

        data.forEach(each => {
            if (each.year === this.state.selectedYear) {
                monthlySnow[parseInt(each.month) - 1] = parseFloat(each.avg_total_snow_cm);
            }
        });

        return monthlySnow;
    }

    render() {
        const { data, selectedYear, chartType } = this.state;
        const monthlySnow = this.transformData(data);
        let plotData;

        if (chartType === 'bar') {
            plotData = [{
                type: 'bar',
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                y: monthlySnow,
                marker: { color: 'plum' } // Set color to plum for bars
            }];
        } else {
            plotData = [{
                type: 'scatter',
                mode: 'lines+markers',
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                y: monthlySnow,
                marker: { color: 'gold' } // Set color to gold for lines
            }];
        }

        return (
            <div className="container"> {/* Wrap the content in a container for styling */}
                <div className="dropdown-container"> {/* Container for the dropdown */}
                    <label>Select Year:</label>
                    <select value={selectedYear} onChange={this.handleYearChange}>
                        {/* Populate options dynamically based on available years in the dataset */}
                        {Array.from(new Set(data.map(item => item.year))).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="graph-container"> {/* Container for the graph */}
                    <Plot
                        data={plotData}
                        layout={{
                            width: 1000,
                            height: 800,
                            title: `Average Monthly Snowfall in ${selectedYear}`,
                            xaxis: { title: 'Month' },
                            yaxis: { title: 'Snowfall ' }
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Monthly_Snow_Year;
