import React from "react";
import ReactDOM from "react-dom";
import "./index.css"

function Room() {
  const [isBright, setIsBright] = React.useState(false);
  var a = "something";

  const handlechange = () => {
    setIsBright(!isBright);
    a = "something else";
    console.log(a);
  };
  return (
    <div className={(isBright) ? "Bright" : "Dark"}>

      {a}

      <br />
      the room is {isBright ? "Bright" : "Dark"}

      <br />
      <button onClick={handlechange}>change</button>

    </div>);
}

ReactDOM.render(<Room />, document.getElementById("root"));
