import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config.js";
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../close_icon2.svg';
import './search.css';

const SearchSchoolScreen = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Firestore reference
  const schoolsCollectionRef = collection(db, "school");
  
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
    school.school_name.toLowerCase().includes(searchTerm.toLowerCase())
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
  
  return (
    <body class="overflow-x-hidden ">
      <div class="bg-gray-200 flex justify-center items-center h-screen">
        <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col -mt-14 relative">
          <h1 class="text-2xl font-bold font-lexend-mega text-center mt-2">UNIFORMITY</h1>
          <div class="flex items-center bg-gray-200 rounded-lg px-2 py-2 mt-6 relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input class="bg-gray-200 outline-none font-lexend placeholder-gray-500 text-sm pl-2 w-full" type="text" placeholder="Search for schools" value={searchTerm} onChange={handleSearchChange}></input>
            {searchTerm && (
              <button onClick={clearSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 -translate-x-1">
                <CloseIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          <div class="w-96 h-0 text-left text-black py-0 mb-4">
            <p class="font-bold text-xl font-lexend-exa mb-2 mt-6 indent-2">Schools</p>
          </div>
          <div className="flex-grow mt-10 overflow-y-auto scrollbar-thin scrollbar-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <ul className="space-y-2 mt-2">
              {filteredSchools.map((school) => (
                <li
                  key={school.id}
                  onClick={() => handleSchoolSelect(school)}
                  className="flex items-center px-1 py-2 space-x-4 border-2 border-white rounded-xl cursor-pointer hover:bg-gray-100"
                >
                  <img src={school.school_logo_url} alt={`${school.school_name} Logo`} className="h-10 w-10 rounded-lg" />
                  <div>
                    <h3 className="text-sm font-semibold truncate w-64 font-lexend-exa">{school.school_name}</h3>
                    <p className="text-xs text-gray-500 truncate w-64 font-lexend-exa">{school.school_address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>    
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


// ----------------older -----------
// return (
//     <div className="search-school-screen">
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="search-input"
//         />
//         {searchTerm && (
//           <button onClick={clearSearch} className="clear-search"><CloseIcon /></button> // '✕' character as clear button
//         )}
//       </div>
//       <div className="school-list">
//         {filteredSchools.map(school => (
//           <div key={school.school_id} className="school-card" onClick={() => handleSchoolSelect(school)}>
//             <img src={school.school_logo_url} alt={school.school_name} className="school-logo" />
//             <div className="school-name">{school.school_name}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// ----------------newer -----------

// return (<div className="bg-gray-100">
//       <div className="w-full max-w-lg mx-auto px-6 bg-gray-100 h-200">
//       {/* <div className="w-full max-w-lg mx-auto px-6 py-20 shadow-lg rounded-lg bg-gray-100"> */}
//         <div className="bg-gray-100 max-w-lg">
//           <header className="py-5 text-center">
//             <img src="main_logo2.png" alt="Application Logo" className="mx-auto h-15" />
//           </header>
//           <main>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search for schools"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="w-full px-4 py-2 mb-4 border-2 border-slate-400 rounded-3xl focus:outline-none focus:ring focus:ring-indigo-50 focus:border-grey-300"
//               />
//               {searchTerm && (
//                 <button onClick={clearSearch} className="absolute right-2 top-3 transform -translate-y-3/2 -translate-x-1">
//                   <CloseIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 </button>
//               )}
//             </div>
//             <div className="flex items-center justify-between my-2">
//               <span className="text-lg indent-2 text-slate-600 font-sans font-semibold"></span>
//             </div>
//             <ul className="space-y-3">
//               {filteredSchools.map((school) => (
//                 <li
//                   key={school.id}
//                   onClick={() => handleSchoolSelect(school)}
//                   className="bg-white flex items-center px-4 py-2 space-x-2 border-2 border-slate-400 shadow-sm rounded-xl cursor-pointer hover:bg-gray-100"
//                 >
//                   <img src={school.school_logo_url} alt={`${school.school_name} Logo`} className="w-10 h-10 rounded-full lexend" />
//                   <span className="text-lg indent-3 font-lexend text-slate-600 font-sans font-semibold">{school.school_name}</span>
//                 </li>
//               ))}
//             </ul>
//           </main>
//         </div>
//       </div>
//     </div> 
//   );
// };