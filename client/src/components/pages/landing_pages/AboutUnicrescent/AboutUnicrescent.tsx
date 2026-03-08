import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import about from "@/assets/images/aboutUnicresent.png";
import Image from "next/image";

const AboutUnicrescent = () => {
  return (
    <div className="Container py-12">
      <div className="flex items-center md:flex-nowrap flex-wrap  gap-8">
        <div className="">
          <h2 className="flex items-center  gap-2  font-medium">
            <span className="text-3xl">Unicrescent</span>
            <span>
              <MdArrowForwardIos className="text-2xl mt-1 text-[#5CB85C]" />
            </span>
          </h2>
          <h3 className="text-2xl mt-2">
            Because comfort and confidence go hand in hand
            fffffffffffffffffffffffffff.
          </h3>
          <p className="mt-1 leading-6 text-[#262626]/80">
            We focus on carefully selecting the best clothing that is
            comfortable, looks great, and makes you confident. Apart from the
            fabric, design and fit, we go through strict quality control
            parameters to give you what you truly deserve. The power of a good
            outfit is how it can influence your perception of yourself.
          </p>
        </div>
        <div className="md:w-[50%] w-full">
          <Image
            src={about || null}
            alt="about"
            width={300}
            height={300}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUnicrescent;
