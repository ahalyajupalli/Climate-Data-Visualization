import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg text-white" style={{ backgroundColor: '#14a2b8' }}>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/"><p className="tag3">Home</p></Link>
          </li>
          
          <li className="nav-item dropdown">
          <Link to="./About"><p className="tag3"> About Project</p></Link>
          </li> 
        </ul>
        
      </div>
    </nav>  
  );
};

export default Navbar;
