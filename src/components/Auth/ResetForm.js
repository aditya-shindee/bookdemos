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
          <button type="submit" class="continuebtn">Reset</button>
        </form>
      </div>
    </div>  
  );
};

export default ResetForm;
