import Image from "next/image";
import Link from "next/link";
import React from "react";

export const brands = [
  {
    id: "apple",
    name: "Apple",
    logo: "/brand-logos/apple.png",
    categories: ["electronics"],
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "/brand-logos/samsung.png",
    categories: ["electronics"],
  },
  {
    id: "nike",
    name: "Nike",
    logo: "/brand-logos/nike.png",
    categories: ["clothing", "shoes"],
  },
  {
    id: "adidas",
    name: "Adidas",
    logo: "/brand-logos/adidas.png",
    categories: ["clothing", "shoes"],
  },
  {
    id: "zara",
    name: "Zara",
    logo: "/brand-logos/zara.png",
    categories: ["clothing"],
  },
  {
    id: "h&m",
    name: "H&M",
    logo: "/brand-logos/h&m.png",
    categories: ["clothing"],
  },
  {
    id: "rolex",
    name: "Rolex",
    logo: "/brand-logos/rolex.png",
    categories: ["accessories"],
  },
  {
    id: "dell",
    name: "Dell",
    logo: "/brand-logos/dell.png",
    categories: ["electronics"],
  },
  {
    id: "sony",
    name: "Sony",
    logo: "/brand-logos/sony.png",
    categories: ["electronics"],
  },
  {
    id: "puma",
    name: "Puma",
    logo: "/brand-logos/puma.png",
    categories: ["clothing", "shoes"],
  },
];

export default function BrandsCarousel() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Brands</h2>

        <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.id}`}
              className="group dark:shadow-primary rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-20 w-20 md:h-24 md:w-24 flex items-center justify-center">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
