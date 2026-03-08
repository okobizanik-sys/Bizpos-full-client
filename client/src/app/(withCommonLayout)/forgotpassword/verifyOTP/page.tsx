"use client";
import {  verifyOTPAndSetPassword } from "@/services/auth";
import { TResponse } from "@/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
// import { getCartProducts } from "@/services/cart";
// import NavBar from "@/components/pages/header/NavBar/NavBar";

type FormValues = {
    contact: string;
    otp: string;
    password: string;
    confirmPassword: string;
};

const VerifyOTP = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const contactFromQuery = searchParams.get("contact") || "";

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>();

    const password = watch("password");

    useEffect(() => {
        if (contactFromQuery) {
            setValue("contact", contactFromQuery);
        }
    }, [contactFromQuery, setValue]);



    const onSubmit = async ({ contact, otp, password }: FormValues) => {
        const value = contact.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        const payload: { email?: string; phone?: string } = {};
        if (emailRegex.test(value)) {
            payload.email = value;
        } else if (phoneRegex.test(value)) {
            payload.phone = value;
        } else {
            toast.error("Please enter a valid email or 10-digit phone number.");
            return;
        }

        const otpPayload = {
            email: payload.email || "",
            phone: payload.phone || "",
            otp: otp.trim(),
            password: password.trim(),
        };

        try {
            setLoading(true);
            const result = (await verifyOTPAndSetPassword(otpPayload)) as TResponse;

            if (result.status === "success") {
                toast.success("Password reset successfully.");
                router.push("/login");
            } else {
                toast.error(result.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    // const [productsByUser, setProductsByUser] = useState<TResponse | null>(null);

    // const coupon = "";
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //     //   const user = await getUser();
    //     //   const userId = user?.id;
    //     //   const  data  = await getCartProducts(userId, coupon);
    //     //   setProductsByUser(data || []);
    //     } catch (error) {
    //       console.error("Error fetching user or cart:", error);
    //     }
    //   };
  
    //   fetchData();
    // }, []);



    return (
        <>
         {/* <NavBar  userCartProducts ={ productsByUser?.data}/> */}

        <div className="flex justify-center items-center py-20">
            <div className="w-[350px] lg:w-[600px]">
                <div className="border-b border-black/20 text-center pb-3 mb-5">
                    <h2 className="text-3xl font-bold">Reset Password</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Contact Field */}
                    <div className="flex flex-col">
                        <label className="pb-2">E-Mail Address / Phone Number</label>
                        <input
                            type="text"
                            placeholder="Email or Phone"
                            className="border border-black/20 p-2 rounded bg-gray-100"
                            disabled
                            {...register("contact", {
                                validate: (val) => {
                                    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                    const phone = /^[0-9]{10}$/;
                                    if (!val?.trim()) return "This field is required";
                                    if (!email.test(val) && !phone.test(val))
                                        return "Enter a valid email or 10-digit phone number";
                                    return true;
                                },
                            })}
                        />
                    </div>

                    {/* OTP Field */}
                    <div className="flex flex-col">
                        <label className="pb-2">OTP</label>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="border border-black/20 p-2 rounded"
                            {...register("otp", {
                                required: "OTP is required",
                                pattern: {
                                    value: /^[0-9]{4}$/,
                                    message: "Enter a valid 6-digit OTP",
                                },
                            })}
                        />
                        {errors.otp && (
                            <span className="text-red-500 text-sm">{errors.otp.message}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label className="pb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="border border-black/20 p-1.5 rounded w-full pr-10 focus:border-black focus:outline-none"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {showPassword ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col">
                        <label className="pb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="border border-black/20 p-1.5 rounded w-full pr-10 focus:border-black focus:outline-none"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {showConfirmPassword ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <span className="text-red-500 text-sm">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-500 text-white p-2 rounded-md ${loading ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Please wait..." : "Reset Password"}
                    </button>
                </form>

                <div className="flex justify-center gap-2 mt-4 text-md">
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>{" "}
                    |
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Registration
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
};

export default VerifyOTP;
