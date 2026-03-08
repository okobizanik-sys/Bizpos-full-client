// "use client";

// import React, { useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import Image from "next/image";
// import "swiper/css";
// import "swiper/css/navigation";

// import product1 from "@/assets/images/1.jpg";
// import product2 from "@/assets/images/2.jpg";
// import product3 from "@/assets/images/3.jpg";
// import product4 from "@/assets/images/4.jpg";
// import product5 from "@/assets/images/5.jpg";
// import product6 from "@/assets/images/6.jpg";
// import product7 from "@/assets/images/7.jpg";
// import product8 from "@/assets/images/8.jpg";
// import product9 from "@/assets/images/9.jpg";
// import product10 from "@/assets/images/10.jpg";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// const BulkCustom = () => {
//   const swiperRef = useRef(null);
//   const products = [
//     { id: 1, image: product1, alt: "Custom Product 1" },
//     { id: 2, image: product2, alt: "Custom Product 2" },
//     { id: 3, image: product3, alt: "Custom Product 3" },
//     { id: 4, image: product4, alt: "Custom Product 4" },
//     { id: 5, image: product5, alt: "Custom Product 5" },
//     { id: 6, image: product6, alt: "Custom Product 6" },
//     { id: 7, image: product7, alt: "Custom Product 7" },
//     { id: 8, image: product8, alt: "Custom Product 8" },
//     { id: 9, image: product9, alt: "Custom Product 9" },
//     { id: 10, image: product10, alt: "Custom Product 10" },
//   ];
//   return (
//     <div className=" my-10">
//       <div className="text-center">
//         <h2 className="text-3xl font-medium">
//           Sustainable Custom Merchandise & Corporate Gift Solutions
//         </h2>
//         <p className="mt-5 max-w-3xl mx-auto">
//           We specialize in providing sustainable, budget-friendly, and top-tier
//           custom merchandise solutions.
//         </p>
//       </div>

//       {/* Slider with Arrows */}
//       <div className="mt-12 px-4 mx-auto container relative h-52">
//         <Swiper
//           onSwiper={(swiper) => {
//             swiperRef.current = swiper;
//           }}
//           slidesPerView={1}
//           spaceBetween={20}
//           loop={true}
//           autoplay={{
//             delay: 3000,
//             pauseOnMouseEnter: true,
//           }}
//           navigation={{
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//           }}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 4 },
//             1280: { slidesPerView: 7 },
//           }}
//           modules={[Autoplay, Navigation]}
//           className="product-slider h-full "
//         >
//           {products.map((product) => (
//             <SwiperSlide key={product.id}>
//               <div className="relative aspect-square rounded-lg overflow-hidden">
//                 <Image
//                   src={product.image}
//                   alt={product.alt}
//                   fill
//                   className="object-cover hover:scale-105 transition-transform duration-500"
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <div onClick={() => swiperRef.current?.slidePrev()} className="after:hidden absolute -left-10 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black rounded-full shadow-md flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
//           <FiChevronLeft className="w-7 h-7 text-white" />
//         </div>
//         <div onClick={() => swiperRef.current?.slideNext()} className="after:hidden absolute -right-10 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black rounded-full shadow-md flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
//           <FiChevronRight className="w-7 h-7 text-white" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulkCustom;
