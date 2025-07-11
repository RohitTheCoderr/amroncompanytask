'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';

function ProductCard({ items }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { name, image, price, size, description, dis } = items
  const MRP = (price * (100 + dis) / 100).toFixed(2);

  const router = useRouter();
  const token = useSelector((state) => state.auth.token);

  const handleCheckout = () => {
    if (token) {
      router.push('/confirmorder') // Replace with your target route
    }
    else{
      router.push('/checkout') // Replace with your target route
    }
  }


  return (
    <>
      <div className="h-[26rem] w-[15rem] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
        <div className="w-[100%] sm:w-[15rem] aspect-square mx-auto relative">
          <Image
            src={image}
            alt={image}
            fill
            className="object-cover rounded"
          />
        </div>

        {/* Product Info */}
        <div className="p-2 flex flex-col justify-between ">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{name}</h2>

          <div className="flex items-center justify-start gap-4 mb-1">
            <span className="text-[#de6a2a] font-bold text-xl">₹{price}</span>
            <span className="text-gray-500 line-through text-sm">₹{MRP}</span>
          </div>
          <div className="text-sm text-gray-400 line-clamp-1">
            {description}
          </div>
          <div className="flex items-center justify-start gap-4 mb-2 text-sm">
            ⭐⭐⭐⭐⭐
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 text-white hover:text-black bg-[#de6a2a] hover:bg-[#ffa264] text-sm py-1 rounded transition" onClick={handleCheckout}>Checkout</button>
            <button className="flex-1 border border-[#de6a2a] text-[#de6a2a] text-sm py-1 rounded hover:bg-orange-50 transition" onClick={() => setIsModalOpen(true)}>Quick View</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] sm:w-[30rem] h-auto sm:min-h-[40rem] rounded-lg p-2 sm:p-4 relative">
            {/* Close Button */}
            <div
              onClick={() => setIsModalOpen(false)}
              className="absolute z-20 right-2 top-2 flex items-center justify-center w-8 h-8 rounded-full font-semibold border-gray-200 hover:border-gray-400 border-2 cursor-pointer"
            >
              X
            </div>
            <div className="w-[90%] sm:w-[18rem] aspect-square relative mx-auto mb-4">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover rounded"
              />
            </div>
            {/* Details */}
            <div className="p-2 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
              <div className=" text-sm">MRP: <span className='text-[#de6a2a] font-bold text-xl'>₹{MRP}</span></div>
              <div className=" text-sm">Discount: <span className='text-[#de6a2a] font-bold'>{dis}%</span></div>

              <div className="flex items-center gap-2">
                Size:
                {size.map((siz, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-300 rounded text-center w-10 h-10 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                  >
                    {siz}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">{description}</p>
              <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      )}


    </>

  );
}

export default ProductCard;
