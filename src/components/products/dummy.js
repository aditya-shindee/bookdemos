<body class="overflow-x-hidden">
      <div class="relative bg-gray-200 flex justify-center items-center h-screen">
        <div class="bg-white w-11/12 h-5/6 md:w-5/6 md:h-5/6 md:max-w-xl rounded-3xl shadow-lg p-3 flex flex-col -mt-14 relative">
          <h1 class="text-2xl font-bold font-lexend-exa text-center mt-2 ">UNIFORMITY</h1>
          
          <div class="w-96 h-0 text-left text-black py-0 mb-4">
            <p class="font-bold text-xl font-lexend-exa mb-2 mt-6 indent-2">Your products</p>
          </div>
          <div className="flex-grow mt-10 overflow-y-auto scrollbar-thin scrollbar-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <ul className="space-y-2 mt-2">
              {cartItems.map((item, index) => (
                <div className="flex items-center px-1 py-2 space-x-4 border-2 border-white rounded-xl cursor-pointer hover:bg-gray-100" key={`${item.id}-${item.size}`}>
                    <img src={item.image_ur} alt={`${item.product_name} Logo`} className="h-10 w-10 rounded-lg" />
                    <div>
                        <h3 className="text-sm font-semibold truncate w-64 font-lexend-exa">{item.product_name}</h3>
                        <p className="text-xs text-gray-500 truncate w-64 font-lexend-exa">{`Size ${item.size}`}</p>
                    </div>
                    <div className="quantity-controls">
                        <button onClick={() => updateQuantity(index, -1)} disabled={item.quantity <= 1}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, 1)}>+</button>
                    </div>
                    </div>

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