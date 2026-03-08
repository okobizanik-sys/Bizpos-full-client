import { getUser } from "@/services/auth";
import { apiBaseUrl } from "@/config/config";
import { getUserOrders } from "@/services/userInformation";
import Image from "next/image";
import React from "react";
import {
  FaBox,
  FaCalendarAlt,
  FaCheckCircle,
  FaSpinner,
  FaReceipt,
  FaExclamationTriangle,
  FaHourglassHalf,
  FaClipboardList,
  FaPauseCircle,
  FaInbox,
  FaMoneyBillWave,
  FaTruck,
} from "react-icons/fa";
import { TProduct } from "@/types";


const getStatusInfo = (status: string) => {
  switch (status) {
    case "OrderPlaced":
      return {
        label: "Order Placed",
        color: "text-blue-600",
        icon: <FaClipboardList className="inline-block mr-2 text-blue-600" />,
      };
    case "DeliveredPending":
      return {
        label: "Delivered Pending",
        color: "text-yellow-600",
        icon: <FaHourglassHalf className="inline-block mr-2 text-yellow-600" />,
      };
    case "Delivered":
      return {
        label: "Delivered",
        color: "text-green-600",
        icon: <FaCheckCircle className="inline-block mr-2 text-green-600" />,
      };
    case "PartialDelivered":
      return {
        label: "Partial Delivered",
        color: "text-orange-600",
        icon: (
          <FaExclamationTriangle className="inline-block mr-2 text-orange-600" />
        ),
      };
    case "Cancelled":
      return {
        label: "Cancelled",
        color: "text-red-600",
        icon: (
          <span className="inline-block w-4 h-4 bg-red-600 rounded-full mr-2"></span>
        ),
      };
    case "Hold":
      return {
        label: "Hold",
        color: "text-purple-600",
        icon: <FaPauseCircle className="inline-block mr-2 text-purple-600" />,
      };
    case "InReview":
      return {
        label: "In Review",
        color: "text-yellow-600",
        icon: (
          <FaSpinner className="inline-block mr-2 text-yellow-600 animate-spin" />
        ),
      };
    default:
      return {
        label: status,
        color: "text-gray-600",
        icon: (
          <span className="inline-block w-4 h-4 bg-gray-400 rounded-full mr-2"></span>
        ),
      };
  }
};

const OrderHistory = async () => {
  const user = await getUser();
  const userId = user?.id;

  const userOrderHistoryResponse = await getUserOrders(userId as string);
  const userOrderHistory = (userOrderHistoryResponse as { data: any }).data;



  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaBox className="text-blue-700" />
        Order History
      </h2>

      <div className="space-y-4">
        {Array.isArray(userOrderHistory) && userOrderHistory.length > 0 ? (
          userOrderHistory.map((order) => {
            const { label, color, icon } = getStatusInfo(order.status);

            return (
              <div
                key={order?._id}
                className="p-4 border rounded-lg shadow hover:shadow-md transition flex flex-col gap-y-2"
              >
                <div className="font-semibold flex items-center">
                  <FaBox className="inline-block mr-2 text-gray-600" />
                  <div>
                    <span className="mr-2">Order ID:</span>
                    {order?.orderId}
                  </div>
                </div>

                <div className="flex items-center">
                  <FaCalendarAlt className="inline-block mr-2 text-red-600" />
                  <div>
                    <span className="mr-2 font-semibold">Order Date:</span>
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="flex items-center">
                  <FaMoneyBillWave className="inline-block mr-2 text-green-600" />
                  <div>
                    <span className="mr-2 font-semibold">Amount:</span>৳
                    {order?.totalPrice}
                  </div>
                </div>

                <div className="flex items-center">
                  <FaTruck className="inline-block mr-2 text-blue-600" />
                  <div>
                    <span className="mr-2 font-semibold">Delivery Charge:</span>
                    ৳{order?.shippingCost}
                  </div>
                </div>

                <div className="flex items-center">
                  {icon}
                  <span className="mr-2 font-semibold">Status:</span>
                  <span className={`font-medium ${color}`}>{label}</span>
                </div>

                <div>
                  <div className="font-semibold flex items-center mb-2">
                    <FaReceipt className="mr-2" /> <span>Order Items</span>
                  </div>
                  {order.products?.map((item: TProduct & { productRef: { thumbnailImage?: string; name?: string; productId?: string; quantity?: number } }) => (
                    <div
                      key={item._id}
                      className="ml-6 border-l-2 border-gray-200 pl-4 mb-2 text-md flex flex-col space-y-1"
                    >
                      {item?.productRef?.thumbnailImage && (
                        <div>
                          <Image
                            src={`${apiBaseUrl}${item.productRef.thumbnailImage}`}
                            width={100}
                            height={100}
                            alt={item.productRef.name || "Product Image"}
                          />
                        </div>
                      )}

                      <p>
                        <span className="font-medium mr-2">Product ID:</span>
                        {item?.productRef?.productId || "Product Not Available"}
                      </p>
                      <p>
                        <span className="font-medium mr-2">Product Name:</span>
                        {item?.productRef?.name || "Product Not Available"}
                      </p>
                      <p>
                        <span className="font-medium mr-2">Quantity:</span>
                        {item.quantity}
                      </p>
                      <p>
                        <span className="font-medium mr-2">Price:</span> ৳
                        {item.price}
                      </p>
                      <p>
                        <span className="font-medium mr-2">MRP:</span> ৳
                        {item.mrpPrice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-600 p-6 border border-dashed rounded-lg">
            <FaInbox className="text-4xl text-gray-400 mx-auto mb-2" />
            <p className="text-lg font-medium">No orders found</p>
            <p className="text-sm">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
