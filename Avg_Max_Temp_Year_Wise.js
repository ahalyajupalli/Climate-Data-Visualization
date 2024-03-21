import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import './App.css';
class Avg_Max_Temp_Year_Wise extends Component{
    constructor(props){
        super(props);
        this.state={data:[]}
    }
    componentDidMount(){
        const endpoint="https://data.edmonton.ca/resource/s4ws-tdws.json?$query=SELECT%20year,%20avg(maximum_temperature_c)%20group%20by%20year%20order%20by%20year";
        fetch(endpoint)
        .then(response =>response.json())
        .then(data=>{
            this.setState({data:data})
        })

    }
     
    transformData (data) {
            let plot_data = [];
            let y=[];
            
            data.map(each => {  
                var max=parseFloat(each.avg_maximum_temperature_c)
                y.push(max)   
            
            }
            )  
     
            plot_data['y']=y
            console.log(y)
            return plot_data
        }

    

render() {
    return (
        <div>
            <center>
           <Plot
                data = {[
                        {type: 'scatter',
                         mode: 'lines',
                         x: ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"],
                         y: this.transformData(this.state.data)['y'],
                         marker: { color: '#ed022d'}}
                    ]}
                
                    layout={{width:1000,height:800,title:"Maximum Temperatures of each year"}}
             />
         </center>    
        </div>
    )
}
}

export default Avg_Max_Temp_Year_Wise
