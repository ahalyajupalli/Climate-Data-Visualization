import React from "react";
import cold from "./lowtemp.jpeg";
import hot from './wmt.jpeg';
import snowfall from './snowf.jpeg';
import rain from './raining.jpeg';

const CardSection = () => {
  return (
    <section className="cardsec">
      <div className="container">
      <h2 style={{
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#ffffff',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  marginBottom: '20px'
}}>Climate Data Visualization</h2>

        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <img src={rain} className="card-img-top" alt="Average Rainfall in Edmonton" />
              <div className="card-body">
                <h5 className="card-title">Average Rainfall in Edmonton</h5>
                <p className="card-text">Average Precipitation in Edmonton over 24 years(2000-2024)</p>
                <a href="./Avg_Precipitation_Month_Year_Wise" className="btn btn-primary">Average Precipitation</a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img src={cold} className="card-img-top" alt="Minimum Average Temperature" />
              <div className="card-body">
                <h5 className="card-title">Minimum Average Temperature</h5>
                <p className="card-text">Average Minimum Temperature in Edmonton over 24 years(2000-2024)</p>
                <a href="./Avg_Min_Temp_Year_Wise" className="btn btn-primary">Minimum Temperature</a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img src={hot} className="card-img-top" alt="Maximum Average Temperature" />
              <div className="card-body">
                <h5 className="card-title">Maximum Average Temperature</h5>
                <p className="card-text">Average Maximum Temperature in Edmonton over 24 years(2000-2024)</p>
                <a href="./Avg_Max_Temp_Year_Wise" className="btn btn-primary">Maximum Temperature</a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <img src={snowfall} className="card-img-top" alt="Average SnowFall" />
              <div className="card-body">
                <h5 className="card-title">Average SnowFall in Edmonton</h5>
                <p className="card-text">Average Snowfall on Ground in Edmonton over 24 years(2000-2024)</p>
                <a href="./Avg_Snow_Monthly_Year_Wise" className="btn btn-primary">Snowfall on Ground</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;
