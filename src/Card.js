import React from "react";
import {Link} from 'react-router-dom'

const Card = ({
  title = "Not Defined",
  buttonText = "MyButton",
  subject = "Default Subject",
  path="Deafult image",
  linkpath="Default Path"
}) => {
  return (
    <div className="card" style={{ width: "25rem" ,height:"35rem", border: "2px solid"}}>
      <img
        src={path}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{subject}</p>
        <Link to={linkpath}><p className="tag6">{buttonText}</p></Link>
        
      </div>
    </div>
  );
};

export default Card;