import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  collectionGroup,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  collection,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { sendemail_request,sendemail_request_donors } from "./send_mail.js";
// const firebaseConfig = {
//   apiKey: "AIzaSyAJ1mrcBYnl_M2bG7vfpSwlcm5NnpzsohQ",
//   authDomain: "blood-bank-25293.firebaseapp.com",
//   databaseURL: "https://blood-bank-25293-default-rtdb.firebaseio.com",
//   projectId: "blood-bank-25293",
//   storageBucket: "blood-bank-25293.appspot.com",
//   messagingSenderId: "422166227123",
//   appId: "1:422166227123:web:801967eb7004a2341a28c6",
//   measurementId: "G-TKT0F7M4WL",
// };
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


function get_request() {
  console.log("getting");
  const patient_name = document.getElementById("Patient_name").value;
  if(patient_name.length==0){
    document.getElementById("patient_name_error").innerHTML="Kindly fill the name.";
    document.getElementById("patient_name_error").style.color = "red";
    return false;
  }
  else{
    document.getElementById("patient_name_error").innerHTML="";
  }
  const patient_age = document.getElementById("patient_dob").value;
  if(patient_age.length==0){
    document.getElementById("patient_dob_error").innerHTML="Kindly enter age.";
    document.getElementById("patient_dob_error").style.color = "red";;
    return false;
  }
  else if(patient_age==0 || patient_age>100 || patient_age<0){
    document.getElementById("patient_dob_error").innerHTML="Kindly enter valid age.";
    document.getElementById("patient_dob_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("patient_dob_error").innerHTML="";
  }
  const patient_email = document.getElementById("patient_email").value;
  if (!((patient_email.includes("@") && patient_email.includes(".in"))||(patient_email.includes("@") && patient_email.includes(".com"))||(patient_email.includes("@") && patient_email.includes(".edu")))){  
    document.getElementById("patient_email_error").innerHTML="Enter a valid E-mail.";
    document.getElementById("patient_email_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("patient_email_error").innerHTML="";
  }
  const patient_phone = document.getElementById("patient_phone").value;
  if(patient_phone.length!=10){
    document.getElementById("patient_phone_error").innerHTML="Enter a valid phone number.";
    document.getElementById("patient_phone_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("patient_phone_error").innerHTML="";
  }

  const patient_blood = document.getElementById("PBlood_group_request").value;
  if(patient_blood==="Enter Blood Group"){
    document.getElementById("patient_blood_error").innerHTML="Kindly select blood group.";
    document.getElementById("patient_blood_error").style.color = "red";
    return false;
  }
  else{

    document.getElementById("patient_blood_error").innerHTML="";
  }
  const patient_required_date = new Date(
    document.getElementById("required_date").value
  );
  const date2 = new Date();
  const diffTime=(patient_required_date-date2);
  console.log(diffTime);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays); 
  if(patient_required_date=="Invalid Date"){
    document.getElementById("patient_required_error").innerHTML="Kindly fill the required date.";
    document.getElementById("patient_required_error").style.color = "red";;
    return false;
  }
  else if(diffDays<0){
    document.getElementById("patient_required_error").innerHTML="Can't request in past";
    document.getElementById("patient_required_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("patient_required_error").innerHTML="";
  }
  const no_of_units = document.getElementById("no_of_units").value;
  if(no_of_units<=0){
    document.getElementById("patient_units_error").innerHTML="Enter valid number of units of blood.";
    document.getElementById("patient_units_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("patient_units_error").innerHTML="";
  }
  if(no_of_units.length==0){
    document.getElementById("patient_units_error").innerHTML="Enter required number of units of blood.";
    document.getElementById("patient_units_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("patient_units_error").innerHTML="";
  }
  if(no_of_units>5){
    document.getElementById("patient_units_error").innerHTML="Can't request for more than 5 units.";
    document.getElementById("patient_units_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("patient_units_error").innerHTML="";
  }
  const patient_gender = document.getElementById("PGender").value;
  if(patient_gender ==="Enter Gender"){
    document.getElementById("patient_gender_error").innerHTML="Kindly select gender.";
    document.getElementById("patient_gender_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("patient_gender_error").innerHTML="";
  }
  
  const purpose_request = document.getElementById("purpose_request").value;
  if(purpose_request.length==0){
    document.getElementById("patient_purpose_error").innerHTML="Kindly provide purpose.";
    document.getElementById("patient_purpose_error").style.color = "red";
    return false;
  }
  else{
    document.getElementById("patient_purpose_error").innerHTML="";
  }

  const Hospital_name = document.getElementById("Hospital_name").value;
  if(Hospital_name.length==0){
    document.getElementById("patient_hospital_error").innerHTML="Kindly fill the hospital name.";
    document.getElementById("patient_hospital_error").style.color = "red";
    return false;
  }
  else{
    document.getElementById("patient_hospital_error").innerHTML="";
  }
  
  
 
  return [
    no_of_units, //1
    patient_name, //2
    Hospital_name,//3
    patient_age,//4
    patient_gender,//5
    patient_email,//6
    purpose_request,//7
    patient_blood,//8
    patient_required_date,//9
    patient_phone//10
  ];
}

// function get_age(dob) {
//   console.log("checking");
//   var dob_year = dob.getFullYear();
//   function getAge(birthYear) {
//     var currentDate = new Date();
//     var currentYear = currentDate.getFullYear();
//     var age = currentYear - birthYear;
//     return age;
//   }
//   var calculatedAge = getAge(dob_year);
//   return calculatedAge;
// }

async function add_to_request() {
  console.log("called");
  const request_data = get_request();
  console.log(request_data);
  let flag = 0;
  if(!request_data){
    return false;
  }
  // if (flag == 0) {
  //   request_data.forEach((element) => {
  //     if (element == "Invalid Date") {
  //       alert("Please fill Required Date properly.");
  //       return 0;

  //     } else if (!element) {
  //       alert("Please fill all the fields properly.");
  //   return 0;
  //     } else if (element.length == 0) {
  //       alert("Please fill all the fields properly.");
  //   return 0;
  //     }
  //   });
  // }
  // // if (!request_data[5].includes("@gmail.com") || !request_data[5].includes("@gitam.in") ||!request_data[5].includes("@hotmail.com")||!request_data[5].includes("@gitam.edu")||!request_data[5].includes("@yahoo.com")) {
  //   if (!((request_data[5].includes("@") && request_data[5].includes(".in"))||(request_data[5].includes("@") && request_data[5].includes(".com"))||(request_data[5].includes("@") && request_data[5].includes(".edu")))){  
    
  // alert("Please provide a valid E-mail.");
  //   return 0;
  // }
  // if(request_data[0]<5)
  // {
  //   alert("Please request no more than 5 units.");
  //   return 0;
  // }
  // if(request_data[9].length!=10){
  //   alert("Please enter valid phone number.");
  //   return 0;
  // }
  // if (flag == 1) {
  //   alert("Please fill all the fields properly.");
  //   return 0;
  // }
  const time = String(new Date());
  console.log(time);
  const dbRef = collection(db, "Request");
  console.log("adding");
  await setDoc(
    doc(
      collection(dbRef, time, request_data[7]+ "_request"),
      time + "_" + String(request_data[5])
    ),
    {
      Name: request_data[1],
      Hospital_Name: request_data[2],
      age: request_data[3],
      required_date: String(request_data[8]),
      Gender: request_data[4],
      Email: request_data[5],
      Purpose: request_data[6],
      Blood_group: request_data[7],
      Date_of_creation: time,
      No_of_Units: request_data[0],
      Phone:request_data[9]
    }
  )
    .then(async (docRef) => {
      console.log("Document has been added successfully");
      await sendemail_request(request_data[5]);
      await searchdonor(request_data[7]);
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
async function searchdonor(blood_group) {
  var docs = new Array();
  const donation = query(collectionGroup(db, blood_group + "_donate"));
  console.log("searching");
  // const querySnapshot = await getDocs(collection(db, view_type));
  const querySnapshot = await getDocs(donation);
  console.log("got hit");
  console.log(querySnapshot);
  querySnapshot.forEach(async (doc) => {
    const dateOne = new Date();
    const dateTwo = new Date(doc.data().Date_of_creation);
    const time = Math.abs(dateTwo - dateOne);
    const days = Math.ceil(time / (1000 * 60 * 60 * 24));
    if (days > 90) {
    await sendemail_request_donors(doc.data().Email);
    }
    // console.log(doc.id, " => ", doc.data());
  });
  console.log(docs);
  return docs;
}
export { add_to_request };
