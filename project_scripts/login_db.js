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
  apiKey: "AIzaSyC-ib62fjrfWgq7jis-8EngXAfRnEaV2t4",
  authDomain: "blood-bank-3f5d5.firebaseapp.com",
  projectId: "blood-bank-3f5d5",
  storageBucket: "blood-bank-3f5d5.appspot.com",
  messagingSenderId: "934584022747",
  appId: "1:934584022747:web:da72b3e3d80a408030befe"
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
          location.href = "admin/Admin-page.html";
        }
        return true;
      } else {
        alert("login_ID and Password doesn't match.");
        return false;
      }
    }
     else {
      alert("Login_ID invalid.")
    }
  });
}
// async function login_check_user(login_id, login_password) {
//   console.log("in");
//   var flag=0;
//   const querySnapshot = await getDocs(collection(db, "Register"));
//   console.log("query");
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id);
//     if (doc.id === login_id) {
//       console.log("got doc");
//       const pass = doc.data().Password;
//       console.log(pass);
//       if (pass === login_password) {
//         console.log("user login");
//         setTimeout(myURL, 100);
//         function myURL() {
//           location.href = "Homepage.html";
//         }
//         flag=1;
//       } else {
//         alert("login_ID and Password doesn't match.");
//       }
//     }
//   });
//   if (flag===1){
//     return true;
//   }
//   else{
//     // alert("Login_ID not found. Kindly register.");
//     return false;
//   }
    
// }
async function login_page() {
  await login_form();
  return "complete";
}

export { login_page };
