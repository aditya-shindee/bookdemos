import axios from 'axios';

// Assuming you have the name, userid, and email in variables
let name = 'John1 Doe';
let userid = '789d89';
let email = 'john1.doe@example.com';
let phonenum = '879379827';
let address = '1234, Elm Street, Springfield"';
let pincode = '569129';
let orderid = []

// Prepare the data to be sent
let data = {
    full_name: name,
    user_id: userid,
    email_id: email,
    phone_number: phonenum,
    address: address,
    pincode: pincode,
    orders_id: orderid
};

// Define the URL of your Django server
let url = 'http://127.0.0.1:8000/api/db/createuser';

// Send the POST request
let startTime = performance.now(); // Start time before sending the request

axios.post(url, data)
    .then(response => {
        let endTime = performance.now(); // End time after receiving the response
        let timeTaken = endTime - startTime; // Time taken in milliseconds

        console.log('Status received from Django server:', response.data);
        console.log('Time taken to add data (in milliseconds):', timeTaken);
    })
    .catch(error => {
        let endTime = performance.now(); // End time after the error occurred
        let timeTaken = endTime - startTime; // Time taken in milliseconds

        console.error('Error occurred while sending data to Django server:', error.response.data);
        console.error('Time taken before error occurred (in milliseconds):', timeTaken);
    });

axios.post(url, data)
    .then(response => {
        console.log('Status received from Django server:', response.data);

    })
    .catch(error => {
        console.error('Error occurred while sending data to Django server:', error.response.data);
    });



import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config.js";

async function fetchSchools() {
  try {
    const schoolsCollectionRef = collection(db, "school");
    const querySnapshot = await getDocs(schoolsCollectionRef);
    const schoolList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Fetched schools:', schoolList);
  } catch (error) {
    console.error("Error fetching schools: ", error);
  }
}

let startTime = performance.now();
fetchSchools();
let endTime = performance.now(); // End time after receiving the response
let timeTaken = endTime - startTime;
console.log('Time taken to get data (in milliseconds):', timeTaken);