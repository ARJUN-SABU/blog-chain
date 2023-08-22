import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

import axios from "../axios";
import "./NewBlog.css";

function NewBlog() {
  const history = useHistory();

  const title = useRef(null);
  const author = useRef(null);
  const snippet = useRef(null);
  const body = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    // console.log(
    // title.current.value,
    //   author.current.value,
    //   snippet.current.value,
    //   body.current.value
    // );

    if (title.current.value == "") {
      alert("Please Give a Title !");
      return false;
    } else if (author.current.value == "") {
      alert("Please specify the Author name !");
      return false;
    } else if (snippet.current.value == "") {
      alert("Please give a Snippet for preview !");
      return false;
    } else if (body.current.value == "") {
      alert("Body shouldn't be empty !");
      return false;
    }

    axios
      .post("/create_blog", {
        title: title.current.value,
        author: author.current.value,
        snippet: snippet.current.value,
        body: body.current.value,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    history.push("/");
  }

  return (
    <div className="new_blog">
      <h1>Create a new Blog!</h1>

      <form className="new_blog_form">
        <label htmlFor="title">Title</label>
        <input type="text" ref={title} id="title" autoComplete="off" required />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          ref={author}
          id="author"
          autoComplete="off"
          required
        />
        <label htmlFor="snippet">Snippet(Blog Preview)</label>
        <input
          type="text"
          ref={snippet}
          id="snippet"
          autoComplete="off"
          required
        />
        <label htmlFor="body">Body(Blog content)</label>
        <textarea id="body" ref={body} required></textarea>

        <button onClick={handleSubmit}>Create Blog</button>
      </form>
    </div>
  );
}

export default NewBlog;
