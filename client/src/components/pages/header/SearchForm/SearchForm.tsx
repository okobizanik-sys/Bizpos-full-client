"use client";

import { resolveBizposMediaUrl } from "@/config/config";
import { getSearchProducts } from "@/services/products";
import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";

interface ResponsiveSearchFormProps {
  onClose: () => void;
}

const SearchForm: React.FC<ResponsiveSearchFormProps> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // <-- loader state

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data } = await getSearchProducts({ search: query });
        setProducts(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {}, 100);
    fetchSearchResults();
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="flex flex-col items-center gap-6">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="2xl:w-[60vh] xl:w-[50vh] lg:w-[38vh] w-[52vh] border relative border-[#262626]/50 flex items-center justify-between px-4 py-2 rounded"
      >
        <input
          className="outline-none w-full"
          type="text"
          placeholder="Search products by title or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <GoSearch className="text-xl text-[#262626]/50 font-semibold" />
        </button>
      </form>
      {products?.length > 0 && (
        <div className="w-full xl:w-[65%] lg:w-[50%] absolute lg:top-[80px] top-[160px] flex flex-col gap-2 bg-[#fff] rounded p-8 border border-[#262626]/10 shadow">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p> // <-- loader
          ) : products?.length > 0 ? (
            products?.slice(0, 12).map((product: TProduct) => (
              <div key={product._id} onClick={() => setQuery("")}>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div>
                    {product?.thumbnailImage && (
                      <Image
                        src={resolveBizposMediaUrl(product?.thumbnailImage)}
                        alt="image"
                        width={30}
                        height={30}
                        className="rounded"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-base capitalize hover:underline duration-300">
                      {product.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : query.trim() ? (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
