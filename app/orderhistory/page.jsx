"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getData } from "../utils/apicall";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Page() {
  const [moreorders, setMoreorders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);

  // fetching orderhistory
  useEffect(() => {
    const fetchmoreHistory = async () => {
      try {
        const res = getData("/users/moreorder"); // adjust endpoint
        const data = await res;
        if (data?.orderHistory) {
          setMoreorders(data.orderHistory);
        }
      } catch (err) {
        toast.error("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchmoreHistory();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">

        <div className="bg-white shadow-md rounded-xl p-8 max-w-sm w-full">

          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            You're not logged in
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Please log in to view your order history.
          </p>

          <Link
            href="/login"
            className="inline-block bg-[#de6a2a] text-white px-6 py-2 rounded-md hover:bg-[#c85a22] transition"
          >
            Log In
          </Link>

        </div>
      </div>
    );
  }
  if (loading) return <div className="min-h-[80vh] flex items-center justify-center font-semibold text-center">Loading orders…</div>;
  if (!moreorders.length) return <div className="min-h-[80vh] flex items-center justify-center font-semibold text-center">No past orders found.</div>;

  return (
    <div className="space-y-6 py-12 p-4 md:px-12">
      <h1 className="text-2xl font-semibold mb-4 text-center text-[#de6a2a]">Your Order History</h1>
      <div className="flex gap-4 items-baseline w-full flex-wrap">
        {moreorders?.map((order, idx) => (
          <div key={idx} className="bg-white w-full md:w-[49%] shadow rounded-lg p-6">
            <div className="flex gap-5 flex-wrap mb-4 text-sm text-gray-600">
              <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
              <div className="flex gap-4 items-center">
                <div><strong>Mode:</strong> {order.paymentMode}</div>
                <div><strong>Total:</strong> ₹{order.totalAmount}</div>
              </div>
            </div>

            <div className="space-y-4">
              {order?.products?.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center space-x-4 bg-gray-50 p-3 rounded"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={`data:${product?.images[0]?.contentType};base64,${product?.images[0]?.data}`}
                      alt={product.productName}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{product.productName}</p>
                    <div className="flex gap-4 items-baseline">
                      <div>
                        <p className="text-sm text-gray-500">
                          Qty: {product.Quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Size: {product.size}
                        </p>
                      </div>
                      <div>price: {product.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
