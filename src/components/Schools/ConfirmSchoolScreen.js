import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from "sonner";



const ConfirmSchoolScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    toast(<div><strong>Please confirm the school/institute</strong></div>, {duration: 2000})
  }, []);

  
  const school = location.state.school;
  console.log(school.id)

  const contactUs = () => {
    navigate("/contactus");
  };

  const proceedToProducts = () => {
    // Navigate to products screen with school ID
    navigate(`/products/${school.school_id}`);
  };

  return (
    <body class="overflow-x-hidden ">
      <div class="bg-gray-200 flex justify-center items-center h-screen">
        <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col items-center overflow-y-auto -mt-14 ">
          <Toaster position="top-center" richColors />
          <h1 class="text-2xl font-bold font-lexend-mega text-center mt-2">UNIFORMITY</h1>
            <img src={school.school_logo_url} alt={`${school.school_name} Logo`} className="mt-8 w-2/3 md:w-2/3 md:h-80 object-contain" />
            {/* <p class="text-xl font-bold font-lexend text-left mt-10">{school.school_name}</p> */}
            <p class="text-center font-extrabold font-lexend-exa mt-10">{school.school_name}</p>
            <p class="text-center text-sm font-light font-lexend mt-6">{school.school_address}</p>
          <div class="mt-auto mb-8">
            <button onClick={proceedToProducts} class="mt-8 bg-black hover:bg-gray-800 transition duration-300 font-lexend text-white font-bold py-3 px-5 rounded flex items-center mt-8">
              Proceed to Products
              <svg class="ml-3 w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
            </button>
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

export default ConfirmSchoolScreen;
