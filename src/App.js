import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm.js';
import SignUpForm from './components/Auth/SignUpForm.js';
import ResetForm from './components/Auth/ResetForm.js';
import SearchSchoolScreen from './components/Schools/SearchSchoolScreen.js';
import ConfirmSchoolScreen from './components/Schools/ConfirmSchoolScreen.js';
import ProductSelectionScreen from './components/products/ProductSelectionScreen.js';
// import './styles/index.css';
import './components/Auth/LoginForm.css';
import './components/Auth/SignUpForm.css';
// import './styles/components.css';
// Import other components as you create them

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/resetpassword" element={<ResetForm />} />
        <Route path="/searchschool" element={<SearchSchoolScreen />} />
        <Route path="/confirm-school/:schoolId" element={<ConfirmSchoolScreen />} />
        <Route path="/products/:schoolId" element={<ProductSelectionScreen />} />
      </Routes>
    </div>
  );
}

export default App;
