import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p>Copyright &copy; BlogChain Inc. {new Date().getFullYear()}</p>
    </div>
  );
}

export default Footer;
