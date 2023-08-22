import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Nav from "./Nav";
import Footer from "./Footer";
import AllBlogs from "./AllBlogs";
import NewBlog from "./NewBlog";
import BlogDetails from "./BlogDetails";
import ThankYou from "./ThankYou";
import About from "./About";

function App() {
  return (
    <Router>
      <div className="app">
        <Nav />

        <Switch>
          <Route path="/about">
            {/* About me */}
            <About />
          </Route>
          <Route path="/new_blog">
            {/* create a new blog */}
            <NewBlog />
          </Route>

          <Route path="/thank_you/:id">
            {/* Thank you page */}
            <ThankYou />
          </Route>
          <Route path="/:id">
            {/* Show the complete blog */}
            <BlogDetails />
          </Route>

          <Route path="/">
            {/* All Blogs */}
            <AllBlogs />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
