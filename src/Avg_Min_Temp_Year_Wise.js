import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

class Avg_Min_Temp_Year_Wise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yearlyData: [],
            monthlyData: [],
            selectedYear: '2023', // Default selected year for monthly graph
            chartType: 'bar', // Default chart type
            filterYearStart: '',
            filterYearEnd: ''
        }
    }

    componentDidMount() {
        this.fetchYearlyData();
        this.renderMonthlyChart();
    }

    fetchYearlyData = () => {
        const endpoint = "https://data.edmonton.ca/resource/s4ws-tdws.json?$query=SELECT%20year,%20avg(minimum_temperature_c)%20group%20by%20year%20order%20by%20year";
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                this.setState({ yearlyData: data })
            })
    }

    renderMonthlyChart = () => {
        const { selectedYear } = this.state;
        const endpoint = `https://data.edmonton.ca/resource/s4ws-tdws.json?$select=month,avg(minimum_temperature_c)&$where=year=${selectedYear}&$group=month&$order=month`;
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                this.setState({ monthlyData: data });
            });
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

    handleYearChange = (event) => {
        this.setState({ selectedYear: event.target.value }, () => {
            this.renderMonthlyChart();
        });
    }

    render() {
        const { selectedYear, chartType, yearlyData, monthlyData, filterYearStart, filterYearEnd } = this.state;
        let plotDataYearly, plotDataMonthly;

        // Yearly graph data
        let filteredYearlyData = yearlyData;
        if (filterYearStart && filterYearEnd) {
            filteredYearlyData = yearlyData.filter(entry => entry.year >= filterYearStart && entry.year <= filterYearEnd);
        }

        if (chartType === 'scatter') {
            const { x, y } = this.transformData(filteredYearlyData);
            plotDataYearly = [{
                type: 'scatter',
                mode: 'markers',
                x: x,
                y: y,
                marker: { color: 'maroon' } // Maroon color for scatter plot
            }];
        } else {
            plotDataYearly = [{
                type: chartType,
                x: filteredYearlyData.map(each => each.year),
                y: this.transformData(filteredYearlyData).y,
                marker: { color: chartType === 'bar' ? '#800080' : 'red' } // Lavender color for bar chart and red for line plot
            }];
        }

        // Monthly graph data
        plotDataMonthly = [{
            type: 'bar',
            x: monthlyData.map(month => month.month),
            y: monthlyData.map(month => parseFloat(month.avg_minimum_temperature_c)),
            marker: { color: '#CC5500' } // Light green color for bar chart
        }];

        return (
            <div>
                <center>
                    {/* Yearly graph */}
                    <Plot
                        data={plotDataYearly}
                        layout={{
                            width: 1000,
                            height: 700,
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

                    {/* Monthly graph */}
                    <Plot
                        data={plotDataMonthly}
                        layout={{
                            width: 1000,
                            height: 600,
                            title: `Monthly Minimum Temperature in ${selectedYear}`,
                            xaxis: {
                                title: 'Month',
                                tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                ticktext: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                            },
                            yaxis: { title: 'Temperature (°C)' }
                        }}
                    />
                    <label className="select-year-label">Select Year:</label>
                    <select value={selectedYear} onChange={this.handleYearChange} className="select-year-dropdown">
                        {Array.from(new Set(yearlyData.map(item => item.year))).map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </center>
            </div>
        );
    }
}

export default Avg_Min_Temp_Year_Wise;

