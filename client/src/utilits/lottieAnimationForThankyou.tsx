"use client"
import Lottie from "lottie-react";
import Link from "next/link";
import animationData from "@/assets/animation/thank-you-check.json";



const LottieAnimationForThankyou = () => {
  
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center space-y-6 mt-12 lg:mt-0">
    <Lottie
      animationData={animationData}
      className="h-[120px] lg:h-[200px]"
      loop={true}
    />
    <h1 className="text-3xl font-bold text-gray-800">Thank You!</h1>
    <p className="text-gray-600 text-lg">
      Your submission has been received successfully.
    </p>
    <Link
      href="/shop"
      className="inline-block bg-secondary text-white font-semibold px-6 py-2 rounded hover:bg-primary transition duration-300"
    >
      Back to Shop
    </Link>
  </div>
  );
};

export default LottieAnimationForThankyou;
