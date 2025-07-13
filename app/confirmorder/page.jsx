"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Page() {
  const [isClient, setIsClient] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // prevent hydration mismatch

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="font-bold text-2xl text-[#de6a2a] mb-4">Congratulations!</h2>
        <p className="mb-2">Your order has been submitted successfully.</p>
        {
          !token ? (<>
            <p className="mb-6">Please log in to view your order history.</p>
            <Link
              href="/login"
              className="inline-block h-12 w-40 leading-[3rem] text-center bg-[#de6a2a] hover:bg-[#ffa264] text-white font-medium rounded transition duration-300"
            >
              Login
            </Link>
          </>
          ) : (
            <>
              <p className="mb-6">Click here to go to your Order History or Home.</p>
              <div className='flex gap-3 justify-center items-center flex-wrap'>
                <Link
                  href="/orderhistory"
                  className="inline-block h-12 w-40 leading-[3rem] cursor-pointer text-center text-white hover:text-black bg-[#de6a2a] hover:bg-[#ffa264] font-medium rounded transition duration-300"
                >
                  Order history
                </Link>

                <Link
                  href="/"
                  className="inline-block h-12 w-40 leading-[3rem] cursor-pointer text-center border border-[#de6a2a] text-[#de6a2a] hover:bg-orange-50 font-medium rounded transition duration-300"
                >
                  Go to home
                </Link>
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export default Page;
