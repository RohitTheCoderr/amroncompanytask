"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getData } from "../utils/apicall";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = getData("/users/order"); // adjust endpoint
        const data = await res;

        console.log("orderhistory", data);


        if (data?.orderHistory) {
          setOrders(data.orderHistory);
        }
      } catch (err) {
        toast.error("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="text-center">Loading orders…</div>;
  if (!orders.length) return <div className="text-center">No past orders found.</div>;

  return (
   <div className="space-y-6 p-4">
  <h1 className="text-2xl font-semibold mb-4">Your Order History</h1>

  {orders?.map((order, idx) => (
    <div key={idx} className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between mb-4 text-sm text-gray-600">
        <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
        <div><strong>Mode:</strong> {order.paymentMode}</div>
        <div><strong>Total:</strong> ₹{order.totalAmount}</div>
      </div>

      <div className="space-y-4">
        {order.products?.map((product) => (
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
              <p className="text-sm text-gray-500">
                Qty: {order.Quantity} · Size: {order.size}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

  );
}
