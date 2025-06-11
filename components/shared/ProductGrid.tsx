import { IProduct } from "@/types/product";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: IProduct[];
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
};

const ProductGrid = ({
  products,
  title,
  subtitle,
  emptyMessage = "No products found",
}: ProductGridProps) => {
  return (
    <div className="w-full">
      {title && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
