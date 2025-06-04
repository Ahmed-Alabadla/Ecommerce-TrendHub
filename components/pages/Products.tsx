"use client";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBrands } from "@/hooks/useBrand";
import { useCategories } from "@/hooks/useCategory";
import { useInfiniteProducts } from "@/hooks/useProduct";
import { useSubcategories } from "@/hooks/useSubcategory";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CardSkeleton from "../shared/CardSkeleton";
export default function Products() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const brand = searchParams.get("brand");

  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Initialize filters from URL params
  useEffect(() => {
    if (category) setSelectedCategories([category]);
    if (subcategory) setSelectedSubcategories([subcategory]);
    if (brand) setSelectedBrands([brand]);
  }, [category, subcategory, brand]);

  // Convert sortBy value to API format
  const getSortByValue = (value: string) => {
    switch (value) {
      case "newest":
        return "createdAt";
      case "price-low":
      case "price-high":
        return "price";
      case "rating":
        return "ratingsAverage";
      default:
        return "createdAt";
    }
  };
  const getSortOrder = (value: string) => {
    switch (value) {
      case "price-low":
        return "ASC";
      case "newest":
      case "price-high":
      case "rating":
        return "DESC";
      default:
        return "DESC";
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleSubcategoryChange = (subcategory: string, checked: boolean) => {
    if (checked) {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    } else {
      setSelectedSubcategories(
        selectedSubcategories.filter((sc) => sc !== subcategory)
      );
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("category");
    newParams.delete("subcategory");
    newParams.delete("brand");

    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSubcategories([]);
    setSortBy("newest");

    router.push(`?${newParams.toString()}`);
  };

  // =========== Categories ===========
  const { data: categories } = useCategories();
  // =========== Subcategories ===========
  const { data: subcategories } = useSubcategories();
  // =========== brands ===========
  const { data: brands } = useBrands();

  // =========== Products ===========
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProducts({
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    subcategories:
      selectedSubcategories.length > 0 ? selectedSubcategories : undefined,
    brands: selectedBrands.length > 0 ? selectedBrands : undefined,
    limit: 10,
    sortBy: getSortByValue(sortBy),
    sortOrder: getSortOrder(sortBy),
  });

  // Flatten all products from pages
  const allProducts = products?.pages.flatMap((page) => page.data) ?? [];
  const totalCount = products?.pages[0]?.meta.total ?? 0;

  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          All Products
        </h1>
        <p className="text-muted-foreground">
          Discover our complete collection
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          {/* Categories */}
          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4 text-foreground">Categories</h3>
            <div className="space-y-3">
              {categories?.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.slug}
                    checked={selectedCategories.includes(category.slug)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.slug, checked as boolean)
                    }
                    className="size-[18px] dark:border-gray-500"
                  />
                  <label
                    htmlFor={category.slug}
                    className="text-sm cursor-pointer text-muted-foreground"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sub Categories */}
          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4 text-foreground">
              Sub Categories
            </h3>
            <div className="space-y-3">
              {subcategories?.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={subcategory.slug}
                    checked={selectedSubcategories.includes(subcategory.slug)}
                    onCheckedChange={(checked) =>
                      handleSubcategoryChange(
                        subcategory.slug,
                        checked as boolean
                      )
                    }
                    className="size-[18px] dark:border-gray-500"
                  />
                  <label
                    htmlFor={subcategory.slug}
                    className="text-sm cursor-pointer text-muted-foreground"
                  >
                    {subcategory.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4 text-foreground">Brands</h3>
            <div className="space-y-3">
              {brands?.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.slug}
                    checked={selectedBrands.includes(brand.slug)}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand.slug, checked as boolean)
                    }
                    className="size-[18px] dark:border-gray-500"
                  />
                  <label
                    htmlFor={brand.slug}
                    className="text-sm cursor-pointer text-muted-foreground"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4 text-foreground">
              Clear Filters
            </h3>
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="w-full"
            >
              Reset All
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Showing {allProducts.length} of {totalCount} products
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {hasNextPage && (
                <div className="text-center mt-8">
                  <Button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    variant="outline"
                    size="lg"
                    className="dark:border-primary dark:text-primary text-lg"
                  >
                    {isFetchingNextPage ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </>
          )}

          {allProducts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found matching your filters.
              </p>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
