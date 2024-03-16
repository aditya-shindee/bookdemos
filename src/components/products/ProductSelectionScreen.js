import React, { useState, useEffect } from 'react';
import { db } from "../../firebase-config.js";
import {collection, query, where, getDocs } from 'firebase/firestore';
import { useParams, useNavigate  } from 'react-router-dom';


const ProductSelectionScreen = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams(); // Extracts schoolId from the URL
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
        where("school_id", "==", parseInt(schoolId)), // Make sure to parse the schoolId as an integer
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
    // Navigate to size selection screen with the product SKU
    navigate(`/size-selection/${product.SKU}`, { state: { product } });
  };

  return (
    <body class="overflow-x-hidden ">
      <div class="bg-gray-200 flex justify-center items-center h-screen">
        <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col items-center overflow-y-auto -mt-14 ">
          <h1 class="text-2xl font-bold font-lexend-mega text-center mt-2">UNIFORMITY</h1>
          <div class="w-full md:w-3/4 lg:w-1/2 flex justify-center items-center mt-8">
            <div class="w-full h-14 bg-gray-200 rounded-lg flex items-center justify-between px-2 space-x-2">
              <button class={`w-1/2 h-2/3 rounded-lg ${gender === 'male' ? 'bg-blue-100' : 'bg-gray-200'} text-black font-lexend font-semibold hover:bg-blue-100 `} onClick={() => setGender('male')}>Male</button>
              <button class={`w-1/2 h-2/3 rounded-lg ${gender === 'female' ? 'bg-pink-100' : 'bg-gray-200'} text-black font-lexend font-semibold hover:bg-pink-100 `} onClick={() => setGender('female')}>Female</button>
            </div>
          </div>

          
          {/* <div class=" w-2/3 mt-4">
            <select className="block appearance-none w-full font-lexend bg-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-1 focus:ring-gray-600 focus:bg-gray-200 focus:border-gray-600" aria-label="Select class" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(classNumber => (
                <option key={classNumber} value={String(classNumber)}>{`Class/Grade ${classNumber}`}</option>
              ))}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div> */}
          {/* <p class="font-bold text-xl text-center mb-2">Products</p> */}
          <div className="w-96 grid grid-cols-2 gap-4 mt-2">
            {products.map(product => (
              <div key={product.SKU} className="product-card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-46" onClick={() => handleProductClick(product)}>
                <img src={product.image_url} alt={product.product_name} class="w-full h-auto rounded-lg" />
                <div className="product-info">
                  <div className="mt-2 font-bold truncate w-full text-center">{product.product_name}</div>
                  <div className="product-price">₹{product.price}</div>
                </div>
              </div>
            ))}
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


// -------------------------- newer template --------------------------
{/* <body class="bg-gray-200 h-screen">
  <div class="w-full h-full bg-gray-100">
    <div class="bg-gray-200 h-screen flex justify-center items-start pt-20">
      <div class="flex flex-col items-center justify-center space-y-4">
        <div class="w-96 h-40 bg-white rounded-lg shadow-lg flex items-start justify-center p-4">
          <div class="w-80 h-16 bg-gray-200 rounded-lg">
            <div class="w-80 h-16 bg-gray-200 rounded-lg flex items-center justify-center space-x-4">
              <button class="px-12 py-2 rounded-lg bg-white text-black font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="button">
                  Male
              </button>
              <button class="px-12 py-2 rounded-lg bg-white text-black font-semibold hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50" type="button">
                  Female
              </button>
            </div>
            <div class="relative w-full mt-4">
              <select class="block appearance-none w-full bg-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-1 focus:ring-gray-600 focus:bg-gray-200 focus:border-gray-600" aria-label="Select class">
                  <option disabled selected>Select Class</option>
                  <option value="class1">Class 1</option>
                  <option value="class2">Class 2</option>
                  <option value="class3">Class 3</option>
                  <!-- Add more options here -->
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div class="w-96 h-0 text-left text-black py-0 mb-1">
          <p class="font-bold text-xl mb-2 indent-2">Products</p>
          <div class="w-96 grid grid-cols-2 gap-4 mt-2">
            <div class="product-card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-46">
              <img src="https://i.ibb.co/Gt82KyV/02-1.jpg" alt="Product Name 1" class="w-full h-auto rounded-lg">
              <p class="mt-2 font-bold truncate w-full text-center">Product Name 1 That Is Very Long and Will Be Truncated</p>
              <p>$19.99</p>
            </div>
            <div class="product-card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-46">
              <img src="https://i.ibb.co/Gt82KyV/02-1.jpg" alt="Product Name 1" class="w-full h-auto rounded-lg">
              <p class="mt-2 font-bold truncate w-full text-center">Product Name 2</p>
              <p>$19.99</p>
            </div>
            <div class="product-card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-46">
              <img src="https://i.ibb.co/Gt82KyV/02-1.jpg" alt="Product Name 3" class="w-full h-auto rounded-lg">
              <p class="mt-2 font-bold truncate w-full text-center">Product Name 3</p>
              <p>$39.99</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>  */}


/// -------------------------- older coder --------------------------


// return (
//     <div className="product-selection-screen">
//       <div className="selectors">
//         <button className={`gender-selector ${gender === 'male' ? 'active' : ''}`} onClick={() => setGender('male')}>Male</button>
//         <button className={`gender-selector ${gender === 'female' ? 'active' : ''}`} onClick={() => setGender('female')}>Female</button>
//         <select className="class-selector" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
//           {Array.from({ length: 10 }, (_, i) => i + 1).map(classNumber => (
//             <option key={classNumber} value={String(classNumber)}>{`${classNumber}th Class`}</option>
//           ))}
//         </select>
//       </div>
//       <div className="product-grid">
//         {products.map(product => (
//           <div key={product.SKU} className="product-card" onClick={() => handleProductClick(product)}>
//             <img src={product.image_url} alt={product.product_name} className="product-image" />
//             <div className="product-info">
//               <div className="product-name">{product.product_name}</div>
//               <div className="product-price">₹{product.price}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };