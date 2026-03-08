"use server";
import { apiRequest } from "@/lib/apiRequest";

import { TCorrelation, TResponse, TUser } from "@/types";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export const loginUser = async (credentials: {
  email: string;
  phone: string;
  password: string;
  rememberMe?: boolean;
}) => {
  const result: TResponse = await apiRequest({
    endpoint: "/auth/signin",
    method: "POST",
    body: credentials,
  });

  if (result?.data?.accessToken) {
    const { accessToken, refreshToken, user } = result.data;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return result;
};

export const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('user');

  return { success: true, message: "Logged out successfully" };
};

// export const getUser = async () => {
//   const cookieStore = cookies();
//   const cookie = (await cookieStore).get("user");
//   const user: TUser | null = cookie?.value ? JSON.parse(cookie.value) : null;
//   return user;
// };

export const setCorrelation = async () => {
  const cookieStore = cookies();

  const existingCorrelation = (await cookieStore).get("correlation");

  if (existingCorrelation) {
    try {
      return JSON.parse(existingCorrelation.value);
    } catch (error) {
      console.error("Failed to parse existing correlation cookie:", error);
    }
  }

  const correlation: TCorrelation = {
    id: uuidv4(),
    name: "",
    email: "",
    roleRef: "",
    role: "user",
    warehouseRef: null,
    warehouse: null,
  };

  (await cookieStore).set("correlation", JSON.stringify(correlation), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return correlation;
};


export const getUser = async (): Promise<TUser | TCorrelation | null> => {
  const cookieStore = cookies();

  const userCookie = (await cookieStore).get("user");
  if (userCookie?.value) {
    return JSON.parse(userCookie.value);
  }

  const correlationCookie = (await cookieStore).get("correlation");
  if (correlationCookie?.value) {
    return JSON.parse(correlationCookie.value);
  }

  return null;
};

export const registrationUser = async (credentials: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    const response = await apiRequest({
      endpoint: "/auth/singup",
      method: "POST",
      body: credentials,
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
// forget-password
export const forgetPasswordOTPSender = async (credentials: {
  email: string;
  phone: string;
}) => {
  try {
    const response = await apiRequest({
      endpoint: "/auth/forget-password",
      method: "POST",
      body: credentials,
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const verifyOTPAndSetPassword = async (credentials: {
  email: string;
  phone: string;
  otp: string;
  password: string;
}) => {
  try {
    const response = await apiRequest({
      endpoint: "/auth/forget-password/otp-verification",
      method: "POST",
      body: credentials,
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

