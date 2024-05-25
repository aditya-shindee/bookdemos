import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from "../../firebase-config.js";
import { doc, getDoc } from 'firebase/firestore';

const SizeSelectionScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { product } = state;
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchSizes = async () => {
      const docRef = doc(db, "products", product.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSizes(docSnap.data().product_size);
      } else {
        console.log("No such document!");
      }
    };

    fetchSizes();
  }, [product]);

  const addToCart = () => {
    if (selectedSize) {

        const cartItemKey = `${product.id}-${selectedSize}`;

        const currentCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];


        if (!currentCart.some(item => item === cartItemKey)) {
        currentCart.push(cartItemKey);

        localStorage.setItem('cart', JSON.stringify(currentCart));
        }
        navigate("/cart");
    }
    };


  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const contactUs = () => {
    navigate("/contactus");
  };

  return (
    <body class="overflow-x-hidden ">
      <div class="bg-gray-200 flex justify-center items-center h-screen">
        <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col items-center overflow-y-auto -mt-14 ">
          <h1 class="text-2xl font-bold font-lexend-mega text-center mt-2">UNIFORMITY</h1>
            <img src="https://cartzilla.createx.studio/img/grocery/single/01.jpg" className="mt-8 w-4/5 md:w-1/2 md:h-80 object-contain" />   {/* src={product.image_url} alt={product.id} */}
            {/* <p class="text-xl font-bold font-lexend text-left mt-10">{school.school_name}</p> */}
            <p class="text-center text-xl font-extrabold font-lexend-exa mt-10 text-gray-800 tracking-wide">{product.product_name}</p>
            <p class="text-center text-xl font-light font-lexend mt-6 text-gray-600">{`₹${product.price}`}</p>


            <div className="flex my-2 mt-8">
                {sizes.map((size) => (
                <button
                    key={size}
                    className={`px-4 py-2 m-1 mt-8 font-lexend rounded-full border-2 ${selectedSize === size ? 'border-black' : 'border-gray-300'}`}
                    onClick={() => handleSizeSelection(size)}
                >
                    {size}
                </button>
                ))}
            </div>  
          <div class="mt-auto mb-8">
            <button onClick={addToCart} disabled={!selectedSize} className="mt-8 bg-black hover:bg-gray-800 transition duration-300 font-lexend text-white font-bold py-3 px-5 rounded flex items-center mt-8">
              Add to cart
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

export default SizeSelectionScreen;


