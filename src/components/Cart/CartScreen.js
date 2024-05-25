import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase-config.js";
import { doc, getDoc } from 'firebase/firestore';

const CartScreen = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const storedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      const fetchedItems = [];

      for (const cartItem of storedCart) {
        const [productId, size] = cartItem.split('-');
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          fetchedItems.push({
            id: productId,
            size: size,
            ...docSnap.data(),
            quantity: 1 // Assuming default quantity is 1
          });
        } else {
          console.log("No such document!");
        }
      }

      setCartItems(fetchedItems);
    };

    fetchCartItems();
  }, []);

  const contactUs = () => {
    navigate("/contactus");
  };


  const updateQuantity = (index, delta) => {
    setCartItems(currentItems => {
        const newItems = [...currentItems];
        const newQuantity = newItems[index].quantity + delta >= 1 ? newItems[index].quantity + delta : 1;
        newItems[index] = { ...newItems[index], quantity: newQuantity };
        return newItems;
    });
    };


  const proceedToCheckout = () => {
    const finalCart = cartItems.map(item => `${item.id}-${item.size}-${item.quantity}`);
    localStorage.setItem('checkoutCart', JSON.stringify(finalCart));
    navigate("/checkout");
  };

  return (
    <body class="overflow-x-hidden">
        <div class="relative bg-gray-200 flex justify-center items-center h-screen">
            <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col -mt-14 relative">
                <h1 class="text-2xl font-bold font-lexend-exa text-center mt-2 ">UNIFORMITY</h1>

                <div class="w-96 h-0 text-left text-black py-0 mb-4">
                    <p class="font-bold text-xl font-lexend-exa mb-2 mt-12 indent-2">Your products in cart</p>
                </div>
                <div className="flex-grow mt-20 overflow-y-auto">
                    <ul className="-space-y-1">
                        {cartItems.map((item, index) => (
                        <li key={`${item.id}-${item.size}`} className="flex items-center px-1 py-3 space-x-2 border-2 border-white rounded-xl">
                            <img src="https://cartzilla.createx.studio/img/grocery/single/01.jpg" className="ml-2 h-20 w-20 rounded-lg" />
                            <div>
                                <h3 className="indent-2 text-sm font-semibold truncate w-64 font-lexend-exa">{item.product_name}</h3>
                                <p className="indent-2 text-xs text-black truncate w-64 font-lexend-exa mt-2">{`Size: ${item.size}`}</p>
                                <h3 className="indent-2 text-xs text-black truncate w-64 font-lexend-exa mt-2">{`Price: ₹${item.price.toFixed(2)}`}</h3>
                            </div>
                            <div className="flex font-lexend-exa border border-gray-300 -ml-2">
                                <button 
                                    onClick={() => updateQuantity(index, -1)} 
                                    disabled={item.quantity <= 1}
                                    className="text-black bg-white font-lexend-exa hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none h-full px-2 border-r border-gray-300"
                                >–
                                </button>
                                    <span className="px-3">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(index, 1)}
                                    className="text-black bg-white font-lexend-exa hover:bg-gray-100 focus:outline-none h-full px-2 border-l border-gray-300"
                                >+
                                </button>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
                <div class="flex justify-center items-center mb-6">
                    <button onClick={proceedToCheckout} className="mt-8 bg-black hover:bg-gray-800 transition duration-300 font-lexend text-white font-bold py-3 px-5 rounded flex items-center mt-8">
                    Proceed to checkout
                    <svg class="ml-3 w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-end bg-gray-200 -mt-20 mb-10">
            <button onClick={contactUs} class="text-gray-800 hover:text-black font-semibold py-2 px-2 font-lexend">
            Contact us
            </button>
        </div>
    </body>
    );
};

    // <body class="overflow-x-hidden">
    //   <div class="relative bg-gray-200 flex justify-center items-center h-screen">
    //     <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col -mt-14 relative">
    //       <h1 class="text-2xl font-bold font-lexend-exa text-center mt-2 ">UNIFORMITY</h1>
          
    //       <div class="w-96 h-0 text-left text-black py-0 mb-4">
    //         <p class="font-bold text-xl font-lexend-exa mb-2 mt-12 indent-2">Your products in cart</p>
    //       </div>
    //       <div className="flex-grow mt-20 overflow-y-auto scrollbar-thin scrollbar-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
    //         <ul className="-space-y-1">
    //             {cartItems.map((item, index) => (
    //             <li key={`${item.id}-${item.size}`} className="flex items-center px-1 py-4 space-x-4 border-2 border-white rounded-xl">
    //                 <img src="https://cartzilla.createx.studio/img/grocery/single/01.jpg" className="ml-2 h-20 w-20 rounded-lg" />
    //                 <div>
    //                     <h3 className="indent-2 text-sm font-semibold truncate w-64 font-lexend-exa">{item.product_name}</h3>
    //                     <p className="indent-2 text-xs text-black truncate w-64 font-lexend-exa mt-1">{`Size: ${item.size}`}</p>
    //                     <h3 className=" indent-2 text-sm truncate w-64 font-lexend-exa mt-2">{`Price: $${item.price.toFixed(2)}`}</h3>
    //                 </div>
    //                 <div className="flex font-lexend-exa border border-gray-300 mr-10">
    //                     <button 
    //                         onClick={() => updateQuantity(index, -1)} 
    //                         disabled={item.quantity <= 1}
    //                         className="text-black bg-white font-lexend-exa hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none h-full px-2 border-r border-gray-300"
    //                     >
    //                         –
    //                     </button>
    //                     <span className="px-3">{item.quantity}</span>
    //                     <button 
    //                         onClick={() => updateQuantity(index, 1)}
    //                         className="text-black bg-white font-lexend-exa hover:bg-gray-100 focus:outline-none h-full px-2 border-l border-gray-300"
    //                     >
    //                         +
    //                     </button>
    //                 </div>

    //             </li>
    //             ))}
    //         </ul>
    //         </div>

    //       <div class="flex justify-center items-center mb-6">
    //         <button onClick={proceedToCheckout} className="mt-8 bg-black hover:bg-gray-800 transition duration-300 font-lexend text-white font-bold py-3 px-5 rounded flex items-center mt-8">
    //           Proceed to checkout
    //           <svg class="ml-3 w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div class="flex justify-center items-end bg-gray-200 -mt-20 mb-10">
    //     <button onClick={contactUs} class="text-gray-800 hover:text-black  font-semibold py-2 px-2 font-lexend">
    //       Contact us
    //     </button>
    //   </div>
    // </body> 
  

export default CartScreen;
