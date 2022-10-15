import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  collectionGroup,
  collection,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { sendEmail_password, sendEmail_username } from "./send_mail.js";
const firebaseConfig = {
  apiKey: "AIzaSyAJ1mrcBYnl_M2bG7vfpSwlcm5NnpzsohQ",
  authDomain: "blood-bank-25293.firebaseapp.com",
  databaseURL: "https://blood-bank-25293-default-rtdb.firebaseio.com",
  projectId: "blood-bank-25293",
  storageBucket: "blood-bank-25293.appspot.com",
  messagingSenderId: "422166227123",
  appId: "1:422166227123:web:801967eb7004a2341a28c6",
  measurementId: "G-TKT0F7M4WL",
};
initializeApp(firebaseConfig);
const db = getFirestore();

async function change_donate_html(blood_group) {
  var rows = await view_blood_donate(blood_group);
  console.log(rows);
  var html =
    "<table border='1|1' style=\"width:100%\"><tr><th>Name</th><th>Blood Group</th><th>Age</th><th>Gender</th><th>Phone Number</th><th>Date of Form Filling</th></tr>";
  for (var i = 0; i < rows.length; i++) {
    const dateOne = new Date();
    const dateTwo = new Date(rows[i].Date_of_creation);
    const time = Math.abs(dateTwo - dateOne);
    const days = Math.ceil(time / (1000 * 60 * 60 * 24));
    if (days > 90) {
      html += "<tr bgcolor=\"green\">";
      html += "<td>" + rows[i].Name + "</td>";
      html += "<td>" + rows[i].Blood_group + "</td>";
      html += "<td>" + rows[i].age + "</td>";
      html += "<td>" + rows[i].Gender + "</td>";
      html += "<td>" + rows[i].Mobile + "</td>";
      html += "<td>" + rows[i].Date_of_creation + "</td>";

      html += "</tr>";
    }
    if (days < 90) {
      html += "<tr bgcolor=\"red\">";
      html += "<td>" + rows[i].Name + "</td>";
      html += "<td>" + rows[i].Blood_group + "</td>";
      html += "<td>" + rows[i].age + "</td>";
      html += "<td>" + rows[i].Gender + "</td>";
      html += "<td>" + rows[i].Mobile + "</td>";
      html += "<td>" + rows[i].Date_of_creation + "</td>";

      html += "</tr>";
    }
  }
  html += "</table>";
  document.getElementById("table_div").innerHTML = html;
}

async function view_blood_donate(blood_group) {
  var docs = new Array();
  const donation = query(collectionGroup(db, blood_group + "_donate"));
  console.log("viewing");
  // const querySnapshot = await getDocs(collection(db, view_type));
  const querySnapshot = await getDocs(donation);
  console.log("got");
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    docs.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });
  console.log(docs);
  return docs;
}
async function change_request_html(blood_group) {
  var rows = await view_blood_request(blood_group);
  console.log(rows);
  var html =
    "<table border='1|1' style=\"width:100%\"><tr><th>Name</th><th>Blood Group</th><th>Age</th><th>Gender</th><th>Phone Number</th><th>Purpose</th><th>Units required</th><th>Required Date</th><th>Date of Form Filling</th></tr>";
  for (var i = 0; i < rows.length; i++) {
    html += "<tr>";
    html += "<td>" + rows[i].Name + "</td>";
    html += "<td>" + rows[i].Blood_group + "</td>";
    html += "<td>" + rows[i].age + "</td>";
    html += "<td>" + rows[i].Gender + "</td>";
    html += "<td>" + rows[i].Mobile + "</td>";
    html += "<td>" + rows[i].Purpose + "</td>";
    html += "<td>" + rows[i].No_of_Units + "</td>";
    html += "<td>" + rows[i].required_date + "</td>";
    html += "<td>" + rows[i].Date_of_creation + "</td>";
    // html += "<td>" + "<button onclick=\"issue_mark(this)\">Issued</button>" + "</td>";

    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("table_div_request").innerHTML = html;
}

async function view_blood_request(blood_group) {
  var docs = new Array();
  const donation = query(collectionGroup(db, blood_group + "_request"));
  console.log("viewing");
  // const querySnapshot = await getDocs(collection(db, view_type));
  const querySnapshot = await getDocs(donation);
  console.log("got");
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    docs.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });
  console.log(docs);
  return docs;
}

async function view(view_type) {
  const querySnapshot = await getDocs(collection(db, view_type));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

async function get_email_password() {
  const username = document.getElementById("username_textbox").value;
  var flag = 0;
  var emailid, password;
  console.log(username);
  const querySnapshot = await getDocs(collection(db, "Register"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    if (doc.id === username) {
      flag = 1;
      console.log(doc.id);
      emailid = doc.data().details.Email_ID;
      console.log(emailid);
      password = doc.data().Password;
    }
  });
  if (flag === 1) {
    sendEmail_password(emailid, password);
  } else {
    alert("Email ID not linked with the username you provided.");
    return false;
  }
}
async function get_email_username() {
  const email = document.getElementById("email_textbox").value;
  var flag = 0;
  var emailid, username;
  console.log(username);
  const querySnapshot = await getDocs(collection(db, "Register"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    var user_email = doc.data().details.Email_ID;
    if (user_email === email) {
      flag = 1;
      console.log(doc.id);
      emailid = doc.data().details.Email_ID;
      console.log(emailid);
      username = doc.data().login_ID;
    }
  });
  if (flag === 1) {
    sendEmail_username(emailid, username);
  } else {
    alert("No username found with the Email-ID you provided.");
    return false;
  }
}

export {
  change_donate_html,
  change_request_html,
  view,
  get_email_password,
  get_email_username,
};
