const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service:"gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "chathura15592priyashan@gmail.com",
    pass: "yimh gfpa sgsb twby",
  },
});

module.exports = transporter;