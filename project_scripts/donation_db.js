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
  if (document.getElementById("male").checked) {
    return "male";
  }
  if (document.getElementById("female").checked) {
    return "female";
  }
  if (document.getElementById("others").checked) {
    return "others";
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
  const donator_dob = new Date(document.getElementById("Donator_dob").value);
  if(donator_dob=="Invalid Date"){
    document.getElementById("donator_dob_error").innerHTML="Invalid DOB.";
    document.getElementById("donator_dob_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("donator_dob_error").innerHTML="";
  }
  const donator_gender = get_value_gender();
  if(!donator_gender){
    document.getElementById("donator_gender_error").innerHTML="Select a gender.";
    document.getElementById("donator_gender_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("donator_gender_error").innerHTML="";
  }
  const donator_email = document.getElementById("Donator_email").value;
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
  else{
    document.getElementById("donator_phone_error").innerHTML="";
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
  const select = document.getElementById("Blood_group");
  const donator_blood = select.options[select.selectedIndex].value;
  console.log(donator_blood);
  if(!donator_blood){
    document.getElementById("donator_blood_error").innerHTML="Kindly select blood group.";
    document.getElementById("donator_blood_error").style.color = "red";;
    return false;
  }
  else{
    document.getElementById("donator_blood_error").innerHTML="";
  }
  return [
    donator_name,
    donator_dob,
    donator_gender,
    donator_email,
    donator_address,
    donator_blood,
    donator_phone
  ];
}

// async function donate_check(phone) {
//   var flag = 0;
//   const querySnapshot = await getDocs(collection(db, "Donate"));
//   querySnapshot.forEach((doc) => {
//     if (doc.id === phone) {
//       flag = 1;
//     }
//   });
//   if (flag === 1) {
//     console.log("previous record found");
//     return false;
//   } else {
//     console.log("No Username");
//     return true;
//   }
// }

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
  // let error_string = ["\n"];
  // if (flag == 0) {
  //   donation_data.forEach((element) => {
  //     if (element == "Invalid Date") {
  //       if(!error_string.includes("DOB is not filled properly.")){
  //         error_string.push("DOB is not filled properly.");
  //         error_string.push("\n");}
  //       flag=1;
  //       // return 0;

  //     } else if (!element) {
  //       if(!error_string.includes("All fields are not filled properly or left empty.")){
  //         error_string.push("All fields are not filled properly or left empty.");
  //         error_string.push("\n");
  //     }
  //         flag=1;
  //   // return 0;
  //     } else if (element.length == 0) {
  //       if(!error_string.includes("Some fields are empty.")){
  //       error_string.push("Some fields are empty.");
  //       error_string.push("\n");}
  //       flag=1;
  //   // return 0;
  //     }
  //   });
  // }
  // if(donation_data[6].length!=10){
  //   error_string.push("Invalid phone number.");
  //   error_string.push("\n");
  //   flag=1;
  //   // return 0;
  // }
  // // if (!(donator_email.includes("@gmail.com") || donator_email.includes("@gitam.in") ||donator_email.includes("@hotmail.com")||donator_email.includes("@gitam.edu")||donator_email.includes("@yahoo.com"))) {
  // if (!((donator_email.includes("@") && donator_email.includes(".in"))||(donator_email.includes("@") && donator_email.includes(".com"))||(donator_email.includes("@") && donator_email.includes(".edu")))){  
  //   error_string.push("Invalid E-mail.");
  //   error_string.push("\n");
  //   flag=1;
  //   // return 0;
  // }  
  // if (flag == 1) {
  //   let error_message = "";
  //   for (let i = 0; i < error_string.length-1; i++) {
  //     const element = error_string[i];      
  //     error_message+=element;
  //     if(element=="\n"){
  //       // error_message+=element;
  //       error_message+="•  ";
  //     }
  //   }
  //   // error_string.forEach((element) => {
      
  //   //   error_message+=element;
      
  //   // });
  //   alert("Can't proceed due to the following reasons:"+error_message);
  //   return 0;
  // }
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

        alert("Thank you for Donation. Redirecting to Home.");
        setTimeout(myURL, 100);
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
