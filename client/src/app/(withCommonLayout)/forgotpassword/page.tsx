"use client"
// import NavBar from '@/components/pages/header/NavBar/NavBar';
// import { getCartProducts } from '@/services/cart';
// import React, { useEffect, useState } from 'react';
import { forgetPasswordOTPSender } from '@/services/auth';
import { TResponse } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<{ contact: string }>();

    const onSubmit = async ({ contact }: { contact: string }) => {
        const value = contact.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const payload: { email: string; phone: string } = { email: "", phone: "" };
        if (emailRegex.test(value)) {

            payload.email = value;
        } else if (phoneRegex.test(value)) {
            payload.phone = value;

        } else {
            return;
        }
        const result = await forgetPasswordOTPSender(payload) as TResponse;

        if (result.status === "success") {
            toast.success(result.status);
            router.push(`/forgotpassword/verifyOTP?contact=${encodeURIComponent(value)}`);
        } else {
            toast.success(result.status);
        }
    };


    // const [productsByUser, setProductsByUser] = useState<TResponse | null>(null);

    // const coupon = "";

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const user = await getUser();
    //             const userId = user?.id;
    //             const data = user ? await getCartProducts(userId, coupon) : null;
    //             setProductsByUser(data || []);
    //         } catch (error) {
    //             console.error("Error fetching user or cart:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    return (
        <>
            {/* <NavBar userCartProducts={productsByUser?.data} /> */}

            <div className="flex justify-center items-center py-20 h-[60vh]">
                <div className="w-[350px] lg:w-[600px]">
                    <div className="border-b border-black/20 text-center pb-3 mb-5">
                        <h2 className="text-3xl font-bold">Forgot Password</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="pb-2">E-Mail Address / Phone Number</label>
                            <input
                                type="text"
                                placeholder="Email or Phone"
                                className="border border-black/20 p-2 rounded"
                                {...register("contact", {
                                    validate: value => {
                                        const val = value.trim();
                                        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                        const phone = /^[0-9]{11}$/;
                                        if (!val) return "This field is required";
                                        if (!email.test(val) && !phone.test(val)) return "Enter a valid email or 10-digit phone";
                                        return true;
                                    }
                                })}
                            />
                            {errors.contact && <span className="text-red-500 text-sm">{errors.contact.message}</span>}
                        </div>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Send OTP!</button>
                    </form>
                    <div className="flex justify-center gap-2 mt-4 text-md">
                        <Link href="/login" className="text-blue-500 hover:underline">Login</Link> |
                        <Link href="/register" className="text-blue-500 hover:underline">Registration</Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ForgetPassword;
