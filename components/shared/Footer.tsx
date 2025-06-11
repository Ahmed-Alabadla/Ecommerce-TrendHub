import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700 py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/logo.png"
              alt="TrendHub Logo"
              width={150}
              height={50}
              className="mb-4"
            />
            <p className=" mb-4 max-w-md">
              Your premier destination for quality products at unbeatable
              prices. Shop with confidence and enjoy fast, reliable shipping.
            </p>
          </div>

          {/* My Account */}
          <div>
            <h3 className="font-bold text-lg mb-4">My Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="hover:text-primary transition">
                  Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-primary transition">
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="hover:text-primary transition"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary transition">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} />
                <span>123 Commerce St, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span>support@trendhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-primary font-medium">TrendHub shop</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
