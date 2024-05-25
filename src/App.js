import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchSchoolScreen from './components/Schools/SearchSchoolScreen.js';
import ClassScreen from './components/Schools/Classscreen.js';
import Bookscreen from './components/Schools/Bookscreen.js';
// import './styles/index.css';
import './components/Auth/LoginForm.css';
import './components/Auth/SignUpForm.css';
import './components/Schools/search.css';
// import './styles/components.css';
// Import other components as you create them

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchSchoolScreen />} />
        <Route path="/class/:schoolId" element={<ClassScreen />} />
        <Route path="/books" element={<Bookscreen />} />
      </Routes>
    </div>
  );
}

export default App;
