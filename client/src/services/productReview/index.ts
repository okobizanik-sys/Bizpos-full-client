"use server";

import { apiRequest } from "@/lib/apiRequest";

export const addReview = async (review: {
  name: string;
  rating: number;
  comment: string;
  userRef: string | undefined;
  productRef: string;
}) => {
  const res = await apiRequest({
    endpoint: "/product-review",
    method: "POST",
    body: review,
  });
  return res;
};

export const getPaginatedReviews = async (
  page: number = 1,
  limit: number = 10
) => {
  const res = await apiRequest({
    endpoint: `/product-review/pagination?page=${page}&limit=${limit}`,
    method: "GET",
  });
  if ((res as any)?.status === "error") {
    return {
      status: "error",
      statusCode: 500,
      message: "Failed to fetch reviews",
      data: {
        pagination: {
          currentPage: page,
          currentPageLimit: limit,
          total: 0,
          totalPage: 1,
          prevPage: null,
          nextPage: null,
        },
        result: [],
      },
    };
  }
  return res;
};

// export const getPaginatedReviews = async (
//   page: number = 1,
//   limit: number = 10
// ): Promise<TProductReviewsResponse> => {
//   const res = await fetch(
//     `/product-review/pagination?page=${page}&limit=${limit}`
//   );
//   const data = await res.json();
//   return data;
// };
