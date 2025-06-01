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
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductsPage() {
  const searchParams = useSearchParams();
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
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 99.99,
      originalPrice: 149.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
      rating: 4.5,
      reviews: 324,
      brand: "TechAudio",
      isOnSale: true,
      category: "Electronics",
      subcategory: "Headphones",
    },
    {
      id: 2,
      name: "Smart Watch Series 8",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      rating: 4.8,
      reviews: 567,
      brand: "Apple",
      isOnSale: false,
      category: "Electronics",
      subcategory: "Smartphones",
    },
    {
      id: 3,
      name: "Premium Gaming Mouse",
      price: 79.99,
      originalPrice: 99.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
      rating: 4.3,
      reviews: 189,
      brand: "Logitech",
      isOnSale: true,
      category: "Electronics",
      subcategory: "Accessories",
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1586953983027-d7508a64f4bb?w=300",
      rating: 4.1,
      reviews: 94,
      brand: "Samsung",
      isOnSale: false,
      category: "Electronics",
      subcategory: "Accessories",
    },
  ];

  const categories = ["Electronics", "Fashion", "Home & Garden", "Sports"];

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
      selectedCategories.includes(product.category);
    const subcategoryMatch =
      selectedSubcategories.length === 0 ||
      selectedSubcategories.includes(product.subcategory);

    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
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

  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover our complete collection
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={category}
                    className="text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4">Sub Categories</h3>
            <div className="space-y-3">
              {subcategories.map((subcategory) => (
                <div key={subcategory} className="flex items-center space-x-2">
                  <Checkbox
                    id={subcategory}
                    checked={selectedSubcategories.includes(subcategory)}
                    onCheckedChange={(checked) =>
                      handleSubcategoryChange(subcategory, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={subcategory}
                    className="text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    {subcategory}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4">Brands</h3>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={brand}
                    className="text-sm cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg shadow-sm dark:bg-gray-900 dark:shadow-gray-500 bg-white">
            <h3 className="font-semibold mb-4">Clear Filters</h3>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedBrands([]);
                setSelectedSubcategories([]);
                setSortBy("featured");
              }}
              className="w-full"
            >
              Reset All
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 dark:text-gray-400">
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
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No products found matching your filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                  setSelectedSubcategories([]);
                  setSortBy("featured");
                }}
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
