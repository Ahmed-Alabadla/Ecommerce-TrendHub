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
import { IProduct, ProductStatus } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const brand = searchParams.get("brand");

  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Mock products data
  const products: IProduct[] = [
    {
      id: 23,
      name: "iPhone 16 Pro Max ",
      description: "this is iPhone 16 Pro Max ",
      quantity: 88,
      price: 1199.99,
      priceAfterDiscount: 0,
      imageCover:
        "https://res.cloudinary.com/dquxld87w/image/upload/v1747566561/ecommerce/tvimr1x6o3fa7bxd0tod.jpg",
      images: [
        "https://res.cloudinary.com/dquxld87w/image/upload/v1747566562/ecommerce/tnqg50o8cea6nkll3vcn.jpg",
        "https://res.cloudinary.com/dquxld87w/image/upload/v1747566562/ecommerce/rftzcdnm9glxryjiau1x.jpg",
      ],
      sold: 12,
      ratingsAverage: "0.0",
      ratingsQuantity: 0,
      status: "Active" as ProductStatus,
      warranty: null,
      weight: null,
      dimensions: null,
      createdAt: new Date("2025-05-18T11:09:21.422Z"),
      updatedAt: new Date("2025-05-18T16:25:24.376Z"),
      category: {
        id: 23,
        name: "Mobiles",
        slug: "mobiles",
      },
      subCategory: null,
      brand: {
        id: 2,
        name: "Apple",
        slug: "apple",
      },
    },
  ];

  const categories = ["electronics", "fashion", "Home & Garden", "Sports"];

  const subcategories = ["Smartphones", "Laptops", "Headphones", "Accessories"];
  const brands = ["Apple", "Samsung", "TechAudio", "Logitech"];

  if (
    category &&
    !selectedCategories.includes(category) &&
    categories.includes(category)
  ) {
    setSelectedCategories((prev) => [...prev, category]);
  }
  if (
    subcategory &&
    !selectedSubcategories.includes(subcategory) &&
    subcategories.includes(subcategory)
  ) {
    setSelectedSubcategories((prev) => [...prev, subcategory]);
  }
  if (brand && !selectedBrands.includes(brand) && brands.includes(brand)) {
    setSelectedBrands((prev) => [...prev, brand]);
  }
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.slug);
    const subcategoryMatch =
      selectedSubcategories.length === 0 ||
      (product.subCategory &&
        selectedSubcategories.includes(product.subCategory?.slug));
    const brandMatch =
      selectedBrands.length === 0 ||
      (product.brand && selectedBrands.includes(product.brand?.slug));
    return categoryMatch && brandMatch && subcategoryMatch;
  });

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
    setSortBy("featured");

    router.push(`?${newParams.toString()}`);
  };

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
          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4 text-foreground">Categories</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                    className="size-[18px] dark:border-gray-500"
                  />
                  <label
                    htmlFor={category}
                    className="text-sm cursor-pointer text-muted-foreground"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4 text-foreground">
              Sub Categories
            </h3>
            <div className="space-y-3">
              {subcategories.map((subcategory) => (
                <div key={subcategory} className="flex items-center space-x-2">
                  <Checkbox
                    id={subcategory}
                    checked={selectedSubcategories.includes(subcategory)}
                    onCheckedChange={(checked) =>
                      handleSubcategoryChange(subcategory, checked as boolean)
                    }
                    className="size-[18px] dark:border-gray-500"
                  />
                  <label
                    htmlFor={subcategory}
                    className="text-sm cursor-pointer text-muted-foreground"
                  >
                    {subcategory}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4 text-foreground">Brands</h3>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand, checked as boolean)
                    }
                    className="size-[18px] dark:border-gray-500"
                  />
                  <label
                    htmlFor={brand}
                    className="text-sm cursor-pointer text-muted-foreground"
                  >
                    {brand}
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
              Showing {filteredProducts.length} products
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
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
