import React from "react";
import ReactDOM from "react-dom";
import "./index.css"

function Room() {

  const [isBright, setIsBright] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  
  var a = "something";

  const handlechange = () => {
    setIsBright(!isBright);

    a = "something else";
    console.log(a);
  };

  const add = () => {

    setCounter((prev) => {
      return prev+1
    })
    setCounter((prev) => {
      return prev+1
    })
  };

  return (
    <div className={(isBright) ? "Bright" : "Dark"}>

      {a}

      <br />
      the room is {isBright ? "Bright" : "Dark"}

      <br />
      <button onClick={handlechange}>change</button>

      <br />
      <br />
      {counter}
      <button onClick={add}>Add</button>

    </div>);
}
ReactDOM.render(<Room />, document.getElementById("root"));
