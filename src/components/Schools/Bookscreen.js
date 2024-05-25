import React from 'react';

import './search.css';


const bookScreen = () => {

  
  return (
    <body class="overflow-x-hidden">
      <div class="relative bg-gray-200 flex justify-center items-center h-screen">
        <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col -mt-14 relative">
          
          <h1 class="text-2xl font-bold font-lexend-exa text-center mt-2 ">ICSE BOOKS</h1>

          <div class="w-96 h-0 text-left text-black py-0 mb-4">
            <p class="font-bold text-xl font-lexend-exa mb-10 mt-10 indent-2">CLASS/GRADE</p>
          </div>


        </div>
      </div>
    </body> 
  );
};

export default bookScreen;