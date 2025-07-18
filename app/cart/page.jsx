'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateCartItem, fetchCart, removeFromCart } from '../../reduxStore/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';
import { postData } from '../utils/apicall';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartlist = useSelector(state => state?.cart?.items?.listofproducts) || [];

  const ids = cartlist?.map(item => item._id);

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

  const handledelete = (productId) => {
    dispatch(removeFromCart(productId));
  }

  const handleQuantityChange = (productId, type) => {
    const item = cartlist.find((i) => i._id === productId);
    if (!item) return;

    let newQuantity = item.Quantity;

    if (type === "increment") {
      newQuantity += 1;
    } else if (type === "decrement" && item.Quantity > 1) {
      newQuantity -= 1;
    } else {
      return; // Do nothing if quantity is already 1 (or 0)
    }

    dispatch(addOrUpdateCartItem({
      productId,
      Quantity: newQuantity,
      size: item?.size || "M",
    }));
  };



  const handleSizeChange = (productId, newSize) => {
    const item = cartlist.find((i) => i._id === productId);
    dispatch(addOrUpdateCartItem({
      productId,
      Quantity: item?.Quantity || 1,
      size: newSize,
    }));
  };

  const handleorder = async () => {
    const data = {
      paymentMode: "Cash",
      productsdetails: cartlist.map(item => ({
        productId: item._id,
        Quantity: item.Quantity,
        size: item.size
      })),
      totalAmount: cartTotals?.totalOriginal,
    };

    try {
      const promise = postData("/users/moreorder", data);
      toast.promise(promise, {
        pending: "Confirming your order...",
        success: "Order placed successfully! 🎉",
        error: "Order confirmation failed!",
      });
      const response = await promise;
      if (response.success) {
        dispatch(removeFromCart([...ids]));
        router.push("/confirmorder");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  if (cartlist?.length <= 0) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
        <p className="text-xl font-medium text-[#de6a2a] mb-4">Your cart is currently empty.</p>
        <Link href="/">
          <button className="bg-orange-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-orange-600">
            Go Shopping
          </button>
        </Link>
      </div>)
  }

  return (
    <div className="p-4 md:px-12 py-12 min-h-[85vh] w-full ">
      {/* Cart Item */}
      <h2 className='font-medium text-[#de6a2a] text-2xl text-center mb-8'>You cart products</h2>
      <div className='flex flex-wrap justify-around items-start'>
        <div className=' max-md:w-full w-1/2 gap-4 '>
          {cartlist?.map((item) => (
            <div key={item._id} className="flex bg-white w-full gap-4 items-start my-2 border-b border-gray-300 shadow p-3">
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
                      <button
                        onClick={() => handleQuantityChange(item._id, "decrement")}
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="bg-gray-200 px-3 py-1 rounded border text-black">
                        {item?.Quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, "increment")}
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center text-sm">
                      Rs:
                      <span className="text-[#de6a2a] px-1 py-1 rounded">{item?.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <label className="text-sm font-medium text-gray-700">Size:</label>
                    <select
                      value={item.size}
                      onChange={(e) => handleSizeChange(item._id, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                </div>
              </div>
              <div><TrashIcon onClick={() => { handledelete(item?._id) }} className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-700" />
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
            <button onClick={handleorder} className='text-white hover:text-black bg-[#de6a2a] hover:bg-[#ffa264] rounded-lg outline-none w-full mt-3 py-3 cursor-pointer text-lg'>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
