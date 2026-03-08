// import { TMenuItem } from "@/types";
// import Link from "next/link";
// import React from "react";

// type DropDownMenuProps = {
//   menu: TMenuItem;
// };

// const DropDownMenu: React.FC<DropDownMenuProps> = ({ menu }) => {

//   return (
//     <div className="z-[999] relative bg-[#fff] w-full">
//       <div className="w-full border border-[#262626]/50 rounded flex flex-wrap pb-5 pl-1">
//         {menu?.map((item, index) => {
//           return (
//             <div key={index} className="w-[200px] ml-2 my-2">
//               <h3 className="font-bold text-lg capitalize">
//                 <Link href={`/shop?category=${item.slug}`}>{item.name}</Link>
//               </h3>
//               <ul className="mt-2 flex flex-col gap-1">
//                 {item.subCategories.map((subItem, subIndex) => (
//                   <li
//                     key={subIndex}
//                     className="text-gray-500 hover:text-gray-700 hover:underline cursor-pointer duration-300 xl:text-base text-sm"
//                   >
//                     <Link href={`/shop?subCategory=${subItem.slug}`}>
//                       {subItem.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DropDownMenu;

// DropDownMenu.tsx

import { TMenuItem } from "@/types";
import Link from "next/link";
import React from "react";

type DropDownMenuProps = {
  menu: TMenuItem; // now correctly typed as an array
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({ menu }) => {
  return (
    <div className="z-[999] relative mt-4 bg-[#fff] w-full">
      <div className="w-full border border-[#262626]/50 rounded flex flex-wrap pb-5 pl-1">
        {menu.map((item, index) => (
          <div key={index} className="w-[200px] ml-2 my-2">
            <h3 className="font-bold text-lg capitalize">
              <Link href={`/shop?category=${item.slug}`}>{item.name}</Link>
            </h3>
            <ul className="mt-2 flex flex-col gap-1">
              {item.subCategories.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className="text-gray-500 hover:text-gray-700 hover:underline cursor-pointer duration-300 xl:text-base text-sm"
                >
                  <Link href={`/shop?subCategory=${subItem.slug}`}>
                    {subItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDownMenu;
