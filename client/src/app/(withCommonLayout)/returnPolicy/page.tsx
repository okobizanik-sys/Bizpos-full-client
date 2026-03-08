// import NavBar from "@/components/pages/header/NavBar/NavBar";
// import { getUser } from "@/services/auth";
// import { getCartProducts } from "@/services/cart";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Unicrescent | Return Policy",
  description: "Best E-commerce platform in BD",
};

const ReturnPolicy = async() => {
  // const user = await getUser();
  // const userId = user?.id;
  // const coupon = "";
  // const products = await getCartProducts(userId, coupon);
  return (
    <>
    {/* <NavBar  userCartProducts ={ products?.data}/> */}
      <div className="Container py-10 ">
        <div className="flex flex-col gap-2 lg:gap-4">
          <div className="text-2xl lg:text-4xl font-semibold text-[#262626] text-center mt-14 lg:mt-0">
            Return & Replacement Policy
          </div>

          <div className="policy-page-text ">
            UniCrescent considers each of our customers to be a part of our
            family. Ensuring and encouraging the bond of trust with the
            customers UniCrescent brings you option to return the products you
            got (If the product is damaged or designed mistakenly.). In that
            case UniCrescent will give you fresh products in return.
          </div>

          <div className="policy-page-text ">
            If for any reason you are unsatisfied with your order, you may
            return it as long as your item meets the following criteria:
          </div>

          <div className="policy-page-text ">
            <ul className="policy-page-li">
              <li>
                To request return or replacement of an item, please inform us
                within 72 hours from the date you received it.
              </li>
              <li>
                Items will NOT be exchanged or returned if a request is made
                after 72 hours.
              </li>
              <li>
                All items to be returned or exchanged must be unused and in
                their original condition with all original tags and packaging
                intact and should not be broken or tampered with.
              </li>
              <li>
                If the item came with a free promotional item, the free item
                must also be returned.
              </li>
              <li>
                Refund/ replacement for products are subject to inspection and
                checking by UniCrescent team.
              </li>
              <li>
                Replacement is subject to availability of stock with the
                Supplier. If the product is out of stock, you will receive a
                full refund, no questions asked.
              </li>
              <li>
                Please note that the Cash on Delivery convenience charge and the
                shipping charge would not be included in the refund value of
                your order as these are non-refundable charges.
              </li>
            </ul>
          </div>

          <div className="policy-page-text ">
            We may also collect the following information -
            <ul className="policy-page-li">
              <li>About the pages you visit/access.</li>
              <li>The links you click on our site.</li>
              <li>The number of times you access the page.</li>
              <li>ZIP/Postal code.</li>
              <li>The number of times you have shopped on our web site.</li>
            </ul>
          </div>

          <div className="policy-page-text">
            <div>Reasons for returns & replacement</div>
            <ul className="policy-page-li">
              <li>Product is damaged, defective or not as described.</li>
              <li>Size Mismatch for clothing.</li>
              <li>Color Mismatch for clothing.</li>
              <li>Wrongly Printed clothing.</li>
              <li>Wrong product sent.</li>
            </ul>
          </div>

          <div className="policy-page-text">
            <div className="policy-page-head">How to return:</div>
            <div>
              Contact UniCrescent Customer Care team by emailing
              support@unicrescent.com within 72 hours after receiving your
              order.
            </div>
            <div>
              Once we pick up or receive your return, we will do a quality check
              of the product at our end and if the reason for return is valid,
              we will replace the product with a new one or we will proceed with
              the refund.
            </div>
          </div>

          <div className="policy-page-text">
            <div>Refund Policy</div>
            <ul className="policy-page-li">
              <li>
                The refund will be processed after we have completed evaluating
                your return.
              </li>
              <li>
                Replacement is subject to availability of stock with the
                Supplier. If the product is out of stock, you will receive a
                full refund, no questions asked.
              </li>
              <li>
                Please note that the Cash on Delivery convenience charge and the
                shipping charge would not be included in the refund value of
                your order as these are non-refundable charges.
              </li>
              <li>
                If you have selected Cash on Delivery (COD), there is no amount
                to refund because you haven't paid for your order.
              </li>
              <li>
                For payments made using a Credit Card, Debit Card, Mobile
                Banking or Bank Transfer, you will receive a refund in your
                respective.
              </li>
              <li>
                If online payment is made once more due to technical error,
                payment refund will be made.
              </li>
              <li>
                You will receive a refund anytime between 7-10 working days. If
                you don't receive refund within this time, please write to us at
                support@unicrescent.com and we shall investigate.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicy;
