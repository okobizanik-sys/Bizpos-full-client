import React from "react";
import { HiXMark } from "react-icons/hi2";
import SearchForm from "../SearchForm/SearchForm";
import { motion } from "framer-motion";
interface ResponsiveSearchFormProps {
  onClose: () => void;
}
const ResponsiveSearchForm: React.FC<ResponsiveSearchFormProps> = ({
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 bg-[#262626] w-full h-screen z-[100]"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }} // Starts slightly lower
        animate={{ y: 0, opacity: 1 }} // Moves up smoothly
        exit={{ y: 30, opacity: 0 }} // Moves back down on exit
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full bg-[#fff] py-8 md:h-[20%] flex items-center justify-center flex-col gap-8"
      >
        <div
          className="text-center cursor-pointer hover:scale-115 duration-300"
          onClick={onClose}
        >
          <HiXMark className="text-2xl" />
        </div>
        <div className="">
          <SearchForm onClose={onClose} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResponsiveSearchForm;
