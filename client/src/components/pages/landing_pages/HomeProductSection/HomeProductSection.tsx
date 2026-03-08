import { TProduct } from "@/types";
import ProductBannerCard from "../../products/ProductBannerCard/ProductBannerCard";
import ProductCard from "../../products/ProductCard/ProductCard";

interface ProductsProps {
  products: {
    category: TProduct;
    result: TProduct[];
  };
}

const HomeProductSection: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="Container py-8">
      <div className="grid  lg:grid-rows-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="md:row-span-1 lg:row-span-2 col-span-2 md:col-span-1 lg:col-span-2">
          {products?.category && (
            <ProductBannerCard product={products.category} />
          )}
        </div>

        {products.result.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeProductSection;
