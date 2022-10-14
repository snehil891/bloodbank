import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
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

function get_value_gender() {
  if (document.getElementById("Male").checked) {
    return "male";
  }
  if (document.getElementById("Female").checked) {
    return "female";
  }
  if (document.getElementById("Others").checked) {
    return "others";
  }
}

function get_request() {
  console.log("getting");
  const patient_name = document.getElementById("Patient_name").value;
  const Hospital_name = document.getElementById("Hospital_name").value;
  const patient_dob = new Date(document.getElementById("patient_dob").value);
  const patient_gender = get_value_gender();
  const patient_phone = document.getElementById("patient_phone").value;
  const purpose_request = document.getElementById("purpose_request").value;
  const select = document.getElementById("Blood_group_request");
  const patient_blood = select.options[select.selectedIndex].value;
  return {
    patient_name,
    Hospital_name,
    patient_dob,
    patient_gender,
    patient_phone,
    purpose_request,
    patient_blood,
  };
}

function get_age(dob) {
  console.log("checking");
  var dob_year = dob.getFullYear();
  function getAge(birthYear) {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var age = currentYear - birthYear;
    return age;
  }
  var calculatedAge = getAge(dob_year);
  return calculatedAge;
}

async function add_to_request() {
  console.log("called");
  const request_data = get_request();
  console.log(request_data);
  const time = String(new Date());
  console.log(time);
  const dbRef = collection(db, "Request");
  console.log("adding");
  await setDoc(doc(collection(dbRef, time, (request_data.patient_blood+"_request")),(time+"_"+String(request_data.patient_phone))), {
    Name: request_data.patient_name,
    Hospital_Name: request_data.Hospital_name,
    age: String(get_age(request_data.patient_dob)),
    dob: String(request_data.patient_dob),
    Gender: request_data.patient_gender,
    Mobile: request_data.patient_phone,
    Purpose: request_data.purpose_request,
    Blood_group: request_data.patient_blood,
    Date_of_creation: time,
 
  })
    .then((docRef) => {
      console.log("Document has been added successfully");
      alert("We have registered your request. Redirecting to Home.");
      setTimeout(myURL, 100);
      function myURL() {
        location.href = "Homepage.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
export { add_to_request };
