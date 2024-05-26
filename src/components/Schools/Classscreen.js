import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase-config.js";
import { useNavigate } from 'react-router-dom';
import './search.css';
import { analytics } from "../../firebase-config.js";// Adjust the path as necessary
import { logEvent } from 'firebase/analytics';

const SearchSchoolScreen = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [searchTerm] = useState('');

  // Firestore reference
  const schoolsCollectionRef = collection(db, "class");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const querySnapshot = await getDocs(schoolsCollectionRef);
        const schoolList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSchools(schoolList);
      } catch (error) {
        console.error("Error fetching schools: ", error);
      }
    };

    fetchSchools();
  }, []);

  // Filter schools based on search term
  const filteredSchools = schools.filter(school =>
    school.class_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClassSelect = async (school) => {
    try {
      // Log the button click event
      logEvent(analytics, 'button_click', {
        class: school.class_name,
      });
      
      const classId = { class_id: school.class_name, timestamp: Date.now() }
      await addDoc(collection(db, 'users_selected'), classId);

      // Navigate to the class page
      navigate(`/books`);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  
  return (
    <body class="overflow-x-hidden">
      <div class="relative bg-gray-200 flex justify-center items-center h-screen">
        <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col -mt-14 relative">
          
          <h1 class="text-2xl font-bold font-lexend-exa text-center mt-2 ">ICSE BOOKS</h1>

          <div class="w-96 h-0 text-left text-black py-0 mb-4">
            <p class="font-bold text-xl font-lexend-exa mb-10 mt-10 indent-2">CLASS/GRADE</p>
          </div>
          <div className="flex-grow mt-10 overflow-y-auto scrollbar-thin scrollbar-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <ul className="space-y-1 mt-2">
              {filteredSchools.map((school) => (
                <li
                  key={school.id}
                  onClick={() => handleClassSelect(school)}
                  className="flex items-center px-1 py-3 space-x-2 border-2 border-white rounded-xl mt-8 cursor-pointer hover:bg-gray-100"
                >
                  <div>
                    <h3 className="mx-6 text-lg font-semibold truncate w-64 font-lexend-exa">{school.class_name}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </body> 
  );
};

export default SearchSchoolScreen;