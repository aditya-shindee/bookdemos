import React, { useState, useEffect } from 'react';
import { db } from "../../firebase-config.js";
import {collection, query, where, getDocs } from 'firebase/firestore';
import { useParams, useNavigate  } from 'react-router-dom';


const ProductSelectionScreen = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams(); 
  const [gender, setGender] = useState('male');
  const [selectedClass, setSelectedClass] = useState('1');
  const [products, setProducts] = useState([]);

  const contactUs = () => {
    navigate("/contactus");
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const productsQuery = query(
        collection(db, "products"),
        where("school_id", "==", parseInt(schoolId)),
        where("gender", "==", gender),
        where("class", "==", selectedClass)
      );

      try {
        const querySnapshot = await getDocs(productsQuery);
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [schoolId, gender, selectedClass, db]);

  const handleProductClick = (product) => {
    navigate(`/size-selection/${product.SKU}`, { state: { product } });
  };

  return (
    <body class="overflow-x-hidden">
      <div class="bg-gray-200 flex justify-center items-center h-screen">
        <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col items-center -mt-14">
          <h1 class="text-2xl font-bold font-lexend-mega text-center mt-2">UNIFORMITY</h1>
          <div class="w-full flex justify-center items-center mt-8">
            <div class="w-11/12 max-w-none min-w-lg h-14 bg-gray-200 rounded-lg flex items-center justify-between px-2 space-x-2">
                <button class={`w-full h-3/4 rounded-lg ${gender === 'male' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-200'} text-black font-lexend font-semibold hover:bg-blue-100 active:border-2 active:border-blue-500`} onClick={() => setGender('male')}>Male</button>
                <button class={`w-full h-3/4 rounded-lg ${gender === 'female' ? 'bg-pink-100 border-2 border-pink-500' : 'bg-gray-200'} text-black font-lexend font-semibold hover:bg-pink-100 active:border-2 active:border-pink-500`} onClick={() => setGender('female')}>Female</button>
            </div>
          </div>
          <div class="w-11/12 mt-4">
            <select 
              className="block appearance-none w-full font-lexend bg-gray-200 text-gray-700 py-4 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-1 focus:ring-gray-600 focus:bg-gray-200 focus:border-gray-600" 
              aria-label="Select class" 
              value={selectedClass} 
              onChange={e => setSelectedClass(e.target.value)}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(classNumber => (
                <option key={classNumber} value={String(classNumber)}>{`Class/Grade ${classNumber}`}</option>
              ))}
            </select>
          </div>


          <div className="w-full flex justify-start"> 
            <p className="font-bold text-xl text-left font-lexend mt-6 ml-8">Products</p>
          </div>

          <div class="w-11/12 bg-white p-4 rounded-lg flex-grow mt-4 overflow-y-auto scrollbar-thin scrollbar-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100"> {/* Gray background box */}
            <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-2 mx-auto"> {/* Product grid */}
              {products.map(product => (
                <div key={product.SKU} class="product-card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out" onClick={() => handleProductClick(product)}>
                  <img src={product.image_url} alt={product.product_name} class="w-full h-auto rounded-lg" />
                  <div class="mt-3 w-full text-center">
                    <p class="font-semibold font-lexend truncate">{product.product_name}</p>
                    <p class="text-lg font-lexend">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div class="w-96 grid grid-cols-2 gap-4 mt-2">
            <div class="product-card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-46">
              <img src="https://i.ibb.co/Gt82KyV/02-1.jpg" alt="Product Name 1" class="w-full h-auto rounded-lg"/>
              <p class="mt-2 font-bold truncate w-full text-center">Product Name 1 That Is Very Long and Will Be Truncated</p>
              <p>$19.99</p>
            </div>
          </div> */} 
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

export default ProductSelectionScreen;
