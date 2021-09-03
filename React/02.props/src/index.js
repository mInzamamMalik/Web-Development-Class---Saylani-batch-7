import React from 'react';
import ReactDOM from 'react-dom';

import "./index.css"
import img1 from "./image/download.jpeg"
import img2 from "./image/img2.jpeg"
import img3 from "./image/img3.png"

function Hi(props) {
  return <div id="main">

    Hello <strong>{props.name}!</strong>
    <br />
    {props.date}
    {2 + 5}
    <p>this is a para</p>
    <div>this is a div</div>
    <img className="img" src={props.img} />
  </div>;
}
ReactDOM.render(
  <div>
    <Hi name="Inzamam" date="12/12/2021" img={img1}/>
    <Hi name="Ali" date="1/12/2021" img={img2} />
    <Hi name="Arsalan" date="2/12/2021" img={img3} />
  </div>,
  document.querySelector('#root'));