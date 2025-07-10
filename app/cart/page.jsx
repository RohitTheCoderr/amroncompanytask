'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CartPage = () => {
  return (
    <div className="p-4 py-12 min-h-[85vh] w-full flex flex-wrap justify-around items-start">
      {/* Cart Item */}
      <div className="flex max-sm:w-full sm:w-1/2 gap-4 items-start border-b border-gray-300 shadow p-3">
        <div className="w-28 h-28 relative rounded-sm overflow-hidden">
          <Image
            src="/images/portfolioImg/farmarea.jpg"
            alt="Product Area"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex max-lg:flex-wrap gap-2 w-full justify-between flex-1">
          <div className='w-full'>
            <h3 className="text-lg font-semibold">Product Name</h3>
            <p className="text-gray-500 text-sm line-clamp-1">Basic product details Basic product details
               Basic product detailsBasic product detailsBasic product details</p>
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-2 text-sm">
              Quantity:
              <span className="bg-gray-200 px-2 py-1 rounded border text-black">2</span>
            </div>
            <div className="flex items-center text-sm">
              Rs:
              <span className="text-[#de6a2a] px-1 py-1 rounded">299</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="max-sm:w-full flex justify-end">
        <div className='flex-col w-full sm:w-[20rem]'>
          <div className="w-full border border-gray-300 rounded-lg p-4 space-y-3 shadow-sm">
            <h3 className="text-lg font-bold border-b pb-2">Price Details</h3>
            <div className="flex justify-between">
              <span>Total MRP:</span>
              <span>₹299</span>
            </div>
            <div className="flex justify-between">
              <span>Discount on MRP:</span>
              <span>- ₹0</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total Amount:</span>
              <span>₹299</span>
            </div>
          </div>
         <Link href={"/checkout"}> <button className='text-white hover:text-black bg-[#de6a2a] hover:bg-[#ffa264] rounded-lg outline-none w-full mt-3 py-3 cursor-pointer text-lg'>Proceed to Checkout</button></Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
