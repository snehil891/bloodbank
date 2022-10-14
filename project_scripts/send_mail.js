import { Email } from "./smtp.js";
function sendEmail_password(email,password) {
    console.log("sending");
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "bldbank146@gmail.com",
      Password: "3AECAE4665C09B6618D42B3EB5965F8093DD",
      To: email,
      From: "bldbank146@gmail.com",
      Subject: "Forgot Password",
      Body: "Seems like you forgot your password, well HERE YOU GO!       "+"\n"+"     PASSWORD:"+password,
    //   Attachments: [
    //     {
    //       name: "File_Name_with_Extension",
    //       path: "Full Path of the file"
    //     }]
    })
      .then(function (message) {
        alert("Mail has been sent successfully")
      });
  }
function sendEmail_username(email,username) {
    console.log("sending");
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "bldbank146@gmail.com",
      Password: "3AECAE4665C09B6618D42B3EB5965F8093DD",
      To: email,
      From: "bldbank146@gmail.com",
      Subject: "Forgot Password",
      Body: "Seems like you forgot your username, well HERE YOU GO! %0D%0A USERNAME:"+username,
    //   Attachments: [
    //     {
    //       name: "File_Name_with_Extension",
    //       path: "Full Path of the file"
    //     }]
    })
      .then(function (message) {
        alert("Mail has been sent successfully")
      });
  }

export {sendEmail_password, sendEmail_username};