import { apiBaseUrl } from "@/config/config";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions<T = unknown> {
  endpoint: string;
  method?: RequestMethod;
  body?: T;
  headers?: HeadersInit;
}

export const apiRequest = async <T = unknown>({
  endpoint,
  method = "GET",
  body,
  headers = {},
}: ApiRequestOptions): Promise<T> => {
  try {
    const res = await fetch(`${apiBaseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(typeof body !== "undefined" ? { body: JSON.stringify(body) } : {}),
    });

    const result = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        status: "error",
        statusCode: res.status,
        message: result?.message || "Request failed",
        data: null,
      } as T;
    }

    return result as T;
  } catch (error: any) {
    return {
      status: "error",
      statusCode: 500,
      message: error?.message || "Network error",
      data: null,
    } as T;
  }
};
