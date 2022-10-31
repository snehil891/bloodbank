import { Email } from "./smtp.js";
function sendemail_donation(email) {
    console.log("sending");
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "bldbank146@gmail.com",
      Password: "3AECAE4665C09B6618D42B3EB5965F8093DD",
      To: email,
      From: "bldbank146@gmail.com",
      Subject: "Thank you for donating blood",
/*needs change*/      Body: "<html> <p style=\"font-size:14px\">Hi!<br><p style=\"font-size:14px\">You are recieving this E-mail because you or someone else has requested Password recovery from your user account at GITAM BLOODBANK.</p><br><p style=\"font-size:14px\"> The password to login to your account is given below</p><br><p style=\"font-size:25px\">PASSWORD:<strong>"+password+"</p></strong><br>This is an auto-generated E-mail. Hence, do no reply.<br><h2> Best Regards,<br>GITAM BLOODBANK TEAM</h2></html>",
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
function sendemail_request(email) {
    console.log("sending");
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "bldbank146@gmail.com",
      Password: "3AECAE4665C09B6618D42B3EB5965F8093DD",
      To: email,
      From: "bldbank146@gmail.com",
      Subject: "Requested Blood",
/*needs change*/      Body: "<html> <p style=\"font-size:14px\">Hi!<br><p style=\"font-size:14px\">You are recieving this E-mail because you or someone else has requested username recovery from your user account at GITAM BLOODBANK.</p><br><p style=\"font-size:14px\"> The username to use at login is given below</p> <br> <p style=\"font-size:25px\">USERNAME:<strong>"+username+"</p></strong><br>This is an auto-generated E-mail. Hence, do no reply.<br><h2> Best Regards,<br>GITAM BLOODBANK TEAM</h2></html>",
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

export {sendemail_donation, sendemail_request};