import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './App.css'; // Corrected import statement

class Monthly_Precipitation_Year extends Component {
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
        const endpoint = "https://data.edmonton.ca/resource/s4ws-tdws.json?$select=year,month,avg(total_rain_mm)&$group=year,month&$order=year,month";
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
        let monthlyPrecipitation = Array.from({ length: 12 }, () => 0); // Initialize array for monthly precipitation

        data.forEach(each => {
            if (each.year === this.state.selectedYear) {
                monthlyPrecipitation[parseInt(each.month) - 1] = parseFloat(each.avg_total_rain_mm);
            }
        });

        return monthlyPrecipitation;
    }

    render() {
        const { data, selectedYear, chartType } = this.state;
        const monthlyPrecipitation = this.transformData(data);
        let plotData;

        if (chartType === 'bar') {
            plotData = [{
                type: 'bar',
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                y: monthlyPrecipitation,
                marker: { color: 'gold' } // Set color to gold for bars
            }];
        }

        return (
            <div className="container"> {/* Wrap the content in a container for styling */}
                <div className="year-selector"> {/* Add class for styling */}
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
                            title: `Average Monthly Precipitation in ${selectedYear}`,
                            xaxis: { title: 'Month' },
                            yaxis: { title: 'Precipitation (mm)' }
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Monthly_Precipitation_Year;
