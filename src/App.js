import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AppSection from "./AppSection";
import CardSection from "./CardSection";
//import Footer from "./Footer";
import About from "./About";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import Avg_Max_Temp_Year_Wise from "./Avg_Max_Temp_Year_Wise";
import Avg_Min_Temp_Year_Wise from "./Avg_Min_Temp_Year_Wise";
import Avg_Precipitation_Month_Year_Wise from "./Avg_Precipitation_Month_Year_Wise";
import Avg_Snow_Monthly_Year_Wise from "./Avg_Snow_Monthly_Year_Wise";;
const App = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
        <Route path="/" exact component ={Home}/>
        <Route path="/About" exact component={About}/>
        <Route path="/Avg_Max_Temp_Year_Wise" exact component={Avg_Max_Temp_Year_Wise}/>
        <Route path="/Avg_Min_Temp_Year_Wise" exact component={Avg_Min_Temp_Year_Wise}/>
        <Route path="/Avg_Precipitation_Month_Year_Wise" exact component={Avg_Precipitation_Month_Year_Wise}/>
        <Route path="/Avg_Snow_Monthly_Year_Wise" exact component={Avg_Snow_Monthly_Year_Wise}/>
        </Switch>
      
      </Router>
    </>
  );
};

export default App;
