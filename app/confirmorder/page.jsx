import Link from 'next/link';
import React from 'react';

function Page() {
  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="font-bold text-2xl text-[#de6a2a] mb-4">Congratulations!</h2>
        <p className="mb-2">Your order has been submitted successfully.</p>
        <p className="mb-6">Please log in to view your order history.</p>
        <Link
          href="/login"
          className="inline-block h-12 w-40 leading-[3rem] text-center bg-[#de6a2a] hover:bg-[#ffa264] text-white font-medium rounded transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Page;
