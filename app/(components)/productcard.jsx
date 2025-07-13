'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../reduxStore/slices/cartSlice';
import { setCheckoutProducts } from '../../reduxStore/slices/checkoutSlice';
import { ShoppingCartIcon, } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

function ProductCard({ items }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { _id, productName, images, price, size, description, discount, color, manufacturer } = items
  const MRP = (price * (100 + discount) / 100).toFixed(2);

  const sizeArray = size
    .replace(/[\[\]]/g, '')
    .split(',')
    .map(s => s.trim());

  const handleCheckout = () => {
    let checkoutItem = {
      ...items,
    }
    dispatch(setCheckoutProducts(checkoutItem)); // ✅ overrides old data
    localStorage.setItem("checkoutProducts", JSON.stringify(checkoutItem));
    router.push("/checkout");
  };


  const handleaddtocart = () => {
    const token = localStorage.getItem("token");
    const product = {
      productId: _id, // replace with actual product ID
      size: "M", // dynamically selected
      Quantity: 1
    };
    
    if (token) {
      dispatch(addToCart(product));
    } else {
       toast("Please login first before adding product to cart");
      // router.push('/login')
      return
    }
  }

  return (
    <>
      <div className="relative h-[26rem] w-[15rem] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
        <div className='absolute right-4 top-4 z-30 rounded-full' ><ShoppingCartIcon onClick={handleaddtocart} className='h-6 w-6 text-gray-700 hover:text-[#de6a2a] cursor-pointer' /></div>
        <div className="w-[100%] sm:w-[15rem] aspect-square mx-auto relative">
          <Image
            src={`data:${images[0]?.contentType};base64,${images[0]?.data}`}
            alt={productName}
            fill
            className="object-cover rounded"
          />
        </div>
        {/* Product Info */}
        <div className="p-2 flex flex-col justify-between ">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{productName}</h2>

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
            <button className="flex-1 text-white hover:text-black bg-[#de6a2a] hover:bg-[#ffa264] text-sm py-1 rounded transition cursor-pointer" onClick={handleCheckout}>Checkout</button>
            <button className="flex-1 border border-[#de6a2a] text-[#de6a2a] text-sm py-1 rounded hover:bg-orange-50 transition cursor-pointer" onClick={() => setIsModalOpen(true)}>Quick View</button>
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
                src={`data:${images[0]?.contentType};base64,${images[0]?.data}`}
                alt={productName}
                fill
                className="object-cover rounded"
              />
            </div>
            {/* Details */}
            <div className="p-2 space-y-1">
              <h2 className="text-lg font-semibold text-gray-800">{productName}</h2>
              <div className='flex gap-6 items-baseline '>
                <div>
                  <div className=" text-sm">MRP: <span className='text-[#de6a2a] font-bold text-xl'>₹{MRP}</span></div>
                  <div className=" text-sm">Discount: <span className='text-[#de6a2a] font-bold'>{discount}%</span></div>
                </div>
                <div className="text-black font-medium">Color: <span className='font-normal'>{color}</span></div>
              </div>

              <div className="flex items-center gap-2">
                Size:
                {sizeArray?.map((siz, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-300 rounded text-center w-10 h-10 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                  >
                    {siz}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500"><span className='font-semibold text-lg text-black'>description: </span>{description}</p>
              <p className="text-sm text-gray-500"><span className='font-semibold text-lg text-black'>Manufacturer by: </span>{manufacturer}</p>
              <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      )}
    </>

  );
}

export default ProductCard;
