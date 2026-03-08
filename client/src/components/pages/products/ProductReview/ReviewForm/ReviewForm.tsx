"use client";
import { rajdhani } from "@/app/font";
import { addReview } from "@/services/productReview";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaRegStar } from "react-icons/fa";

interface FormData {
  name: string;
  rating: string;
  comment: string;
  status: string;
}

interface ReviewFormProps {
  userRef: string | undefined;
  productRef: string;
}

interface AddReviewResponse {
  status: string;
  message?: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ userRef, productRef }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating.toString(), { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    if (!userRef) {
      toast.error("Please log in first to add a review.");
      return;
    }

    try {
      const review = {
        ...data,
        rating: Number(data.rating),
        userRef,
        productRef,
      };

      const result = (await addReview(review)) as AddReviewResponse;

      if (result?.status === "success") {
        toast.success("Review added successfully");
      } else {
        toast.error(result?.message || "Failed to add review");
      }
    } catch (err) {
      console.error("Failed to add review", err);
      toast.error("Something went wrong while submitting your review.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className={`text-xl font-semibold ${rajdhani.className}`}>
        Add Your Review :
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-4 lg:w-[60%]"
      >
        <div className="pb-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaRegStar
                key={star}
                className={`w-5 h-5 cursor-pointer ${
                  selectedRating >= star
                    ? "fill-[#FFA500] stroke-[#FFA500]"
                    : "stroke-gray-400"
                }`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>

          <input
            type="hidden"
            {...register("rating", { required: "Rating is required" })}
          />

          {errors.rating && (
            <span className="text-red-500 text-sm">
              {String(errors.rating.message)}
            </span>
          )}
        </div>

        <input
          {...register("name", { required: "Name is required" })}
          className="border border-[#262626]/30 outline-none px-4 py-2 rounded"
          type="text"
          placeholder="Your Name.."
        />
        {errors.name && (
          <span className="text-red-500 text-sm">
            {String(errors.name.message)}
          </span>
        )}

        <textarea
          {...register("comment", { required: "Review is required" })}
          className="border border-[#262626]/30 outline-none px-4 py-2 rounded"
          placeholder="Your Review..."
          cols={20}
          rows={10}
        />
        {errors.comment && (
          <span className="text-red-500 text-sm">
            {String(errors.comment.message)}
          </span>
        )}

        <input
          type="submit"
          value="Add Review"
          className="py-2 rounded bg-[#1E3F92] text-white mt-2 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default ReviewForm;
