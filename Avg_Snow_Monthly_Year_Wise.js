import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

class Avg_Snow_Monthly_Year_Wise extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], error: null }; // Added error state
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
                this.setState({ data: data, error: null }); // Reset error state if successful
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error: error.message }); // Set error state if fetch fails
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

    render() {
        const { data, error } = this.state;

        if (error) {
            return <div>Error: {error}</div>;
        }

        const plotData = this.transformData(data);

        return (
            <div>
                <center>
                    <Plot
                        data={[
                            {
                                type: 'scatter',
                                mode: 'lines',
                                x: plotData.x,
                                y: plotData.y,
                                marker: { color: 'pink' }
                            }
                        ]}
                        layout={{
                            width: 1000,
                            height: 800,
                            title: "Average Yearly Snowfall in Edmonton from 2000-2024"
                        }}
                    />
                </center>
            </div>
        );
    }
}

export default Avg_Snow_Monthly_Year_Wise;
