import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Latest gadgets and technology",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
      productCount: 1247,
      subcategories: ["Smartphones", "Laptops", "Headphones", "Smart Watches"],
    },
    {
      id: 2,
      name: "Fashion",
      description: "Trendy clothing and accessories",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      productCount: 2156,
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Shoes",
        "Accessories",
      ],
    },
    {
      id: 3,
      name: "Home & Garden",
      description: "Everything for your home",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      productCount: 856,
      subcategories: ["Furniture", "Kitchen", "Garden Tools", "Decor"],
    },
    {
      id: 4,
      name: "Sports & Fitness",
      description: "Gear for active lifestyle",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      productCount: 634,
      subcategories: [
        "Fitness Equipment",
        "Sports Gear",
        "Outdoor",
        "Activewear",
      ],
    },
    {
      id: 5,
      name: "Books & Media",
      description: "Knowledge and entertainment",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      productCount: 445,
      subcategories: ["Books", "Movies", "Music", "Games"],
    },
    {
      id: 6,
      name: "Health & Beauty",
      description: "Wellness and personal care",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      productCount: 723,
      subcategories: [
        "Skincare",
        "Makeup",
        "Health Supplements",
        "Personal Care",
      ],
    },
  ];
  return (
    <main>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Shop by Category
        </h1>
        <p className="text-muted-foreground">
          Explore our wide range of product categories
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card
            key={category.id}
            className=" p-0 group dark:shadow-gray-700 cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <Link href={`/products?category=${category.name.toLowerCase()}`}>
              <div className="relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-90">
                    {category.productCount} products
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground text-sm">
                    Popular in this category:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
