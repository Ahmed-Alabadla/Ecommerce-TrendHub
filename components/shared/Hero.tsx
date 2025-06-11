"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useCategories } from "@/hooks/useCategory";

export default function Hero() {
  const { data: categories } = useCategories();
  // Filter categories that have images and take first 4
  const categoriesWithImages =
    categories?.filter((category) => category.image)?.slice(0, 4) || [];

  return (
    <section className="relative  py-20 px-4 overflow-hidden">
      <div className="container mx-auto text-center px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8 mb-12 lg:mb-0">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Products
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Shop the latest trends in electronics, fashion, and more. Get
              exclusive deals and fast shipping on thousands of products.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => redirect("/products")}
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-primary dark:hover:border-primary dark:hover:text-primary px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300  dark:text-white dark:bg-black dark:hover:bg-black hover:text-primary"
                onClick={() => redirect("/categories")}
              >
                View Categories
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur-3xl opacity-20"></div>
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="space-y-4">
                {categoriesWithImages[0] && (
                  <div className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm h-60 md:h-72 p-2 shadow-xl animate-fade-in animate-float">
                    <Image
                      src={categoriesWithImages[0].image!}
                      width={150}
                      height={50}
                      alt={categoriesWithImages[0].name}
                      className="w-full h-full object-contain object-center rounded-lg"
                    />
                  </div>
                )}
                {categoriesWithImages[1] && (
                  <div
                    className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm h-40 md:h-48 p-2 shadow-xl animate-fade-in animate-float"
                    style={{ animationDelay: "200ms" }}
                  >
                    <Image
                      src={categoriesWithImages[1].image!}
                      width={150}
                      height={50}
                      alt={categoriesWithImages[1].name}
                      className="w-full h-full object-contain object-center rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-4 mt-10">
                {categoriesWithImages[2] && (
                  <div
                    className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm h-40 md:h-48 p-2 shadow-xl animate-fade-in animate-float"
                    style={{ animationDelay: "400ms" }}
                  >
                    <Image
                      src={categoriesWithImages[2].image!}
                      width={150}
                      height={50}
                      alt={categoriesWithImages[2].name}
                      className="w-full h-full object-contain object-center rounded-lg"
                    />
                  </div>
                )}
                {categoriesWithImages[3] && (
                  <div
                    className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm h-60 md:h-72 p-2 shadow-xl animate-fade-in animate-float [animation-delay:600ms]"
                    style={{ animationDelay: "600ms" }}
                  >
                    <Image
                      src={categoriesWithImages[3].image!}
                      width={150}
                      height={50}
                      alt={categoriesWithImages[3].name}
                      className="w-full h-full object-contain object-center rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>
    </section>
  );
}
