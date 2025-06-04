"use client";
import { useBrands } from "@/hooks/useBrand";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Tag } from "lucide-react";

export default function BrandsCarousel() {
  const { data: brands, isPending, error } = useBrands();

  if (isPending) {
    return (
      <section className="py-10">
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">
            Popular Brands
          </h2>

          <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-lg p-4 shadow-sm">
                <Skeleton className="h-20 w-20 md:h-24 md:w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    toast.error("Failed to load brands. Please try again later.", {
      description: error instanceof Error ? error.message : "Unknown error",
    });
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Brands</h2>

        <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12">
          {brands?.map((brand) => (
            <Link
              key={brand.id}
              href={`/products?brand=${brand.slug}`}
              className="group dark:shadow-primary rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-20 w-20 md:h-24 md:w-24 flex items-center justify-center">
                {brand.image ? (
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                ) : (
                  <p className="flex flex-col items-center  gap-2">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xl text-primary font-semibold">
                      {brand.name}
                    </span>
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
