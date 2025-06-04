"use client";
import { Card } from "@/components/ui/card";
import { useCategories } from "@/hooks/useCategory";
import { CameraOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import CardSkeleton from "@/components/shared/CardSkeleton";

export default function Categories() {
  const { data: categories, isPending, error } = useCategories();

  if (isPending) {
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
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    toast.error(`Error loading categories: ${error.message}`, {
      description: "Please try again later.",
    });
  }

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
        {categories?.map((category) => (
          <Card
            key={category.id}
            className=" p-0 group dark:shadow-gray-700 cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <Link href={`/products?category=${category.slug}`}>
              <div className="relative overflow-hidden">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    width={400}
                    height={300}
                  />
                ) : (
                  <div className="w-full h-48 bg-muted flex items-center justify-center">
                    <CameraOff className="size-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm">
                    {category.subCategories.length} subcategories
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground text-sm">
                    Popular in this category:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.subCategories.length > 0 ? (
                      category.subCategories.map((sub) => (
                        <Link
                          href={`/products?subcategory=${sub.slug}`}
                          key={sub.id}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                        >
                          {sub.name}
                        </Link>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No subcategories available
                      </span>
                    )}
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
