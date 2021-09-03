import React from "react";
import ReactDOM from "react-dom";

function Hi({ isOpen }) {
  return <div>this is Hi World! {isOpen ? "open" : "closed"}</div>;
}

const Hello = ({ isOpen }) => (<div>

  this is Hello World!{isOpen}
  <br />
  {isOpen ? <button>turn it off</button> : <button>turn it on</button>}

</div>);


ReactDOM.render(<div>

  <Hi isOpen={false} />
  <Hello isOpen={false} />

</div>, document.querySelector("#root"));



