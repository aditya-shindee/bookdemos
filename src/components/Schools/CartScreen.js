import React from 'react';
import './search.css';
import './BookScreen.css';

const CartScreen = () => {


  return (
    <body className="overflow-x-hidden">
      <div className="relative bg-gray-200 flex justify-center items-center h-screen">
        <div className="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col -mt-14 relative">
          <h1 className="text-2xl font-bold font-lexend-exa text-center mt-2">ICSE BOOKS</h1>
          <div className="flex flex-col justify-center h-screen mt-6 mx-auto w-full md:w-3/4 flex flex-col items-center">
            <p className="text-center font-bold font-lexend -mt-10 mb-10 ">Thank you, We will notify you once the stocks are available</p>
            
          </div>
        </div>
      </div>
    </body>
  );
};

export default CartScreen;