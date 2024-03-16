import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config.js";
import { Toaster, toast } from "sonner";
import './LoginForm.css';

const ResetForm = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
            alert('Reset link sent to your email')
        })
        .catch((error) => {
            toast.error('Failed to reset your password. please try again later', {duration: 3000})
            console.error(error.code, ":", error.message);
            setSubmitting(false);
        });
    }
    });



  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen w-full mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <Toaster position="top-center" richColors />
        <h2 className="text-2xl text-slate-700 flex items-center justify-center font-bold mb-8">Reset your password</h2>
        <form onSubmit={formik.handleSubmit} id="ResetForm">
          <div class="form-input mb-6">
            <input type="email" id="email" placeholder="" {...formik.getFieldProps('email')} autocomplete="off" required class="w-full"/>
            <label for="email">Email address</label>
          </div>
          <div class="w-full max-w-md mx-auto">
            <div class="relative">
              <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option>Select an option</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <button type="submit" class="continuebtn">Reset</button>
        </form>
      </div>
    </div>  
  );
};

export default ResetForm;
