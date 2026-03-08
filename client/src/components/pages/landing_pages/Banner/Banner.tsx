import { getAllBanners } from "@/services/banners";
import BannerSlider from "@/slider/BannerSlider/BannerSlider";
import { TBanner } from "@/types";
import React from "react";

interface BannerProps {
  banners: TBanner[];
}
const Banner: React.FC<BannerProps> = async () => {
  const { data: banners } = await getAllBanners();

  const mainBanner = banners?.filter(
    (banner: { type: string }) => banner.type === "MAIN BANNER"
  );

  return (
    <div className="mt-[60px] lg:mt-0">
      <BannerSlider banners={mainBanner} />
    </div>
  );
};

export default Banner;
