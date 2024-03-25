import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

class Avg_Max_Temp_Year_Wise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedYear: '2023', // Initialize selected year as 2023
            chartType: 'bar', // Default chart type
            filterYearStart: '', // Initialize filter start year
            filterYearEnd: '', // Initialize filter end year
            monthlyData: [],
            monthlyTemperatures: [],
        };
    }

    componentDidMount() {
        this.fetchYearlyData();
    }

    fetchYearlyData = () => {
        const endpoint = "https://data.edmonton.ca/resource/s4ws-tdws.json?$query=SELECT%20year,%20avg(maximum_temperature_c)%20group%20by%20year%20order%20by%20year";
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data });
            });
    }

    handleYearChange = (event) => {
        this.setState({ selectedYear: event.target.value }, () => {
            this.renderMonthlyChart();
        });
    }

    handleChartTypeChange = (type) => {
        this.setState({ chartType: type });
    }

    handleFilterChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    renderMonthlyChart = () => {
        const { selectedYear } = this.state;
        if (!selectedYear) return; // Don't render if selectedYear is empty

        const endpoint = `https://data.edmonton.ca/resource/s4ws-tdws.json?$select=month,avg(maximum_temperature_c)&$where=year=${selectedYear}&$group=month&$order=month`;
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                const monthlyTemperatures = data.map(month => parseFloat(month.avg_maximum_temperature_c));
                this.setState({ monthlyData: data, monthlyTemperatures: monthlyTemperatures });
            });
    }

    renderYearlyChart = () => {
        const { data, chartType, filterYearStart, filterYearEnd } = this.state;
        let yearlyData = data;

        // Apply filter if start and end years are provided
        if (filterYearStart && filterYearEnd) {
            yearlyData = data.filter(entry => entry.year >= filterYearStart && entry.year <= filterYearEnd);
        }

        const yearlyTemperatures = yearlyData.map(year => parseFloat(year.avg_maximum_temperature_c));

        let plotData;

        switch (chartType) {
            case 'bar':
                plotData = [{
                    type: 'bar',
                    x: yearlyData.map(year => year.year),
                    y: yearlyTemperatures,
                    marker: { color: 'orange' } // Set bar color to orange
                }];
                break;
            case 'pie':
                plotData = [{
                    type: 'pie',
                    labels: yearlyData.map(year => year.year),
                    values: yearlyTemperatures,
                    marker: { colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'] }
                }];
                break;
            case 'line':
                plotData = [{
                    type: 'line',
                    x: yearlyData.map(year => year.year),
                    y: yearlyTemperatures,
                    line: { color: 'red' } // Set line color to red
                }];
                break;
            default:
                break;
        }

        return (
            <Plot
                data={plotData}
                layout={{
                    width: 1000,
                    height: 700, // Increased graph height
                    title: `Average Yearly Maximum Temperature in Edmonton`,
                    xaxis: { title: 'Calendar Year' },
                    yaxis: { title: 'Temperature (°C)' }
                }}
            />
        );
    }

    render() {
        const { selectedYear, filterYearStart, filterYearEnd } = this.state;

        return (
            <div className="container">
                <center>
                    <div className="yearly-chart">
                        {this.renderYearlyChart()}
                        <div className="buttons-container">
                            <button onClick={() => this.handleChartTypeChange('bar')}>Bar Chart</button>
                            <button onClick={() => this.handleChartTypeChange('pie')}>Pie Chart</button>
                            <button onClick={() => this.handleChartTypeChange('line')}>Line Chart</button>
                        </div>
                        <div className="filter-options">
                            <label>Filter by Year Start:</label>
                            <input type="number" name="filterYearStart" value={filterYearStart} onChange={this.handleFilterChange} />
                            <label>End:</label>
                            <input type="number" name="filterYearEnd" value={filterYearEnd} onChange={this.handleFilterChange} />
                        </div>
                    </div>
                    <div className="monthly-chart">
                        <Plot
                            data={[{
                                type: 'bar',
                                x: this.state.monthlyData.map(month => month.month),
                                y: this.state.monthlyTemperatures,
                                marker: { color: 'lightgreen' }
                            }]}
                            layout={{
                                width: 1000,
                                height: 600, // Increased graph height
                                title: `Monthly Maximum Temperature in ${selectedYear}`,
                                xaxis: { title: 'Month', tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], ticktext: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
                                yaxis: { title: 'Temperature (°C)' }
                            }}
                        />
                        <div className="select-year-container">
                            <label className="select-year-label">Select Year:</label>
                            <select className="select-year-dropdown" value={selectedYear} onChange={this.handleYearChange}>
                                {Array.from(new Set(this.state.data.map(item => item.year))).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </center>
            </div>
        );
    }
}

export default Avg_Max_Temp_Year_Wise;

