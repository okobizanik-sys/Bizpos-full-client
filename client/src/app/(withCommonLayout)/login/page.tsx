"use client";
import { loginUser } from "@/services/auth";
// import NavBar from "@/components/pages/header/NavBar/NavBar";
// import { getUser, loginUser } from "@/services/auth";
// import { getCartProducts } from "@/services/cart";
import { TResponse } from "@/types";
// import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// export const metadata: Metadata = {
//   title: "Unicrescent | Login",
//   description: "Best E-commerce platform in BD",
// };

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  // const pathname = usePathname();

  interface FormData {
    email: string;
    phone: string;
    password: string;
    rememberMe?: boolean;
  }

  const onSubmit = async (data: FormData) => {
    const response = (await loginUser(data)) as TResponse;
    if (response?.statusCode === 201) {
      // /forgotpassword/verifyOTP?contact=nasim.okobiz%40gmail.com check if path has forgotpassword than redirect to login page
      // if (pathname.includes("forgotpassword")) {

      //   router.push("/shop");
      //   return;
      // }
      toast.success(response.message || "Login successful");
      // Check if the user is coming from a specific page and redirect accordingly
      router.back();
    }
    toast.error(response.message || "Login successful");
  };

  // const [productsByUser, setProductsByUser] = useState<TResponse | null>(null);
  // const coupon = "";
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const user = await getUser();
  //       const userId = user?.id;
  //       const data = await getCartProducts(userId, coupon);
  //       setProductsByUser(data || []);
  //     } catch (error) {
  //       console.error("Error fetching user or cart:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      {/* <NavBar userCartProducts={productsByUser?.data} /> */}
      <div className="flex flex-col justify-center items-center py-20">
        <div className="w-[350px] lg:w-[600px]">
          <div className="border-b-1 border-black/20 text-center pb-3 mb-5">
            <h2 className="text-3xl font-bold">Sign In</h2>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email Field */}
            {/* <div className="flex flex-col">
              <label htmlFor="email" className="pb-2">
                E-Mail Address/Phone Number
              </label>
              <input
                type="text"
                placeholder="Email/Number"
                className="border border-black/20 p-1.5 rounded"
                {...register("email", { required: "Email/Phone is required" })}
              />
              {errors.email && (
                <span className="text-red-500">
                  {String(errors.email.message)}
                </span>
              )}
            </div> */}

            <input
              type="text"
              placeholder="Email/Number"
              className="border border-black/20 p-1.5 rounded"
              {...register("email", {
                required: "Email/Phone is required",
                validate: (value) => {
                  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                  const isPhone = /^\d{10,15}$/.test(value); // basic phone check (adjust as needed)
                  if (!isEmail && !isPhone) {
                    return "Enter a valid email or phone number";
                  }
                  return true;
                },
              })}
            />

            {/* Password Field */}
            <div className="flex flex-col">
              <label htmlFor="password" className="pb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="border border-black/20 p-1.5 rounded focus:border-black focus:outline-none "
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-500">
                  {String(errors.password.message)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="border-2"
                {...register("rememberMe")}
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember Me
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className=" button-primary">
              Login
            </button>
          </form>
          <div className="flex justify-center  gap-2 mt-4 text-md">
            <div className="mt-2 text-center  ">
              <Link
                href="/forgotpassword"
                className="text-blue-500 pr-1 hover:underline"
              >
                Forgot Your Password?
              </Link>{" "}
              |
            </div>
            <div className="mt-2 text-center">
              <Link href="/register" className="text-blue-500  hover:underline">
                Registration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
