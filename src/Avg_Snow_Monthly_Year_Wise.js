import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

class Avg_Snow_Monthly_Year_Wise extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], error: null, chartType: 'line' }; // Set default chart type to line
    }

    componentDidMount() {
        const endpoint = "https://data.edmonton.ca/resource/s4ws-tdws.json?$query=SELECT%20year,%20avg(total_snow_cm)%20group%20by%20year%20order%20by%20year";
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ data: data, error: null });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error: error.message });
            });
    }

    transformData(data) {
        const plotData = {
            x: [],
            y: []
        };

        data.forEach(each => {
            plotData.x.push(each.year);
            plotData.y.push(parseFloat(each.avg_total_snow_cm));
        });

        return plotData;
    }

    handleChartTypeChange = (type) => {
        this.setState({ chartType: type });
    }

    render() {
        const { data, error, chartType } = this.state;

        if (error) {
            return <div>Error: {error}</div>;
        }

        const plotData = this.transformData(data);

        let plotConfig = {
            width: 1000,
            height: 800,
            title: `Average Yearly Snowfall in Edmonton from 2000-2024 (${chartType})`
        };

        if (chartType === 'pie') {
            plotConfig.type = 'pie';
            plotConfig.values = plotData.y;
            plotConfig.labels = plotData.x;
            plotConfig.marker = { colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'] };
        } else if (chartType === 'scatter') {
            plotConfig.type = 'scatter';
            plotConfig.mode = 'markers';
            plotConfig.x = plotData.x;
            plotConfig.y = plotData.y;
            plotConfig.marker = { color: '#1f77b4' };
        } else if (chartType === 'bar') {
            plotConfig.type = 'bar';
            plotConfig.x = plotData.x;
            plotConfig.y = plotData.y;
            plotConfig.marker = { color: '#1f77b4' };
        } else {
            plotConfig = {
                type: 'scatter',
                mode: 'lines',
                x: plotData.x,
                y: plotData.y,
                marker: { color: '#1f77b4' }
            };
        }

        return (
            <div>
                <center>
                    <Plot
                        data={[plotConfig]}
                        layout={plotConfig}
                    />
                    <div>
                        <button onClick={() => this.handleChartTypeChange('line')}>Line Chart</button>
                        <button onClick={() => this.handleChartTypeChange('scatter')}>Scatter Plot</button>
                        <button onClick={() => this.handleChartTypeChange('bar')}>Bar Chart</button>
                        <button onClick={() => this.handleChartTypeChange('pie')}>Pie Chart</button>
                    </div>
                </center>
            </div>
        );
    }
}

export default Avg_Snow_Monthly_Year_Wise;
