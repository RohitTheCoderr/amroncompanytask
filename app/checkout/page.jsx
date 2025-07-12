'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Detailsform from '../detailsform/page';
import { decrementCartCount, incrementCartCount } from '../../reduxStore/slices/cartCountSlice';

const Checkout = () => {
  // const cartItems = useSelector(state => state.cart.items);
  const [isform, setIsform] = useState(false)

  const handleclick = () => {
    setIsform(true)
  }

  const dispatch = useDispatch();
  // const cartCount = useSelector(state =>
  //   Array.isArray(state.cart?.items)
  //     ? state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  //     : 0

  // );
   const cart = useSelector(state =>(state.cart?.items));
  console.log("cartdata", cart);
  const cartCount=cart?.length

  // const cartCount = useSelector((state) => state.cartCount.count);
  // const cart = JSON.parse(localStorage.getItem('guestCart'));
  // console.log("cartguest", cart);
  let { _id, productName, images, price, size, description, discount, color, manufacturer, Quantity = 1 } = cart[0]
  let MRP = (price * (100 + discount) / 100).toFixed(0) * cartCount;
  price = price * cartCount
  let dicsountprice = MRP - price

  return (
    <>
      {
        isform ? <Detailsform /> : (
          <div className="p-4 py-12 min-h-[85vh] w-full flex flex-wrap justify-around items-start">
            {/* Cart Item */}
            <div className="flex max-sm:w-full sm:w-1/2 gap-4 items-start border-b border-gray-300 shadow p-3">
              <div className="w-28 h-28 relative rounded-sm overflow-hidden">
                <Image
                  // src={`data:${images[0]?.contentType};base64,${images[0]?.data}`}
                  // alt={productName}
                  src="/images/portfolioImg/farmarea.jpg"
                  alt="Product Area"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex max-lg:flex-wrap gap-2 w-full justify-between flex-1">
                <div className='w-full'>
                  <h3 className="text-lg font-semibold">{productName}</h3>
                  <p className="text-gray-500 text-sm line-clamp-1">{description}</p>
                </div>
                <div className="flex gap-8 items-center">
                  <div className="flex items-center gap-2 text-sm">
                    Quantity:
                    <button
                      onClick={() => dispatch(decrementCartCount())}
                      className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="bg-gray-200 px-3 py-1 rounded border text-black">
                      {cartCount}
                    </span>
                    <button
                      onClick={() => dispatch(incrementCartCount())}
                      className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center text-sm">
                    Rs:
                    <span className="text-[#de6a2a] px-1 py-1 rounded">{price}</span>
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
                    <span>{MRP}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount on MRP:</span>
                    <span>- ₹{dicsountprice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total Amount:</span>
                    <span>{price}</span>
                  </div>
                </div>
                {/* <Link href={"/detailsform"}> <button className='text-white hover:text-black bg-[#de6a2a] hover:bg-[#ffa264] rounded-lg outline-none w-full mt-3 py-3 cursor-pointer text-lg'>Proceed to Checkout</button></Link> */}
                <button onClick={handleclick} className='text-white hover:text-black bg-[#de6a2a] hover:bg-[#ffa264] rounded-lg outline-none w-full mt-3 py-3 cursor-pointer text-lg'>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )
      }
    </>

  );
};

export default Checkout;
