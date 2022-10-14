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

async function login_form() {
  const login_id = document.getElementById("login-id").value;
  const login_password = document.getElementById("Login-Password").value;
  console.log(login_id, "\n", login_password);
  if (await login_check_admin(login_id, login_password)) return true;
}
async function login_check_admin(login_id, login_password) {
  const querySnapshot = await getDocs(collection(db, "AdminLogin"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    // doc.data() is never undefined for query doc snapshots
    if (doc.id === login_id) {
      const pass = doc.data().Password;
      if (pass === login_password) {
        console.log("admin login");
        setTimeout(myURL, 100);
        function myURL() {
          location.href = "Admin-page.html";
        }
        return true;
      } else {
        alert("login_ID and Password doesn't match.");
        return false;
      }
    } else {
      return login_check_user(login_id, login_password);
    }
  });
}
async function login_check_user(login_id, login_password) {
  console.log("in");
  var flag=0;
  const querySnapshot = await getDocs(collection(db, "Register"));
  console.log("query");
  querySnapshot.forEach((doc) => {
    console.log(doc.id);
    if (doc.id === login_id) {
      console.log("got doc");
      const pass = doc.data().Password;
      console.log(pass);
      if (pass === login_password) {
        console.log("user login");
        setTimeout(myURL, 100);
        function myURL() {
          location.href = "Homepage.html";
        }
        flag=1;
      } else {
        alert("login_ID and Password doesn't match.");
      }
    }
  });
  if (flag===1){
    return true;
  }
  else{
    alert("Login_ID not found. Kindly register.");
    return false;
  }
    
}
async function login_page() {
  await login_form();
  return "complete";
}

export { login_page };
