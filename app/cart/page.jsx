'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../reduxStore/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartlist = useSelector(state => state?.cart?.items?.listofproducts);


  const cartTotals = cartlist?.reduce(
    (acc, item) => {
      const safePrice = Number(item?.price) || 0;
      const safeDiscount = Number(item?.discount) || 0;
      const safeQuantity = Number(item?.Quantity) || 1;

      // unit price with discount applied
      const basePrice = Math.round(safePrice * (1 + safeDiscount / 100));
      // full totals
      const MRP = basePrice * safeQuantity;
      const totalPrice = safePrice * safeQuantity;
      const discountPrice = MRP - totalPrice;

      // accumulate totals
      acc.totalMRP += MRP;
      acc.totalOriginal += totalPrice;
      acc.totalDiscount += discountPrice;
      return acc;
    },
    { totalMRP: 0, totalOriginal: 0, totalDiscount: 0 }
  );

  return (
    <div className="p-4 py-12 min-h-[85vh] w-full flex flex-wrap justify-around items-start">
      {/* Cart Item */}
      <div className=' max-md:w-full w-1/2 gap-4'>
        <h2 className='font-medium text-[#de6a2a] text-2xl'>You cart products</h2>
        {cartlist?.map((item) => (
          <div key={item._id} className="flex w-full gap-4 items-start my-2 border-b border-gray-300 shadow p-3">
            <div className="w-28 h-28 relative rounded-sm overflow-hidden">
              <Image
                src={`data:${item?.images[0]?.contentType};base64,${item?.images[0]?.data}`}
                alt="product img"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex max-lg:flex-wrap gap-2 w-full justify-between flex-1">
              <div className='w-full'>
                <h3 className="text-lg font-semibold">{item?.productName}</h3>
                <p className="text-gray-500 text-sm line-clamp-1">{item?.description}</p>
              </div>
              <div className="flex flex-col gap-4 items-start">
                <div className="flex gap-8 items-center">
                  <div className="flex items-center gap-1 text-sm">
                    Quantity:
                    {/* <button
                    onClick={decrement}
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 cursor-pointer"
                  >
                    -
                  </button> */}
                    <span className="bg-gray-200 px-3 py-1 rounded border text-black">
                      {item?.Quantity}
                    </span>
                    {/* <button
                    onClick={increment}
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 cursor-pointer"
                  >
                    +
                  </button> */}
                  </div>
                  <div className="flex items-center text-sm">
                    Rs:
                    <span className="text-[#de6a2a] px-1 py-1 rounded">{item?.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <label className="text-sm font-medium text-gray-700">Size:</label>
                  {item.size}
                </div>
              </div>
            </div>
            <div><TrashIcon className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-700" />
            </div>

          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="max-sm:w-full flex ">
        <div className='flex-col w-full sm:w-[20rem]'>
          <div className="w-full border border-gray-300 rounded-lg p-4 space-y-3 shadow-sm">
            <h3 className="text-lg font-bold border-b pb-2">Price Details</h3>
            <div className="flex justify-between">
              <span>Total MRP:</span>
              <span>₹{cartTotals?.totalMRP}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount on MRP:</span>
              <span>- ₹{cartTotals?.totalDiscount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total Amount:</span>
              <span>₹{cartTotals?.totalOriginal}</span>
            </div>
          </div>
          <Link href={"/checkout"}> <button className='text-white hover:text-black bg-[#de6a2a] hover:bg-[#ffa264] rounded-lg outline-none w-full mt-3 py-3 cursor-pointer text-lg'>Proceed to Checkout</button></Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
