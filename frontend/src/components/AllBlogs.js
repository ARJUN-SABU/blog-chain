import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./AllBlogs.css";
import BlogCapsule from "./BlogCapsule";
import axios from "../axios";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      await axios
        .get("/get_blogs")
        .then((response) => {
          setBlogs(response.data);
        })
        .catch((err) => console.log(err));
    }

    fetchBlogs();
  }, []);

  return (
    <div className="all_blogs">
      <h1>All Blogs</h1>

      <div className="borders">
        <div className="border_left"></div>
        <div className="border_right"></div>
      </div>

      <div className="blogs">
        {blogs.map((blog, index) => (
          <Link
            key={blog._id}
            className="blog_link"
            to={`/${blog._id}`}
            style={{ textDecoration: "none" }}
          >
            <BlogCapsule
              date={blog.createdAt.substring(8, 10)}
              month={blog.createdAt.substring(5, 7)}
              year={blog.createdAt.substring(0, 4)}
              day={new Date(blog.createdAt).toString().substring(0, 3)}
              time={new Date(blog.createdAt).toString().substring(16, 21)}
              title={blog.title}
              snippet={blog.snippet}
              author={blog.author}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllBlogs;
