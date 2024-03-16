// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { useNavigate } from 'react-router-dom';

// const SignUpForm = () => {
//   const navigate = useNavigate();
//   const auth = getAuth();

//   const firestore = getFirestore();
//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
//       lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
//       email: Yup.string().email('Invalid email address').required('Required'),
//       password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
//         // Assuming the user has been created, now add their details to the 'users' collection
//         await addDoc(collection(firestore, "users"), {
//           full_name: values.fullName,
//           gender: values.gender,
//           email_id: userCredential.user.email, // Use the email from the created user
//         });
//         navigate('/'); // Navigate to login page after successful account creation
//       } catch (error) {
//         // Handle errors here
//         console.error(error.code, error.message);
//       }
//     },
//   });

/// -----------------------------------


// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { auth, db } from "../../firebase-config.js";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc } from "firebase/firestore";
// import { useNavigate } from 'react-router-dom';

// const SignUpForm = () => {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       fullName: '', // Use fullName to match the input field
//       gender: '',
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       fullName: Yup.string().required('Full name is required'),
//       gender: Yup.string().oneOf(['male', 'female'], 'Invalid gender').required('Gender is required'),
//       email: Yup.string().email('Invalid email address').required('Email is required'),
//       password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
//         // Assuming the user has been created, now add their details to the 'users' collection
//         await addDoc(collection(db, "users"), {
//           full_name: values.fullName,
//           gender: values.gender,
//           email_id: userCredential.user.email, // Use the email from the created user
//         });
//         navigate('/'); // Navigate to login page after successful account creation
//       } catch (error) {
//         // Handle errors here
//         console.error(error.code, error.message);
//       }
//     },
//   });

//   return (
//     <div className="signup-container">
//       <form onSubmit={formik.handleSubmit} className="signup-form">
//         <h2>Create Account</h2>
//         <div className="form-group">
//           <input
//             id="fullName"
//             type="text"
//             placeholder="Full name"
//             {...formik.getFieldProps('fullName')}
//             className="input"
//           />
//           {formik.touched.fullName && formik.errors.fullName ? (
//             <div className="error">{formik.errors.fullName}</div>
//           ) : null}
//         </div>

//         <div className="form-group">
//           <select
//             id="gender"
//             {...formik.getFieldProps('gender')}
//             className="input"
//           >
//             <option value="" label="Gender" />
//             <option value="male" label="Male" />
//             <option value="female" label="Female" />
//           </select>
//           {formik.touched.gender && formik.errors.gender ? (
//             <div className="error">{formik.errors.gender}</div>
//           ) : null}
//         </div>

//         <div className="form-group">
//           <input
//             id="email"
//             type="email"
//             placeholder="Email"
//             {...formik.getFieldProps('email')}
//             className="input"
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <div className="error">{formik.errors.email}</div>
//           ) : null}
//         </div>

//         <div className="form-group">
//           <input
//             id="password"
//             type="password"
//             placeholder="Password"
//             {...formik.getFieldProps('password')}
//             className="input"
//           />
//           {formik.touched.password && formik.errors.password ? (
//             <div className="error">{formik.errors.password}</div>
//           ) : null}
//         </div>

//         <button type="submit" className="button signup-button">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;


// ------ newer ----------

