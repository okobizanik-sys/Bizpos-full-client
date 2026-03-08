"use client";
import cashOnDelivery from "@/assets/payment/cash-on-delivery.png";
import sslPay from "@/assets/payment/ssl-pay.png";
import { addOrder } from "@/services/order";
import { TProduct } from "@/types";
import { cities } from "@/utilits/cities";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import orderGift from "@/assets/gift/animation.gif";
import { useRef, useState } from "react";

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: number;
  customerCity: string;
  customerAddress: string;
  customerHouse: string;
  customerRoad: string;
  customerThana: string;
  customerAltPhone: number;
  note: string;
  paymentMethod: string;
  coupon?: string;
  terms?: boolean;
}

interface Props {
  userRef: string;
  products: TProduct;
  shipping: number;
  setShipping: React.Dispatch<React.SetStateAction<number>>;
  setCoupon: React.Dispatch<React.SetStateAction<string | null>>;
}

const CheckOutForm: React.FC<Props> = ({
  userRef,
  products,
  shipping,
  setShipping,
  setCoupon,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startCar, setStartCar] = useState(false);
  const [finalY, setFinalY] = useState(10);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const router = useRouter();

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value.toLowerCase();
    const hasFreeShipping: boolean =
      products.data.cartDetails?.some(
        (item: { product?: { freeShipping?: boolean } }) =>
          item.product?.freeShipping
      ) || false;

    if (hasFreeShipping) {
      setShipping(0);
    } else {
      setShipping(selectedCity === "dhaka" ? 60 : 120);
    }
  };
  //

  const payableAmount = products?.data?.totalPrice + shipping;
  const subTotalPrice = products?.data?.totalPrice;
  const couponDiscount = products?.data?.couponDiscount;
  // const shippingCost = 60;

  const onSubmit = async (data: FormData) => {
    console.log(
      "product products?.data?.cartDetails.length",
      products?.data?.cartDetails.length
    );

    try {
      if (!userRef) {
        toast.error("Session missing. Please refresh and try again.");
        return;
      }
      const order = {
        productRef: products?.data?.productRef, // Ensure this property exists in your products data
        quantity: products?.data?.quantity || 1, // Default to 1 if quantity is not provided
        userRef,
        subTotalPrice,
        totalPrice: payableAmount,
        couponDiscount,
        shippingCost: shipping || 0,
        ...data,
      };
      console.log("products ===================== order", order);

      setIsSubmitting(true);

      const result = (await addOrder(order)) as {
        status: string;
        message?: string;
      };
      console.log("products ===================== result", result);
      if (result.status === "error") {
        toast.error(result.message || "Failed to add product to cart.");
        setIsSubmitting(false);
        return;
      }
      setStartCar(true);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const buttonBox = buttonRef.current?.getBoundingClientRect();
      if (buttonBox) {
        if (buttonBox.y < 640) setFinalY(buttonBox.x + 400); // sm: mobile
        if (buttonBox.y < 768) setFinalY(buttonBox.x + 100); // md: large mobile / small tablet
        if (buttonBox.y < 1024) setFinalY(buttonBox.x + 130); // lg: tablet
        if (buttonBox.y < 1280) setFinalY(buttonBox.x + 150);
        if (buttonBox.y < 1536) setFinalY(buttonBox.x + 260); // xl: large tablet / small laptop
      }
      // setFinalY(buttonBox.x + 150 );
      // }
      setTimeout(() => {
        router.push("/thank-you");
        toast.success("checkout done");
        setIsSubmitting(false);
        setStartCar(false);
      }, 1500);
      return;
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add product to cart.");
    } finally {
      // setIsSubmitting(false);
    }
  };

  const handleAddCoupon = () => {
    const coupon = getValues("coupon");
    setCoupon(coupon ?? null);
  };

  return (
    <div className="mt-8 lg:mt-auto">
      <h1 className="text-center font-extrabold text-2xl">Checkout Info</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*Contact Info */}
        <h2 className="font-bold py-2">Contact Info</h2>
        <div className="w-full">
          <input
            type="text"
            placeholder="Full Name*"
            className="w-full my-2.5 border border-black/20 p-1.5 rounded focus:border-black focus:outline-none"
            {...register("customerName", { required: "Name is required" })}
          />
          {errors.customerName && (
            <span className="text-red-500">
              {String(errors.customerName.message)}
            </span>
          )}
        </div>
        <div className="flex lg:flex-row flex-col lg:gap-3">
          <div className="w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full my-2.5 border border-black/20 p-1.5 rounded focus:border-black focus:outline-none"
              {...register("customerEmail")}
            />
            {errors.customerEmail && (
              <span className="text-red-500">
                {String(errors.customerEmail.message)}
              </span>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Phone Number*"
              className="w-full my-2.5 border border-black/20 p-1.5 rounded focus:border-black focus:outline-none"
              {...register("customerPhone", {
                required: "Number is required",
              })}
            />
            {errors.customerPhone && (
              <span className="text-red-500">
                {String(errors.customerPhone.message)}
              </span>
            )}
          </div>
        </div>
        {/*Shipping Info */}
        <h2 className="font-bold">Shipping Info</h2>

        <div className="flex md:flex-row flex-col items-center md:gap-3 gap-1">
          <input
            {...register("customerHouse")}
            className="w-full my-2.5 border border-black/20 p-1.5 rounded focus:border-black focus:outline-none"
            type="text"
            placeholder="House No.."
          />
          <input
            {...register("customerRoad")}
            className="w-full my-2.5 border border-black/20 p-1.5 rounded focus:border-black focus:outline-none"
            type="text"
            placeholder="Road/Area..."
          />
          <input
            {...register("customerThana")}
            className="w-full my-2.5 border border-black/20 p-1.5 rounded focus:border-black focus:outline-none"
            type="text"
            placeholder="Thana..."
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Detailed Address*"
            className="w-full my-2.5 border border-black/20 p-1.5 rounded focus:border-black focus:outline-none"
            {...register("customerAddress", {
              required: "Address is required",
            })}
          />
          {errors.customerAddress && (
            <span className="text-red-500">
              {String(errors.customerAddress.message)}
            </span>
          )}
        </div>

        <div className="flex lg:flex-row flex-col w-full lg:gap-3">
          <div className="w-full">
            <select
              className="w-full my-2.5 border border-black/20 p-1.5 rounded focus:border-black focus:outline-none"
              {...register("customerCity", {
                required: "city is required",
                onChange: handleCityChange,
              })}
            >
              <option value="">Select City*</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {errors.customerCity && (
              <span className="text-red-500">
                {String(errors.customerCity.message)}
              </span>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Alt. Phone(01XXXXXXXXX)"
              className=" w-full my-2.5 border border-black/20 p-1.5 rounded focus:border-black focus:outline-none"
              {...register("customerAltPhone")}
            />
            {/* {errors.altPhone && (
              <span className="text-red-500">
                {String(errors.altPhone.message)}
              </span>
            )} */}
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Special Note (optional)"
            className=" w-full my-2.5 border border-black/20 p-1.5 rounded focus:border-black focus:outline-none"
            {...register("note")}
          />
        </div>

        {/*BreakDown */}
        <div className="text-center rounded lg:py-8 py-4 lg:my-8 my-4 bg-gray-100">
          <p className="">Your total payable amount is</p>
          <h4 className="font-extrabold text-2xl text-[#1D4092] pt-2">
            ৳{payableAmount}
          </h4>
          <p className="font-bold text-xl pb-2">BreakDown</p>
          <div className="border border-gray-300 rounded-md mx-5 p-4">
            <div className="flex justify-between border-b border-gray-300 pb-2 font-bold text-[16px]">
              <p>Purpose</p>
              <h4>Amount</h4>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-2">
              <p>Subtotal</p>
              <h4>৳{subTotalPrice}</h4>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-2">
              <p>Shipping</p>
              <h4>৳{shipping}</h4>
            </div>
            <div className="flex justify-between border-gray-300 py-2">
              <p>Discount</p>
              <h4>৳{products?.data?.couponDiscount}</h4>
            </div>
          </div>
          <div className="pt-2">
            <p>You will get the delivery within 2-3 days after confirmation.</p>
          </div>
        </div>

        {/*payment Option */}
        <div>
          <h1 className="font-bold py-3">Payment Options</h1>
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: "Please select a payment method" }}
            render={({ field }) => (
              <>
                <div className="flex gap-4">
                  <label
                    className={`flex items-center gap-2 cursor-pointer border  p-2 rounded-md hover:border-blue-400 duration-300 hover:shadow-blue-200 hover:scale-99  ${
                      field.value === "cod"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      {...field}
                      value="CashOnDelivery"
                      checked={field.value === "CashOnDelivery"}
                    />
                    <Image
                      className="h-8 w-full"
                      height={100}
                      width={100}
                      src={cashOnDelivery}
                      alt="COD"
                    />
                  </label>
                  <label
                    className={`flex items-center gap-2 cursor-pointer border p-2 rounded-md  hover:border-blue-400 duration-500 hover:shadow-blue-200 hover:scale-99 ${
                      field.value === "ssl_card"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      {...field}
                      value="Online"
                      checked={field.value === "Online"}
                    />
                    <Image
                      className="h-8 w-full"
                      height={100}
                      width={100}
                      src={sslPay}
                      alt="SSL Payment"
                    />
                  </label>
                </div>
              </>
            )}
          />
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm">
              {String(errors.paymentMethod?.message)}
            </p>
          )}
        </div>

        {/*Coupon Code */}
        <h2 className="font-bold pt-5">Got any Coupon Code?</h2>
        <div className="flex lg:flex-row flex-col pb-5  gap-4 w-full mt-2">
          <div className="xl:w-[40%] lg:w-[60%]">
            <input
              type="text"
              placeholder="Enter Coupon Code Here"
              className="border border-black/20 p-1.5 rounded focus:border-black focus:outline-none w-full"
              {...register("coupon")}
            />
          </div>
          <div
            onClick={() => handleAddCoupon()}
            className="bg-[#1D4092] py-2 px-10 text-white 2xl:w-[30%] xl:w-[40%] lg:w-[50%] rounded cursor-pointer text-center w-full"
          >
            Add Coupon
          </div>
        </div>

        {/* agree trams and condition */}
        <div className="flex gap-2">
          <input
            type="checkbox"
            {...register("terms", { required: "select terms & conditions" })}
          />

          <label>
            I agree to
            <Link
              href="/terms-condition"
              className="text-[#1D4092] hover:underline hover:text-blue-900"
            >
              Terms & Conditions,
            </Link>
            <Link
              href="/returnPolicy"
              className="text-[#1D4092] hover:underline hover:text-[#1D4092]"
            >
              Refund Policy
            </Link>
            and
            <Link
              href="/privacyPolicy"
              className="text-[#1D4092] hover:underline hover:text-blue-900"
            >
              Privacy Policy
            </Link>
            of Unicrecent.
          </label>
        </div>
        {errors.terms && (
          <span className="text-red-500">{String(errors.terms.message)}</span>
        )}

        <button
          ref={buttonRef}
          type="submit"
          disabled={isSubmitting}
          className={` text-sm font-semibold text-white py-2 w-full mt-8 rounded 
            cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden 
            ${isSubmitting ? " cursor-not-allowed" : ""}
            ${
              startCar === true
                ? "bg-[#ffffff] border border-[#1D4092] "
                : "bg-[#1D4092]"
            }
            `}
        >
          {isSubmitting ? (
            <>
              {/* <span>Processing...</span> */}

              {startCar ? (
                <AnimatePresence>
                  <div className="py-2.5">
                    <motion.div
                      initial={{ x: 30 }}
                      animate={{ x: finalY, scale: 1.1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 2,
                        ease: [0.4, 0, 0.2, 1], // slow start, fast end
                      }}
                      className="absolute left-2 bottom-[6px]"
                    >
                      <Image
                        className="h-8 w-full"
                        height={100}
                        width={100}
                        src={orderGift}
                        alt="order-gift"
                      />
                    </motion.div>
                  </div>
                </AnimatePresence>
              ) : (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                />
              )}
            </>
          ) : (
            "Confirm Order"
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
