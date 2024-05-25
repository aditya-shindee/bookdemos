import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config.js";
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../close_icon2.svg';
import './search.css';
import { ReactComponent as MenuIcon }  from '../../menu_5.svg';
import { ReactComponent as CartIcon }  from '../../cart_5.svg';

const SearchSchoolScreen = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidecartOpen, setcartOpen] = useState(false);

  // Firestore reference
  const schoolsCollectionRef = collection(db, "class");
  
  const clearSearch = () => {
    setSearchTerm('');
  };

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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const contactUs = () => {
    navigate("/contactus");
  };

  const handleSchoolSelect = (school) => {
    navigate(`/confirm-school/${school.school_id}`, { state: { school } });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClassSelect = () => {
    navigate("/books");
  };

  const togglecart = () => {
    navigate("/cartscreen");
  };
  
  return (
    <body class="overflow-x-hidden">
      <div class="relative bg-gray-200 flex justify-center items-center h-screen">
        <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col -mt-14 relative">
          
          <button className="sidebar-toggle left-4 mx-2 mt-4 -mb-4" onClick={toggleSidebar}>
            <MenuIcon className="h-5 w-5 hover:text-gray-600"/>
          </button>
          <h1 class="text-2xl font-bold font-lexend-exa text-center mt-2 ">ICSE BOOKS</h1>

          <div class="w-96 h-0 text-left text-black py-0 mb-4">
            <p class="font-bold text-xl font-lexend-exa mb-10 mt-10 indent-2">CLASS/GRADE</p>
          </div>
          <div className="flex-grow mt-10 overflow-y-auto scrollbar-thin scrollbar-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <ul className="space-y-2 mt-2">
              {filteredSchools.map((school) => (
                <li
                  key={school.id}
                  onClick={() => handleClassSelect(school)}
                  className="flex items-center px-1 py-2 space-x-4 border-2 border-white rounded-xl mt-6 cursor-pointer hover:bg-gray-100"
                >
                  <div>
                    <h3 className="text-sm font-semibold truncate w-64 font-lexend-exa">{school.class_name}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className={`absolute top-0 left-0 rounded-l-3xl transform ${sidebarOpen ? '-translate-x-0' : '-translate-x-full'} h-full w-64 bg-gray-100 p-4 transition-transform duration-300`}>
            <ul className="sidebar-menu">
              <li><a href="#" className="active">Profile</a></li>
              <li><a href="#">Orders</a></li>
              <li><a href="#" onClick={contactUs}>Contact us</a></li>
            </ul>
          </div>     */}
        </div>
      </div>
      <div class="flex justify-center items-end bg-gray-200 -mt-20 mb-10">
        <button
          onClick={contactUs}
          class="text-gray-800 hover:text-black  font-semibold py-2 px-2 font-lexend"
        >
          Contact us
        </button>
      </div>
    </body> 
  );
};

export default SearchSchoolScreen;