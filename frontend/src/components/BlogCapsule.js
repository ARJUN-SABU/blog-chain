import React from "react";
import "./BlogCapsule.css";

function BlogCapsule(props) {
  //get the month from a number.
  function getMonthNow(month) {
    switch (month) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
    }
  }

  return (
    <div className="blog_capsule">
      <div className="capsule_left">
        <h4>{props.day}</h4>
        <h1>{props.date}</h1>
        <div>
          <p>{getMonthNow(props.month)}</p>
          <p>{props.year}</p>
          <p>({props.time} IST)</p>
        </div>
      </div>
      <div className="capsule_right">
        <h1>{props.title[0].toUpperCase() + props.title.slice(1)}</h1>
        <p className="author">
          Author: {props.author[0].toUpperCase() + props.author.slice(1)}
        </p>
        <p className="snippet">
          {props.snippet[0].toUpperCase() + props.snippet.substring(1, 200)}...
        </p>
      </div>
    </div>
  );
}

export default BlogCapsule;
