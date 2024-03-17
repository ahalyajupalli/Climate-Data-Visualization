import React from "react";

const Content = () => (
  <div className="tag5">
    <p className="display-4.5 arial text-black p-2"> 
      <p className="tag4">Tools and Frameworks Used</p>
      <br/>
      <div className="App">
        <table>
          <tr>
            <th>Tool/FrameWork</th>
            <th>Purpose</th>
          </tr>
          <tr>
            <td>Visual Studio Code</td>
            <td>Integrated Development Environment (IDE) for writing code</td>
          </tr>
          <tr>
            <td>Azure</td>
            <td>Cloud computing platform used for hosting the website</td>
          </tr>
          <tr>
            <td>CSS</td>
            <td>Styling language used to design the website's appearance</td>       
          </tr>
          <tr>
            <td>JavaScript</td>
            <td>Programming language used to create dynamic web pages</td>
          </tr>
          <tr>
            <td>ReactJs</td>
            <td>JavaScript library for building user interfaces and frontend frameworks</td>
          </tr>
          <tr>
            <td>Plotly</td>
            <td>JavaScript library for creating interactive data visualizations</td>
          </tr>
        </table>
      </div>
      <br/>
      <a className="btn btn-success btn-lg btn-primary" href="" role="button">
          Report Link
      </a>
    </p>
  </div>
);

export default Content;
