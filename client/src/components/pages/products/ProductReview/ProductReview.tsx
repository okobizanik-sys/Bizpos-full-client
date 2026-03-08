import { rajdhani } from "@/app/font";
import React from "react";
import user from "@/assets/images/reviewUser.png";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { IoStarHalf } from "react-icons/io5";
import ReviewForm from "./ReviewForm/ReviewForm";
import { getPaginatedReviews } from "@/services/productReview";
import { TProductReviewsResponse, TReview } from "@/types";

interface ProductReviewProps {
  userRef: string | undefined;
  productRef: string;
}

const ProductReview = async ({ userRef, productRef }: ProductReviewProps) => {
  // const reviews = await getPaginatedReviews(1, 4);
  const reviews = (await getPaginatedReviews(1, 4)) as TProductReviewsResponse;


  return (
    <div className="mt-12 Container">
      <h2
        className={`text-xl font-semibold border-b pb-3 ${rajdhani.className}`}
      >
        Product Review
      </h2>

      <div className="mt-8">
        <div className="flex flex-col gap-4">
          {reviews?.data?.result?.length ? (
            reviews.data.result.map((review: TReview) => (
              <div key={review._id}>
                <div className="flex items-center gap-2">
                  <div className="md:w-[40px] w-[30px] border border-[#262626]/50 p-1 rounded">
                    <Image
                      src={user}
                      alt="user"
                      width={60}
                      height={60}
                      className="w-full h-full rounded"
                    />
                  </div>
                  <div>
                    <p className="font-semibold md:text-base text-sm capitalize">
                      {review.name}
                    </p>
                    <div className="flex items-center gap-1 text-[#FFA500] md:text-base text-sm">
                      {Array.from({ length: 5 }, (_, i) => {
                        const fullStars = Math.floor(review.rating);
                        const hasHalfStar = review.rating - fullStars >= 0.5;

                        if (i < fullStars) {
                          return <IoIosStar key={i} />;
                        } else if (i === fullStars && hasHalfStar) {
                          return <IoStarHalf key={i} />;
                        } else {
                          return <IoIosStar key={i} className="opacity-30" />;
                        }
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mt-2 lg:w-[60%] text-[#262626]/80 border-b pb-2 border-[#262626]/20">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      </div>

      <ReviewForm userRef={userRef} productRef={productRef} />
    </div>
  );
};

export default ProductReview;
