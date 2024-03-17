import React from "react";

const AppSection = () => (
  <div className="app-section bg-info text-center pt-5"> {/* Added pt-5 for padding-top */}
    <p className="display-6 text-white p-3">Explore Climatic Trends Over 25 Years</p>
    <p className="lead text-white p-3">
      This project visualizes data collected from the City of Edmonton's Open Data website to analyze climatic trends spanning 25 years (2000-2024), including snowfall, rainfall, and temperature. Interactive components have been incorporated into the webpage, allowing users to select different years and view corresponding data.
    </p>
    <div className="row p-4">
      {/* Additional content or components can be added here */}
    </div>
  </div>
);

export default AppSection;
