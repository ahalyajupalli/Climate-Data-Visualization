import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

class Avg_Max_Temp_Year_Wise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chartType: 'bar' // default chart type
        }
    }

    componentDidMount() {
        const endpoint = "https://data.edmonton.ca/resource/s4ws-tdws.json?$query=SELECT%20year,%20avg(maximum_temperature_c)%20group%20by%20year%20order%20by%20year";
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
            y.push(parseFloat(each.avg_maximum_temperature_c));
        });

        return { x, y };
    }

    handleChartTypeChange = (type) => {
        this.setState({ chartType: type });
    }

    render() {
        const { chartType, data } = this.state;
        let plotData;

        if (chartType === 'pie') {
            const { x, y } = this.transformData(data);
            plotData = [{
                type: 'pie',
                labels: x,
                values: y,
                marker: { colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'] }
            }];
        } else if (chartType === 'scatter') {
            const { x, y } = this.transformData(data);
            plotData = [{
                type: 'scatter',
                mode: 'markers',
                x: x,
                y: y,
                marker: { color: '#1f77b4' }
            }];
        } else {
            plotData = [{
                type: chartType,
                x: data.map(each => each.year),
                y: this.transformData(data).y,
                marker: { color: '#1f77b4' }
            }];
        }

        return (
            <div>
                <center>
                    <Plot
                        data={plotData}
                        layout={{ width: 1000, height: 800, title: `Average Yearly Maximum Temperature in Edmonton from 2000-2024 (${chartType})` }}
                    />
                    <div>
                        <button onClick={() => this.handleChartTypeChange('bar')}>Bar Chart</button>
                        <button onClick={() => this.handleChartTypeChange('pie')}>Pie Chart</button>
                        <button onClick={() => this.handleChartTypeChange('line')}>Line Chart</button>
                        <button onClick={() => this.handleChartTypeChange('scatter')}>Scatter Plot</button>
                    </div>
                </center>
            </div>
        )
    }
}

export default Avg_Max_Temp_Year_Wise;
