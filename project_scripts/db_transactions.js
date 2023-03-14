// import { add_to_db, Validate } from "./Registration_db.js";
import { login_page } from "./login_db.js";
import {
  view,
  // get_email_username,
  // get_email_password,
  change_donate_html,change_request_html
} from "./dashboard.js";
import { add_to_donation } from "./donation_db.js";
import { add_to_request } from "./request_db.js";

// const register_button = document.getElementById("create_acc");
// if (register_button) {
//   register_button.addEventListener("click", function () {
//     if (Validate()) {
//       console.log(add_to_db());
//     }
//     event.preventDefault();
//   });
// }
const click_register_button = document.getElementById("check_register");
if (click_register_button) {
  click_register_button.addEventListener("click", function () {
    console.log(view("Register"));
    event.preventDefault();
  });
}
const click_donate_button = document.getElementById("check_donate");
if (click_donate_button) {
  click_donate_button.addEventListener("click", function () {
    const select_b = document.getElementById("Blood_group_request");
    // console.log(select_b);
    const donator_blood = select_b.options[select_b.selectedIndex].value;
    console.log(donator_blood);
    console.log(change_donate_html(donator_blood));
    event.preventDefault();
  });
}
const click_request_button = document.getElementById("check_request");
if (click_request_button) {
  click_request_button.addEventListener("click", function () {
    const select_b = document.getElementById("Blood_group_request_page");
    // console.log(select_b);
    const donator_blood = select_b.options[select_b.selectedIndex].value;

    console.log(donator_blood);
    console.log(change_request_html(donator_blood));
    event.preventDefault();
  });
}

// const click_issued_button = document.getElementById("check_issued");
// if (click_issued_button) {
//   click_issued_button.addEventListener("click", function () {
//     console.log(view("Issued"));
//     event.preventDefault();
//   });
// }
const login_button = document.getElementById("login-button");
if (login_button) {
  login_button.addEventListener("click", function () {
    console.log(login_page());
    event.preventDefault();
  });
}
// const email_button = document.getElementById("email");
// if (email_button) {
//   email_button.addEventListener("click", function () {
//     console.log(get_email_password());
//     event.preventDefault();
//   });
// }
// const user_button = document.getElementById("email_username");
// if (user_button) {
//   user_button.addEventListener("click", function () {
//     console.log(get_email_username());
//     event.preventDefault();
//   });
// }
const donate_button = document.getElementById("submit_donate");
if (donate_button) {
  donate_button.addEventListener("click", function () {
    console.log("clicked");
    console.log(add_to_donation());
    event.preventDefault();
  });
}
const request_button = document.getElementById("submit_request");
if (request_button) {
  request_button.addEventListener("click", function () {
    console.log("clicked");
    console.log(add_to_request());
    event.preventDefault();
  });
}
