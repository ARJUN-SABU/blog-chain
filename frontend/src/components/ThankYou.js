import React from "react";
import "./ThankYou.css";

import { useParams } from "react-router-dom";

function ThankYou() {
  return (
    <div className="thank_you">
      <h1>Thank You!</h1>
      <p>{useParams().id}</p>
    </div>
  );
}

export default ThankYou;
