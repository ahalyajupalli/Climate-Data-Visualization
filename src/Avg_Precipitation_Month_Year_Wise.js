import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

class Avg_Precipitation_Month_Year_Wise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chartType: 'bar' // default chart type
        }
    }

    componentDidMount() {
        // Add the user variable to get Precipitation for a particular year for all 12 months
        const endpoint = "https://data.edmonton.ca/resource/s4ws-tdws.json?$query=SELECT%20year,%20avg(total_precipitation_mm)%20group%20by%20year%20order%20by%20year"
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data })
            })

    }

    transformData(data) {
        let plot_data = [];
        let y = [];

        data.map(each => {
            var precipitation = parseFloat(each.avg_total_precipitation_mm)
            y.push(precipitation)

        })
        plot_data['y'] = y;
        return plot_data;
    }

    handleChartTypeChange = (type) => {
        this.setState({ chartType: type });
    }

    render() {
        return (
            <div>
                <center>
                    <Plot
                        data={[
                            {
                                type: this.state.chartType,
                                x: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
                                y: this.transformData(this.state.data)['y'],
                                marker: { color: 'blue' }
                            }
                        ]}

                        layout={{ width: 1000, height: 800, title: "Average Yearly Precipitation in Edmonton from 2000-2024" }}
                    />
                    <div>
                        <button onClick={() => this.handleChartTypeChange('bar')}>Bar Chart</button>
                        <button onClick={() => this.handleChartTypeChange('scatter')}>Scatter Plot</button>
                        <button onClick={() => this.handleChartTypeChange('line')}>Line Chart</button>
                    </div>
                </center>
            </div>
        )
    }
}

export default Avg_Precipitation_Month_Year_Wise;
