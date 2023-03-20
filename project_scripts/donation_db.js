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
import { sendemail_donation } from "./send_mail.js";
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

function get_value_gender() {
  console.log(123);
  if (document.getElementById("dot-1").value) {
    console.log(234);
    return "Male";
  }
  if (document.getElementById("dot-2").value) {
    console.log(345);
    return "Female";
  }
  if (document.getElementById("dot-3").value) {
    console.log(456);
    return "Others";
  }
}
function get_donation() {
  console.log("getting");
  // const donator_name_field = document.getElementById("Donator_name");
  const donator_name = document.getElementById("Donator_name").value;
  if(donator_name.length==0){
    document.getElementById("donator_name_error").innerHTML="Kindly fill the name.";
    document.getElementById("donator_name_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("donator_name_error").innerHTML="";
  }
  if (donator_name.includes(1) || donator_name.includes(2) || donator_name.includes(3) || donator_name.includes(4) || donator_name.includes(5) || donator_name.includes(6) || donator_name.includes(7) || donator_name.includes(8) || donator_name.includes(9) || donator_name.includes(0) ){
    document.getElementById("donator_name_error").innerHTML="Enter Valid  name.";
    document.getElementById("donator_name_error").style.color = "red";;
    return false;
  }

  else{
    document.getElementById("donator_name_error").innerHTML="";
  }
  const donator_email = document.getElementById("Donator_email").value;

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!donator_email.match(validRegex))
   {
    document.getElementById("donator_email_error").innerHTML="Enter a valid E-mail.";
    document.getElementById("donator_email_error").style.color = "red";;
    return false;
   }
    if (!((donator_email.includes("@") && donator_email.includes(".in"))||(donator_email.includes("@") && donator_email.includes(".com"))||(donator_email.includes("@") && donator_email.includes(".edu")))){  
      document.getElementById("donator_email_error").innerHTML="Enter a valid E-mail.";
      document.getElementById("donator_email_error").style.color = "red";;
      return false;
    }
  
   
  else{
    document.getElementById("donator_email_error").innerHTML="";
  }
  const donator_phone = document.getElementById("Donator_phone").value;
  if(donator_phone.length!=10){
    document.getElementById("donator_phone_error").innerHTML="Enter a valid phone number.";
    document.getElementById("donator_phone_error").style.color = "red";;
    return false;
  }
  else if(donator_phone[0]==="1" || donator_phone[0]==="2" || donator_phone[0]==="3" || donator_phone[0]==="4" || donator_phone[0]==="5"|| donator_phone[0]==="0"){
    document.getElementById("donator_phone_error").innerHTML="Enter a valid phone number.";
    document.getElementById("donator_phone_error").style.color = "red";;
    return false;
  }
  else{
    console.log(donator_phone[1])
    document.getElementById("donator_phone_error").innerHTML="";
  }
  const donator_blood = document.getElementById("Blood_group").value;
  // const donator_blood = select.options[select.selectedIndex].value;
  console.log(donator_blood);
  if(donator_blood==="Enter Blood Group"){
    document.getElementById("donator_blood_error").innerHTML="Kindly select blood group.";
    document.getElementById("donator_blood_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("donator_blood_error").innerHTML="";
  }
  const donator_gender = document.getElementById("Gender").value;
  if(donator_gender ==="Enter Gender"){
    document.getElementById("donator_gender_error").innerHTML="Select a gender.";
    document.getElementById("donator_gender_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("donator_gender_error").innerHTML="";
  }
  const donator_dob = new Date(document.getElementById("Donator_dob").value);
  if(donator_dob=="Invalid Date"){
    document.getElementById("donator_dob_error").innerHTML="Invalid DOB.";
    document.getElementById("donator_dob_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("donator_dob_error").innerHTML="";
  }
 
  const donator_address = document.getElementById("Donator_address").value;
  if(donator_address.length==0){
    document.getElementById("donator_address_error").innerHTML="Kindly fill the address.";
    document.getElementById("donator_address_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("donator_address_error").innerHTML="";
  }

  
  
  
  return [
    donator_name,
    donator_dob,
    donator_gender,
    donator_email,
    donator_blood,
    donator_phone,
    donator_address
  ];
}

async function check_age(dob) {
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

async function add_to_donation() {
  console.log("called");
  const donation_data = get_donation();
  let flag = 0;
  console.log(donation_data[3]);
  console.log(donation_data);
  if(!donation_data){
    return 0;
  }
  const time = String(new Date());
  console.log(time);
  const dbRef = collection(db, "Donate");
  var age_donor = await check_age(donation_data[1]);
  if (age_donor > 18 && age_donor<65) {
    console.log("Checked");
    // if (donate_check(donation_data.donator_phone)) {
    //   await setDoc(doc(db, "Donate", donation_data.donator_phone), {
    //     Time_of_creation: {
    //       Time: time,
    //       details: {
    //         Name: donation_data.donator_name,
    //         dob: donation_data.donator_dob,
    //         Gender: donation_data.donator_gender,
    //         Mobile: donation_data.donator_phone,
    //         Address: donation_data.donator_address,
    //         Blood_group: donation_data.donator_blood,
    //       },
    //     },
    //   })
    //     .then((docRef) => {
    //       console.log("Document has been added successfully");
    //       alert("Thank you for Donation. Redirecting to Home.");
    //       setTimeout(myURL, 100);
    //       function myURL() {
    //         location.href = "Homepage.html";
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    console.log("adding");
    await setDoc(
      doc(
        collection(dbRef, time, donation_data[5] + "_donate"),
        time + "_" + String(donation_data[3])
      ),
      {
        Name: donation_data[0],
        dob: String(donation_data[1]),
        Gender: donation_data[2],
        Email: donation_data[3],
        Address: donation_data[4],
        age: age_donor,
        Blood_group: donation_data[5],
        Date_of_creation: time,
        Phone: donation_data[6]
      }
    )
      .then(async (docRef) => {
        console.log("Document has been added successfully");
        await sendemail_donation(donation_data[3]);
        window.location="#sec-2";
        document.getElementById("sec-2").style.display = "block";
        setTimeout(myURL, 7000);
        function myURL() {
          location.href = "Homepage.html";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    if(age_donor<18){alert("Sorry! You are not old enough to donate blood.");
  }
  else{
    alert("Sorry! You are not elligible to donate blood.");
  }
    }
}
export { add_to_donation };