import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth } from "../../firebase-config.js";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import './SignUpForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();

  const passwordInputRef = useRef(null);
  const validationBoxRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    }),
    onSubmit: async (values) => {
      try {
        
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        await updateProfile(auth.currentUser, { displayName: values.fullName }).catch(
          (err) => console.log(err)
        );

        await sendEmailVerification(user)
          .then((userCredential) => {
            console.log(userCredential)
            toast.info('Verification email sent to your mail id. please verify', {duration: 3000});
            // You can add a success message or handle it as needed
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
            // You can handle the error here
          });

        // Assuming the user has been created, now add their details to the 'users' collection
        // await addDoc(collection(db, "users"), {
        //   full_name: values.fullName,
        //   gender: values.gender,
        //   email_id: userCredential.user.email, // Use the email from the created user
        // });

        navigate('/'); // Navigate to login page after successful account creation
      } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          // toast.warning("User already exists.");
          toast.info('User already exists.', {duration: 3000})
        } else {
          toast.error('Failed to create an account. please try again later', {duration: 3000})
          console.log(errorMessage);
        }
        // Handle errors here
        // console.error(error.code, error.message);
      }
    },
  });

  function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleIcon.innerHTML = `
      <g>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        <path class="slash" stroke="#a8afb9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 3L3 21"/>
      </g>`;
    const slash = toggleIcon.querySelector('.slash');
    if (type === 'text') {
      slash.style.opacity = 1; // Show slash
    } else {
      slash.style.opacity = 0; // Hide slash
    }
  }
  useEffect(() => {
    const passwordInput = passwordInputRef.current;
    const validationBox = validationBoxRef.current;

    function toggleValidationBox() {
      const shouldHide = passwordInput.value.length >= 8 || passwordInput.value.length === 0;
      validationBox.classList.toggle('hidden', shouldHide);
    }

    passwordInput.addEventListener('input', toggleValidationBox);
    passwordInput.addEventListener('focus', toggleValidationBox);
    passwordInput.addEventListener('blur', toggleValidationBox);

    // Clean up event listeners on unmount
    return () => {
      passwordInput.removeEventListener('input', toggleValidationBox);
      passwordInput.removeEventListener('focus', toggleValidationBox);
      passwordInput.removeEventListener('blur', toggleValidationBox);
    };
  }, []);


  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <Toaster position="top-center" richColors />
        <h2 className="text-2xl text-slate-700 flex items-center justify-center font-bold mb-8">Create your account</h2>
        <form onSubmit={formik.handleSubmit} id="RegisterForm" className="signup-form">
          <div class="form-input mb-4">
            <input type="text" id="name" placeholder=" " {...formik.getFieldProps('fullName')} autocomplete="off" required class="w-full"/>
            <label for="name">Full Name</label>
          </div>
          <div class="form-input mb-4">
            <input type="email" id="email" placeholder=" " {...formik.getFieldProps('email')} autocomplete="off" required class="w-full"/>
            <label for="email">Email address</label>
          </div>
          <div className="form-input mb-4">
            <input
              id="password"
              type="password"
              ref={passwordInputRef}
              placeholder=" "
              {...formik.getFieldProps("password")}
              autocomplete="off" 
              required class="border-2 w-full p-3 rounded-md focus:outline-none focus:ring-blue-400"
            />
            <label htmlFor="password" class="block text-gray-700 mb-2">Password</label>
            <button
              type="button"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-400"
              onClick={togglePassword}
            >
              <svg id="toggleIcon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <path className="slash" stroke="#a8afb9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3L3 21" style={{ opacity: 0 }} />
              </svg>
            </button>
          </div>
          <div id="password-validation" ref={validationBoxRef} class="border p-4 max-w-sm w-full mx-auto shadow-sm bg-white hidden">
            <p class="text-sm text-slate-700">Your password must contain:</p>
            <ul class="list-disc pl-4 mt-2">
              <li class="text-sm text-slate-700">At least 8 characters</li>
            </ul>
          </div>
          <button type="submit" class="btn">Sign Up</button>
          <p class="text-center text-slate-700 mt-4">
            Already have an account?
            <a href="#" class="text-[#10b981] login-link" onClick={() => navigate('/')}> SignIn</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;


// const { Storage } = require('@google-cloud/storage');
// const { createCanvas } = require('canvas');
// const fs = require('fs');
// const path = require('path');

// // Initialize Google Cloud Storage
// const storage = new Storage();
// const bucketName = 'your-bucket-name';
// const bucket = storage.bucket(bucketName);

// // Function to generate an image with the first two letters of a name
// async function generateImageAndUpload(name) {
//   const canvas = createCanvas(200, 200);
//   const ctx = canvas.getContext('2d');

//   // Set background color
//   ctx.fillStyle = '#FFF';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   // Set text properties
//   ctx.fillStyle = '#000';
//   ctx.font = 'bold 30px Arial';
//   ctx.textAlign = 'center';

//   // Draw the text
//   ctx.fillText(name.substring(0, 2).toUpperCase(), 100, 100);

//   // Save the image to a temporary file
//   const tempFilePath = path.join(__dirname, `${name}.png`);
//   const out = fs.createWriteStream(tempFilePath);
//   const stream = canvas.createPNGStream();
//   stream.pipe(out);

//   // Wait for the file to be written
//   await new Promise((resolve, reject) => {
//     out.on('finish', resolve);
//     out.on('error', reject);
//   });

//   // Upload the file to Google Cloud Storage
//   const [file] = await bucket.upload(tempFilePath, {
//     destination: `${name}.png`,
//   });

//   // Make the file public (optional)
//   await file.makePublic();

//   // Clean up the temporary file
//   fs.unlinkSync(tempFilePath);

//   // Return the public URL
//   return `https://storage.googleapis.com/${bucketName}/${name}.png`;
// }

// // Example usage
// generateImageAndUpload('John Doe')
//   .then(url => console.log(`Image URL: ${url}`))
//   .catch(console.error);
