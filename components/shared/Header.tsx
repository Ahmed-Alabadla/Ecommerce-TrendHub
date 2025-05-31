"use client";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

import logo from "@/public/logo.png";
import SearchModal from "./SearchModal";
import { DarkModeToggle } from "./DarkModeToggle";
import Link from "next/link";
export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const wishlistItems = [];
  const cartItems = [];
  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border dark:border-gray-500">
        <div className="container mx-auto px-4 flex flex-col gap-1 items-center">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo */}
            <div className="flex items-center space-x-4 ">
              <Image src={logo} alt="logo" width={130} />
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onClick={() => setIsSearchOpen(true)}
                  readOnly
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2.5 md:space-x-4">
              <DarkModeToggle />

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="sm" className="relative">
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="relative"
                // onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 mb-1">
            <Link
              href="/products"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              All Products
            </Link>
            <Link
              href="/categories"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Categories
            </Link>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Fashion
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home & Garden
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Sports
            </a>
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
