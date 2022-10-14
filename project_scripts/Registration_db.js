import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
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

function register_form() {
  const name_register = document.getElementById("Name").value;
  const username_register = document.getElementById("UserName").value;
  const Password_register = document.getElementById("txtPassword").value;

  const email_register = document.getElementById("email").value;
  const phone_register = document.getElementById("phone").value;
  return {
    name_register,
    username_register,
    Password_register,
    email_register,
    phone_register,
  };
}

async function register_check(username) {
  var flag = 0;
  const querySnapshot = await getDocs(collection(db, "Register"));
  querySnapshot.forEach((doc) => {
    if (doc.id === username) {
      flag = 1;
    }
  });
  if (flag === 1) {
    alert("Username exists");
    return false;
  } else {
    console.log("No Username");
    return true;
  }
}
async function add_to_db() {
  // console.log("adding");
  const data = register_form();
  // console.log(data);
  const dbRef = collection(db, "Register");
  if ((await register_check(data.username_register)) === true) {
    // console.log("doc adding");
    await setDoc(doc(db, "Register", data.username_register), {
      Password: data.Password_register,
      login_ID: data.username_register,
      details: {
        Name: data.name_register,
        Email_ID: data.email_register,
        Phone: data.phone_register,
      },
    })
      .then((docRef) => {
        console.log("Document has been added successfully");
        setTimeout(myURL, 100);
        function myURL() {
          location.href = "Homepage.html";
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return "success";
  }
}

function Validate() {
  var Password = document.getElementById("txtPassword").value;
  console.log(Password);
  var ConfirmPassword = document.getElementById("txtConfirmPassword").value;
  var decimal =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (Password.match(decimal)) {
    if (Password === ConfirmPassword) {
      return true;
    }
    alert("Passwords do not match.");
    return false;
  }
  alert("Password doesn't contain enough characters.");
  return false;
}

export { add_to_db, Validate };
