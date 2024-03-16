// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from 'react-router-dom';
// import { auth } from "../../firebase-config.js";

// const LoginForm = () => {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email address').required('Required'),
//       password: Yup.string().required('Required'),
//     }),
//     onSubmit: (values, { setSubmitting }) => {
//       signInWithEmailAndPassword(auth, values.email, values.password)
//         .then((userCredential) => {
//           navigate('/searchschool'); // Adjust the path as per your route configuration
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           // Here, instead of an alert, you could update the state to display the error message within the form itself
//           console.error(errorCode, errorMessage); // Log the error
//           setSubmitting(false); // Stop the submitting process
//         });
//     },
//   });


//   return (
//     <div className="login-container">
//       <form onSubmit={formik.handleSubmit} className="login-form">
//         <h2>Login</h2>
//         <div className="form-group">
//           <label htmlFor="email" className="label">Username</label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Type your username"
//             {...formik.getFieldProps('email')}
//             className="input"
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <div className="error">{formik.errors.email}</div>
//           ) : null}
//         </div>

//         <div className="form-group">
//           <label htmlFor="password" className="label">Password</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Type your password"
//             {...formik.getFieldProps('password')}
//             className="input"
//           />
//           {formik.touched.password && formik.errors.password ? (
//             <div className="error">{formik.errors.password}</div>
//           ) : null}
//         </div>

//         <button type="submit" className="button login-button">Login</button>
//         <button type="button" className="button signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;



// -----newer------


import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase-config.js";
import { Toaster, toast } from "sonner";
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();

  const resetPassowrd = () => {
    navigate("/resetpassword");
  };

  const createUserUrl = 'http://127.0.0.1:8000/api/db/createuser';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.uid, user.email, user.displayName, user.metadata);

          if(user.emailVerified){
            console.log('email is verified');
            const data={
                full_name: user.displayName ,
                user_id: user.uid,
                email_id: user.email,
                phone_number: "",
                address: "",
                pincode: "",
                orders_id: []
              };

            axios.post(createUserUrl, data)
              .then(response => {
                  console.log('status from django', response.status);
                  if(response.status===200){
                    console.log('user data added to db');
                  } else if (response.status===208) {
                    console.log('user data exists');
                  } else {
                    console.error("Error occurred while sending data to DB:", response.data.status_desc);
                  }
              })
              .catch(error => {
                  console.error('Error occurred while sending data to Django server:', error.response);
              });

            navigate('/searchschool'); // Adjust the path as per your route configuration
          } else {
            console.log('email not verified');
            toast.warning('please verfiy the email first, which is sent to your email', {duration: 2000});
          }
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/invalid-credential') {
            toast.error('Incorrect email/password. Please retry', {duration: 3000})
          } else {
            toast.error('Failed to Signin. please try again later', {duration: 3000})
            console.error(errorCode, errorMessage);
            setSubmitting(false);
          }
        });
    },
  });
  
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user; 
        console.log(user.uid); // user.uid user.displayName user.email user.photoURL user.providerId user.accessToken user.refreshToken user.metadata
        navigate('/searchschool'); // Adjust the path as per your route configuration
      }).catch((error) => {
        toast.error('Failed to Signin with Google. please try different method', {duration: 3000})
        console.error(error.code, error.message);
      });
  };


  function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleIcon.innerHTML = `
      <g>
        <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        <path class="slash" stroke="#a8afb9" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 3L3 21"/>
      </g>`;
    const slash = toggleIcon.querySelector('.slash');
    if (type === 'text') {
      slash.style.opacity = 1; // Show slash
    } else {
      slash.style.opacity = 0; // Hide slash
    }
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen w-full mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <Toaster position="top-center" richColors />
        <h2 className="text-2xl text-slate-700 flex font-lexend-mega items-center justify-center font-bold mb-8">Welcome</h2>
        <form onSubmit={formik.handleSubmit} id="loginForm">
          <div class="form-input mb-6">
            <input type="email" id="email" placeholder=" " {...formik.getFieldProps('email')} autoComplete="off" required class="w-full"/>
            <label for="email" className='font-lexend'>Email address</label>
          </div>

          <div className="form-input mb-6">
            <input
              id="password"
              type="password"
              placeholder=" "
              {...formik.getFieldProps("password")}
              autoComplete="off" 
              required class="border-2 w-full p-3 rounded-md focus:outline-none focus:ring-blue-400"
            />
            <label htmlFor="password" class="block font-lexend text-gray-700 mb-2">Password</label>
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
          
          <button className="text-neutral-700 indent-1 float-left text-sm hover:text-neutral-950 transition duration-300"onClick={resetPassowrd}>Forgot Password?</button>

          <button type="submit" class="continuebtn font-lexend">Login</button>

          <div className="flex items-center justify-between my-4">
            <div className="border-b w-full"></div>
            <span className="px-3 font-lexend text-gray-500">OR</span>
            <div className="border-b w-full"></div>
          </div>

          <button className="bg-white font-lexend border py-2 w-full rounded-l mt-5 flex justify-center items-center text-sm hover:bg-gray-100 duration-200 text-[#4a5568]" onClick={signInWithGoogle}> 
            <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            Login with Google
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?
          <a href="#" className="text-[#545454] signup-link" onClick={() => navigate('/signup')}>  Sign up</a>
        </p>
      </div>
    </div>  
  );
};

export default LoginForm;



