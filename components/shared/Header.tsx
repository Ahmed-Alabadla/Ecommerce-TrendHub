"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

import logo from "@/public/logo.png";
import SearchModal from "./SearchModal";
import { DarkModeToggle } from "./DarkModeToggle";
import Link from "next/link";

import UserMenu from "./UserMenu";
import WishlistIndicator from "./WishlistIndicator";
import { usePathname } from "next/navigation";
import CartIndicator from "./CartIndicator";
export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border dark:border-gray-700">
        <div className="container mx-auto px-4 md:px-6 lg:px-8  flex flex-col gap-1 items-center">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4 ">
              <Image src={logo} alt="logo" width={130} />
            </Link>

            {/* Search Bar */}
            <div className="hidden  md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2"
                  onClick={() => setIsSearchOpen(true)}
                  readOnly
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2.5 md:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:text-primary dark:hover:bg-gray-700"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="size-5" />
              </Button>

              <DarkModeToggle />

              <WishlistIndicator />

              <CartIndicator />

              <UserMenu />
            </div>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 mb-1.5">
            <Link
              href="/products"
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                pathname === "/products" && "text-primary"
              }`}
            >
              Products Catalog
            </Link>
            <Link
              href="/categories"
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                pathname === "/categories" && "text-primary"
              }`}
            >
              Categories
            </Link>
            <Link
              href="/orders"
              className={`text-foreground hover:text-primary transition-colors font-medium ${
                pathname === "/orders" && "text-primary"
              }`}
            >
              My Orders
            </Link>
          </nav>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
