const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "blogchain24x7@outlook.com",
    pass: "Bike@Racing_10",
  },
});

module.exports = transporter;
