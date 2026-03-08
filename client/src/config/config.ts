const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
export const apiBaseUrl: string = fromEnv || "http://localhost:3000/api/v1";
const appFromEnv = process.env.NEXT_PUBLIC_BIZPOS_BASE_URL?.trim();
export const bizposBaseUrl: string =
  appFromEnv || apiBaseUrl.replace(/\/api\/v1\/?$/, "");
export const bizposPosUrl: string = `${bizposBaseUrl}/pos/public`;

export const getBizposPosUrl = (userId?: string): string => {
  if (!userId) return bizposPosUrl;
  return `${bizposPosUrl}?userId=${encodeURIComponent(userId)}`;
};

export const resolveBizposMediaUrl = (path?: string | null): string => {
  if (!path) return "";
  const value = String(path).trim();
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `${bizposBaseUrl}${value}`;
  return `${bizposBaseUrl}/${value}`;
};
