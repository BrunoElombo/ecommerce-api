import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
    host: "server198.web-hosting.com",
    port: 587,
    secure: false,
    auth: {
      user: "no-reply@ideaboxtech.com",
      pass: "no-reply@ideaboxtech",
    },
});
