import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

import "./BlogDetails.css";
import axios from "../axios";

function BlogDetails() {
  const [Title, setTitle] = useState("Title");
  const [Author, setAuthor] = useState("Author");
  const [DateTime, setDateTime] = useState("DateTime");
  const [updated, setUpdated] = useState("updated time");
  const [Body, setBody] = useState("Body");

  const parameter = useParams();

  const history = useHistory();

  const sendToUserEmail = useRef("");
  const deleteBlogMail = useRef("");
  const whyDelete = useRef("");
  const ideaUserName = useRef("");
  const ideaMail = useRef("");
  const ideaText = useRef("");

  useEffect(() => {
    async function getBlog() {
      await axios
        .get(`/get_blog/${parameter.id}`)
        .then((response) => {
          setTitle(response.data.title);
          setAuthor(response.data.author);
          setDateTime(new Date(response.data.createdAt).toString());
          setUpdated(new Date(response.data.updatedAt).toString());
          setBody(response.data.body.replaceAll("<br>", "\n"));
        })
        .catch((err) => console.log(err));
    }

    getBlog();
  }, []);

  //to give alert if the email is invalid or empty.
  function checkMail(inputMail) {
    //username@domainName.extension.extension
    //regular expression for a valid email
    const regx = /^([a-z 0-9 \. -]{1,64})@([a-z 0-9 -]{1,255}).([a-z]{2,8})(.[a-z]{2,8})?$/;
    if (!regx.test(inputMail)) {
      alert("Enter a valid Email address!");
      return false;
    } else return true;
  }

  //to send the email id of the user who deleted the blog
  //and the reason of deletion and the blog itself to the admin
  function removeBlog() {
    //Check if the mail is valid or not.
    if (!checkMail(deleteBlogMail.current.value)) return;

    if (whyDelete.current.value === "") {
      alert("Field can't be empty");
      return;
    }

    axios
      .post(`/remove_blog/${parameter.id}`, {
        user: deleteBlogMail.current.value,
        reason: whyDelete.current.value,
      })
      .then((response) =>
        history.replace(
          "/thank_you/The blog has been deleted. Go back to the home page :)"
        )
      )
      .catch((err) => console.log(err));
  }

  //to send the blog to the user's mail
  function sendToUser() {
    if (!checkMail(sendToUserEmail.current.value)) return;

    console.log("after check");

    axios
      .post(`/send_to_user/${parameter.id}`, {
        user_email: sendToUserEmail.current.value,
      })
      .then((response) =>
        history.push(
          "/thank_you/Check your mail, your favourite blog is waiting ;-)"
        )
      )
      .catch((err) => console.log(err));
  }

  //to add the new idea to the blog and notfiy the admin
  //by sending the name and email of the person who added
  //the idea with the new blog.
  function handleIdea() {
    if (ideaUserName.current.value === "" || ideaText.current.value === "") {
      alert("Field can't be empty!");
      return;
    }

    if (!checkMail(ideaMail.current.value)) return;

    axios
      .put(`/add_idea/${parameter.id}`, {
        name: ideaUserName.current.value,
        email: ideaMail.current.value,
        idea: ideaText.current.value,
      })
      .then((response) => {
        history.push(
          "/thank_you/Your Ideas have been added. Go back and enjoy :}"
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="blog_details">
      <div className="blog">
        <h1>{Title}</h1>
        <div className="blog_body">
          <div className="info">
            <p>
              <span>By:</span> {Author}
            </p>
            <p>
              <span>Created:</span> {DateTime}
            </p>
            <p>
              <span>Last Updated:</span> {updated}
            </p>
          </div>

          <p className="content">{Body}</p>
        </div>
      </div>

      <div className="blog_options">
        <div className="option option_1">
          <h4>Enjoyed the Blog :)</h4>
          <div>
            <p>
              Get a copy of this blog in your inbox ! (Note: In some cases, you
              may not find your mail in your indox, kindly check your spam).
            </p>
            <div className="submit_info">
              <input
                type="email"
                placeholder="Your Email"
                autoComplete="off"
                ref={sendToUserEmail}
              ></input>
              <button onClick={sendToUser}>Get !</button>
            </div>
          </div>
        </div>

        <div className="option option_2">
          <h4>Expert in this topic?</h4>
          <div>
            <p>
              Just submit your knowledge and that will be visible immediately on
              the website just after the originial blog with your name!!. (Note:
              Admin will be notified about the change for future reference).
            </p>
            <div className="submit_info">
              <input
                type="text"
                placeholder="Your Name"
                autoComplete="off"
                ref={ideaUserName}
              ></input>
              <input
                type="email"
                placeholder="Your Email"
                autoComplete="off"
                ref={ideaMail}
              ></input>
              <textarea
                ref={ideaText}
                placeholder="Your Expertise Please....."
              ></textarea>
              <button onClick={handleIdea}>Add your ideas</button>
            </div>
          </div>
        </div>

        <div className="option option_3">
          <h4>Didn't Enjoy :(</h4>
          <div>
            <p>
              {" "}
              Consider deleting it! Please provide your email address and why
              you want to delete the blog! (Note: Admin will be notified about
              the change for future reference).
            </p>
            <div className="submit_info">
              <input
                type="email"
                placeholder="Your Email"
                autoComplete="off"
                ref={deleteBlogMail}
              ></input>
              <textarea
                type="text"
                placeholder="Why do you want to delete the blog?"
                autoComplete="off"
                ref={whyDelete}
              ></textarea>
              <button onClick={removeBlog}>
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
