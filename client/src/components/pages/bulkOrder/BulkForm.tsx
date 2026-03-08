"use client";

import { BulkOrderPosting } from "@/services/bulk-order";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: number;
  companyName: string;
  address: string;
  productType: string;
  deliveryDate: string;
  bulkQuantity: number;
  description: string;
}

const BulkForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await BulkOrderPosting({
        name: data.name,
        email: data.email,
        phone: String(data.phone),
        address: data.address,
        companyName: data.companyName,
        productType: data.productType,
        deliveryDate: data.deliveryDate,
        quantity: Number(data.bulkQuantity),
        description: data.description,
      });

      console.log(result);

      router.push("/thank-you");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit your bulk order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-20 lg:my-5 bg-[#f8f8f8] flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 lg:space-x-10 xl:space-x-20 p-6 rounded-lg shadow-sm">
      <div className="flex-1">
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl font-bold text-gray-800">
            Share Your Needs
          </div>
          <div className="font-medium text-gray-600 mt-2">
            We'll Make It Happen!
          </div>
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full my-2.5 border border-black/20 p-1.5 bg-white rounded focus:border-black focus:outline-none"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500">
                  {String(errors.name.message)}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full my-2.5 border border-black/20 p-1.5 bg-white rounded focus:border-black focus:outline-none"
                  {...register("email")}
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full my-2.5 border border-black/20 p-1.5 bg-white rounded focus:border-black focus:outline-none"
                  {...register("phone", {
                    required: "Phone Number is required",
                  })}
                />
                {errors.phone && (
                  <span className="text-red-500">
                    {String(errors.phone.message)}
                  </span>
                )}
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Company Name"
                className="w-full my-2.5 border border-black/20 p-1.5 bg-white rounded focus:border-black focus:outline-none"
                {...register("companyName")}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Full Address"
                className="w-full my-2.5 border border-black/20 p-1.5 bg-white rounded focus:border-black focus:outline-none"
                {...register("address")}
              />
            </div>

            <div className="">
              <input
                type="text"
                placeholder="Product Type (T-shirt, Polo T-shirt, Jacket, Gift Item etc.)"
                className=" w-full my-2.5 border border-black/20 p-1.5 bg-white rounded focus:border-black focus:outline-none"
                {...register("productType")}
              />
            </div>
            <div className="flex gap-3">
              <div className="w-full">
                <input
                  type="date"
                  placeholder="Estimated Delivery Date"
                  className="w-full my-2.5 border border-black/20 p-1.5 bg-white rounded focus:border-black focus:outline-none"
                  {...register("deliveryDate")}
                />
              </div>
              <div className="w-full">
                <input
                  type="number"
                  placeholder="Approx. Quantity"
                  className="w-full my-2.5 border border-black/20 p-1.5 bg-white rounded focus:border-black focus:outline-none appearance-none [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  {...register("bulkQuantity")}
                />
              </div>
            </div>
            <div>
              <textarea
                placeholder="Description (Optional)"
                className="w-full my-2.5 border border-black/20 p-1.5 bg-white rounded focus:border-black focus:outline-none"
                rows={4}
                {...register("description")}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#204392] hover:bg-[#1D57D8]"
              } rounded py-2 mt-8 text-white transition ease-in-out duration-300 mx-auto w-40 block`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1">
        <div className="mx-auto">
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold text-gray-800">
              Or, we are just a call away
            </div>
            <div className="font-medium text-gray-600 mt-2">
              Your Solutions Await!
            </div>
          </div>
          <p className="text-gray-700 my-5">
            Let's talk and make your brand stand out! We are just one call away.
            <br />
            Or you can book a walk-in appointment with us.
          </p>

          <div className="text-left">
            <h3 className="font-bold text-gray-800 mb-2">The Office</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-gray-600 mt-1" />
                  <span>Dhaka, Dhaka Division, Bangladesh</span>
                </div>
              </li>

              <li>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-gray-600" />
                  <a
                    href="tel:+8801805112114"
                    className="text-gray-600 hover:underline"
                  >
                    +8801805112114 (Sales, Whatsapp - Global)
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaMobileAlt className="text-gray-600" />
                  <a
                    href="tel:+8801805112114"
                    className="text-gray-600 hover:underline"
                  >
                    +8801805112114(Customer Service)
                  </a>
                </div>
              </li>

              <li>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-600" />
                  <a
                    href="mailto:mail@unicrescent.com"
                    className="text-gray-600 hover:underline"
                  >
                    support@unicrescent.com
                  </a>
                </div>
              </li>
            </ul>

            <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">Hours</h3>
            <ul className="pl-5 list-disc text-gray-700 space-y-1">
              <li>Sunday - Thursday</li>
              <li>09:00 AM - 06:00 PM (GMT+6)</li>
            </ul>

            <div className="mt-6">
              <iframe
                title="Unicrescent Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.887678301881!2d90.35840537590783!3d23.751612289096654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0a0f9dbecab%3A0x1a5d5cce63cc8693!2sFabrilife!5e0!3m2!1sen!2sbd!4v1712391482365!5m2!1sen!2sbd"
                width="100%"
                height="300"
                className="rounded-md border border-gray-300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BulkForm;
