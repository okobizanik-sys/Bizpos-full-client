import ContactFrom from "@/components/pages/contact/ContactFrom";
// import NavBar from "@/components/pages/header/NavBar/NavBar";
// import { getUser } from "@/services/auth";
// import { getCartProducts } from "@/services/cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unicrescent | Contact",
  description: "Best E-commerce platform in BD",
};

const Contact = async () => {
  // const user = await getUser();
  // const userId = user?.id;
  // const coupon = "";
  // const products = await getCartProducts(userId, coupon);
  return (
    <>
      {/* <NavBar userCartProducts={products?.data} /> */}
      <div className="py-6 px-4">
        <div className="text-2xl lg:text-4xl text-center font-bold mt-14 lg:mt-0 mb-3 lg:mb-6">
          Contact Us
        </div>
        <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-10 space-y-10 lg:space-y-0 lg:px-10 max-w-7xl mx-auto">
          <div className="flex-1">
            <ContactFrom></ContactFrom>
          </div>
          <div className="flex-1">
            <div className="text-xl">Our Information</div>
            <div className="mt-2">
              <div className="font-bold">Address:</div>
              <div>Dhaka, Bangladesh</div>
            </div>
            <div className="mt-2">
              <span className="font-bold">Hotline: </span> +8801805112114
            </div>
            <div className="mt-2">
              <span className="font-bold">Email: </span> support@unicrescent.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
