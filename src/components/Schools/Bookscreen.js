import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './search.css';
import './BookScreen.css';
import { db } from "../../firebase-config.js";
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const BookScreen = () => {

  const navigate = useNavigate();


  const isValidEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
  };

  const isValidPhoneNumber = (value) => {
      const phoneRegex = /^[0-9]{10}$/; // Adjust phone number regex as per your requirements
      return phoneRegex.test(value);
  };

  function getDeviceId() {
    const localStorageKey = 'device_id';
    let deviceId = localStorage.getItem(localStorageKey);
    if (!deviceId) {
      deviceId = "null";
    }
    return deviceId;
  }

  const formik = useFormik({
      initialValues: {
          contact: '',
      },
      validationSchema: Yup.object({
          contact: Yup.string()
              .required('Required')
              .test('is-valid-contact', 'Must be a valid email or phone number', function (value) {
                  return isValidEmail(value) || isValidPhoneNumber(value);
              }),
      }),
      onSubmit: async (values, { setSubmitting }) => {
          const userContact = { u_id: getDeviceId(), contact: values.contact }; // Structure the data as desired for Firestore

          try {
              await addDoc(collection(db, "users"), userContact);
          } catch (error) {
              console.error("Error adding contact: ", error);
          }

          setSubmitting(false);
      }
  });

  return (
    <body className="overflow-x-hidden">
      <div className="relative bg-gray-200 flex justify-center items-center h-screen">
        <div className="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col -mt-14 relative">
          <h1 className="text-2xl font-bold font-lexend-exa text-center mt-2">ICSE BOOKS</h1>
          <div className="flex flex-col justify-center h-screen mt-6 mx-auto w-full md:w-3/4 flex flex-col items-center">
            <p className="text-center font-bold font-lexend -mt-10 mb-10 ">Currently the items are out of stock <span role="img" aria-label="pensive face">😔</span></p>

            {/* <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded-md mb-4" 
              placeholder="Enter your email"
            />
            <button 
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button> */}
            <p className="text-center font-lexend mt-6">Enter your Email address or phone number, so that we can notify you when it is available</p>

            <form onSubmit={formik.handleSubmit} id="BookScreen" class="max-w-md mx-auto mt-6">
                <div class="mb-4">
                    <input 
                        type="text" 
                        id="contact" 
                        {...formik.getFieldProps('contact')} 
                        autoComplete="off" 
                        required 
                        placeholder="Email address/phone number"
                        class="w-full lg:w-64 border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    {formik.touched.contact && formik.errors.contact ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.contact}</div>
                    ) : null}
                </div>
                <button 
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        if (formik.isValid && formik.dirty) {
                            formik.handleSubmit();
                            navigate('/cart');
                        }
                    }}
                    className="w-full lg:w-64 bg-zinc-900 text-white font-semibold py-2 px-4 rounded hover:bg-gray-900 focus:outline-none focus:bg-gray-900 transition duration-200 transform active:scale-105"
                >
                    Submit
                </button>
            </form>

          </div>
        </div>
      </div>
    </body>
  );
};

export default BookScreen;