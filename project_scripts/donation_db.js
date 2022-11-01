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
  const donator_name = document.getElementById("Donator_name").value;
  const donator_dob = new Date(document.getElementById("Donator_dob").value);
  const donator_gender = get_value_gender();
  const donator_email = document.getElementById("Donator_email").value;
  const donator_address = document.getElementById("Donator_address").value;
  const select = document.getElementById("Blood_group");
  const donator_blood = select.options[select.selectedIndex].value;
  console.log(donator_blood);
  return [
    donator_name,
    donator_dob,
    donator_gender,
    donator_email,
    donator_address,
    donator_blood,
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
  
  if (flag == 0) {
    donation_data.forEach((element) => {
      if (element == "Invalid Date") {
        flag = 1;
      }
      else if(!element){
        flag =1;
      }
      else if (element.length == 0) {
        flag=1;
      }
    });
  }
  if (!donation_data[3].includes("@gmail.com") || !donation_data[3].includes("@gitam.in") ||!donation_data[3].includes("@hotmail.com")||!donation_data[3].includes("@gitam.edu")||!donation_data[3].includes("@yahoo.com")) {
    flag = 1;
  }  
  if (flag == 1) {
    alert("Please fill all the fields properly.");
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
    alert("Sorry! You are not old enough to donate blood.");
  }
}
export { add_to_donation };
