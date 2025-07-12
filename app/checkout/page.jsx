"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Detailsform from '../detailsform/page';
import { useRouter } from 'next/navigation'
import { postData } from '../utils/apicall';
import { toast } from 'react-toastify';

const Checkout = () => {
  const router = useRouter()
  // const dispatch = useDispatch();
  const [isform, setIsform] = useState(false)
  const [iscall, setIscall] = useState(false)
  const [selectsize, setSelectsize] = useState("M")
  const [quantity, setQuantity] = useState(1); // initial quantity
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const increment = () => {
    setQuantity(prev => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  // const token = localStorage.getItem('token');

   useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t || "");
  }, []);

  const handleclick = () => {
    if (!token) {
      setIsform(true)
    }
    else {
      setIscall(true)
      // router.push('/confirmorder')
    }
  }




  const reduxProducts = useSelector((state) => state.checkout.products);
  useEffect(() => {
    if (reduxProducts?.length > 0) {
      setProducts(reduxProducts);
    } else {
      const stored = JSON.parse(localStorage.getItem("checkoutProducts")) || [];
      setProducts(stored);
    }
  }, [reduxProducts]);


  let { _id, productName, images = [], price, size, description, discount, } = products
  let basePrice = Number((price * (100 + discount) / 100).toFixed(0));
  let MRP = basePrice * (quantity || 1);
  let totalprice = price * quantity
  let dicsountprice = MRP - price

  const sizeArray = size?.replace(/[\[\]]/g, '')
    .split(',')
    .map(s => s.trim());

  const handleSizeChange = (e) => {
    setSelectsize(e.target.value);
  };

  // place order api call
   useEffect(() => {
    if (!iscall) return;

    const placeOrder = async () => {
      const data = {
        paymentMode: "Cash",
        Quantity: quantity,
        size: selectsize,
        productIds: [_id],
        totalAmount: totalprice,
      };

      try {
        const promise = postData("/users/order", data);
        toast.promise(promise, {
          pending: "Confirming your order...",
          success: "Order placed successfully! 🎉",
          error: "Order confirmation failed!",
        });
        const response = await promise;
          console.log("response", response);
          
        if (response.success) {
          router.push("/confirmorder");
        } 
      } catch (err) {
        toast.error(err.message || "Something went wrong");
      }
    };

    placeOrder();
  }, [iscall]);

  return (
    <>
      {
        isform ? <Detailsform setIscall={setIscall} /> : (
          <div className="p-4 py-12 min-h-[85vh] w-full flex flex-wrap justify-around items-start">
            {/* Cart Item */}
            <div className="flex max-sm:w-full sm:w-1/2 gap-4 items-start border-b border-gray-300 shadow p-3">
              <div className="w-28 h-28 relative rounded-sm overflow-hidden">
                <Image
                  src={`data:${images[0]?.contentType};base64,${images[0]?.data}`}
                  alt="product img"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex max-lg:flex-wrap gap-2 w-full justify-between flex-1">
                <div className='w-full'>
                  <h3 className="text-lg font-semibold">{productName}</h3>
                  <p className="text-gray-500 text-sm line-clamp-1">{description}</p>
                </div>
                <div className="flex flex-col gap-4 items-start">
                  <div className="flex gap-8 items-center">
                    <div className="flex items-center gap-1 text-sm">
                      Quantity:
                      <button
                        onClick={decrement}
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="bg-gray-200 px-3 py-1 rounded border text-black">
                        {quantity}
                      </span>
                      <button
                        onClick={increment}
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center text-sm">
                      Rs:
                      <span className="text-[#de6a2a] px-1 py-1 rounded">{price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <label className="text-sm font-medium text-gray-700">Select Size:</label>
                    <select
                      value={selectsize}
                      onChange={handleSizeChange}
                      className="border rounded px-3 py-1 text-sm focus:outline-none cursor-pointer "
                    >
                      {sizeArray?.map((size) => (
                        <option key={size} value={size} className='cursor-pointer'>
                          {size}
                        </option>
                      ))}
                    </select>
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
                    {/* <span>{MRP}</span> */}
                    <span>{!isNaN(MRP) ? MRP : "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount on MRP:</span>
                    <span>- ₹{dicsountprice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total Amount:</span>
                    <span>{!isNaN(totalprice) ? totalprice : "N/A"}</span>
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
