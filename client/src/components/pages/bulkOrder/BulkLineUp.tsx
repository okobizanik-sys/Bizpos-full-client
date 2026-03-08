import product1 from "@/assets/images/101.jpg";
import product2 from "@/assets/images/102.jpg";
import product3 from "@/assets/images/103.jpg";
import product4 from "@/assets/images/104.jpg";
import product5 from "@/assets/images/105.jpg";
import product6 from "@/assets/images/106.jpg";
import product7 from "@/assets/images/107.jpg";
import product8 from "@/assets/images/108.jpg";
import product9 from "@/assets/images/109.jpg";
import product10 from "@/assets/images/110.jpg";
import product11 from "@/assets/images/111.jpg";
import product12 from "@/assets/images/112.jpg";
import Image from "next/image";

const BulkLineUp = () => {
  const products = [
    { id: 1, type: "T-shirt", image: product1, alt: "Custom Product 1" },
    { id: 2, type: "Polo T-shirt", image: product2, alt: "Custom Product 2" },
    {
      id: 3,
      type: "Hoodie/Sweatshirt",
      image: product3,
      alt: "Custom Product 3",
    },
    {
      id: 4,
      type: "Sports/Dyesub Tshirt",
      image: product4,
      alt: "Custom Product 4",
    },
    { id: 5, type: "Jacket", image: product5, alt: "Custom Product 5" },
    { id: 6, type: "Shirt", image: product6, alt: "Custom Product 6" },
    { id: 7, type: "Cap/Hat", image: product7, alt: "Custom Product 7" },
    {
      id: 8,
      type: "Certified Face Mask",
      image: product8,
      alt: "Custom Product 8",
    },
    { id: 9, type: "Water Bottle", image: product9, alt: "Custom Product 9" },
    { id: 10, type: "Pants", image: product10, alt: "Custom Product 10" },
    { id: 11, type: "Wallet", image: product11, alt: "Custom Product 11" },
    { id: 12, type: "Socks", image: product12, alt: "Custom Product 12" },
  ];
  return (
    <div>
      <div className="container text-2xl uppercase grid grid-cols-3 mx-auto">
        <div className="col-span-1"></div>
        <div className="col-span-1 bg-[#d8f8f0] skew-x-[-20deg] skew-y-[360deg] border-l-[10px] border-l-[#00aeef] border-r-[10px] border-r-[#fbb03b] p-2">
          <div className="skew-x-[20deg] skew-y-[0deg] text-3xl text-center leading-[1.9rem] font-[400]">
            Product Lineup
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
      <div>
        <div className="container grid grid-cols-2 lg:grid-cols-6 mx-auto mt-10 gap-10">
          {products.map((product) => (
            <div
              className="relative h-52 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)] rounded-[5px]"
              key={product.id}
            >
              <Image
                className="h-full p-12"
                src={product.image}
                alt={product.alt}
              />
              <div className="absolute top-0 left-0 right-0 w-full text-center">
                <span className="text-sm border-t-[10px] border-t-[#d8f8f0] px-2 inline-block">
                  {product.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulkLineUp;
