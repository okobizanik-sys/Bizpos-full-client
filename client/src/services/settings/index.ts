import { bizposBaseUrl, resolveBizposMediaUrl } from "@/config/config";

type TPublicSettings = {
  logo_image_url?: string | null;
};

export const getBizposLogoUrl = async (): Promise<string> => {
  try {
    const res = await fetch(`${bizposBaseUrl}/api/settings`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!res.ok) return "";

    const payload = (await res.json()) as TPublicSettings;
    return resolveBizposMediaUrl(payload?.logo_image_url);
  } catch {
    return "";
  }
};

