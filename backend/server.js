const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./model/BlogSchema");
const transporter = require("./mailSender");
require("dotenv").config();

const app = express();

//middleware
//1. allow all Cross-origin-requests.
app.use(
  cors({
    origin: "*",
  })
);
//2. to get the data from url of a post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connect to mongo DB
const dbURI =
  "mongodb+srv://arjunsabu99:zet4OzXXYTZrkMTF@cluster0.ibgcpfu.mongodb.net/blog-chain?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => console.log("connected to the database."));

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is up and running!`);
});

app.get("/get_blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

app.post("/create_blog", (req, res) => {
  const blog = new Blog(req.body);
  blog.save();
  res.send("blog received");
});

app.get("/get_blog/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => console.log(err));
});

//delete the blog
app.post("/remove_blog/:id", (req, res) => {
  //first send the blog to be deleted to the admin
  //along with the email of the user who deleted it
  //and the reason of deletion
  Blog.findById(req.params.id)
    .then((response) => {
      const options = {
        from: "blogchain24x7@outlook.com",
        to: "blogchain24x7@outlook.com",
        subject: "Oooops! Someone deleted this blog :-(",
        html: `<div style="border: 8px solid white; border-radius: 30px; padding: 30px; background-color: #202124; color: white; box-shadow: 0 0 20px 0 black;">
        <h1 style="text-shadow: 3px 3px black; border: 3px solid white; width: fit-content; padding: 10px 20px; box-shadow: 0 0 20px 0 black; border-radius: 30px">${
          response.title
        }</h1>
        <p>By-${response.author}</p>
        <p>${new Date(response.createdAt)}</p>
        <hr style="margin-bottom: 30px; ">
        <p style="background-color: white; letter-spacing: 2px; color: black; padding: 20px;  border-radius: 30px; box-shadow: 0 0 20px 0 black;">${
          response.body
        }</p>
  <div style="background-color: crimson; padding: 20px; margin-top: 50px; border-radius: 20px">
    <p>Deleted By- ${req.body.user}</p>
    <strong><p style="text-decoration: underline">Reason for deletion:-</p></strong>
        <p>${req.body.reason}</p>
  </div>
      </div>`,
      };

      transporter.sendMail(options, (err, info) => {
        if (err) console.log(err);
        else console.log(info.response);
      });
    })
    .catch((err) => console.log(err));

  Blog.findByIdAndDelete(req.params.id)
    .then((response) =>
      res.send("Mail sent to admin and blog deleted successfully")
    )
    .catch((err) => console.log(err));
});

app.post("/send_to_user/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((response) => {
      const options = {
        from: "blogchain24x7@outlook.com",
        to: req.body.user_email,
        subject: "A copy of the blog you love!",
        text: "Here's your blog. Enjoy!!!",
        html: `<div style="border: 8px solid white; border-radius: 30px; padding: 30px; background-color: #202124; color: white; box-shadow: 0 0 20px 0 black;">
        <h1 style="text-shadow: 3px 3px black; border: 3px solid white; width: fit-content; padding: 10px 20px; box-shadow: 0 0 20px 0 black; border-radius: 30px">${
          response.title
        }</h1>
        <p>By-${response.author}</p>
        <p>${new Date(response.createdAt)}</p>
        <hr style="margin-bottom: 30px; ">
        <p style="background-color: white; letter-spacing: 2px; color: black; padding: 20px;  border-radius: 30px; box-shadow: 0 0 20px 0 black;">${
          response.body
        }</p>
      </div>`,
      };

      transporter.sendMail(options, (err, info) => {
        if (err) console.log(err);
        else console.log(info.response);
      });

      res.send("mail_sent");
    })
    .catch((err) => console.log(err));
});

app.put("/add_idea/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((response) => {
      Blog.findByIdAndUpdate(req.params.id, {
        body:
          //   response.body +
          //   `\n\n\nUpdated on - ${new Date()}\nBy - ${req.body.name}\n${
          //     req.body.idea
          //   }`

          response.body +
          `<br><br><br>Updated on - ${new Date()}<br>By - ${req.body.name}\n${
            req.body.idea
          }`,
      })
        .then((resp) => {
          Blog.findById(req.params.id)
            .then((respo) => {
              const options = {
                from: "blogchain24x7@outlook.com",
                to: "blogchain24x7@outlook.com",
                subject: "Someone updated a blog!!!",

                html: `<div style="border: 8px solid white; border-radius: 30px; padding: 30px; background-color: #202124; color: white; box-shadow: 0 0 20px 0 black;">
                      <h1 style="text-shadow: 3px 3px black; border: 3px solid white; width: fit-content; padding: 10px 20px; box-shadow: 0 0 20px 0 black; border-radius: 30px">${
                        respo.title
                      }</h1>
                      <p>By-${respo.author}</p>
                      <p>${new Date(respo.createdAt)}</p>
                      <hr style="margin-bottom: 30px; ">
                      <p style="letter-spacing: 2px; background-color: white; color: black; padding: 20px;  border-radius: 30px; box-shadow: 0 0 20px 0 black;">${
                        respo.body
                      }</p>
                      <p>Last updated by - ${req.body.email}</p>
                    </div>`,
              };

              transporter.sendMail(options, (err, info) => {
                if (err) console.log(err);
                else console.log(info.response);
              });

              res.send(respo.body);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
