"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { useProducts } from "@/hooks/useProduct";
import { debounce } from "lodash";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search query to avoid too many API calls
  const debouncedSetSearch = useMemo(
    () =>
      debounce((query: string) => {
        setDebouncedSearchQuery(query);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchQuery);
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [searchQuery, debouncedSetSearch]);

  // Fetch search results when there's a search term
  const { data: searchResults, isLoading } = useProducts(
    debouncedSearchQuery.trim()
      ? { search: debouncedSearchQuery.trim(), limit: 10 }
      : undefined
  );

  const suggestions = [
    "Wireless headphones",
    "Smart watch",
    "Laptop",
    "Gaming keyboard",
    "Bluetooth speaker",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-left">Search Products</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Input
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            autoFocus
          />
          {isLoading ? (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          )}
        </div>

        {/* Show search results when there's a search query */}
        {debouncedSearchQuery.trim() && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 dark:text-gray-400">
              Search Results
            </h3>
            {searchResults?.data?.length ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {searchResults.data.map((product) => (
                  <button
                    key={product.id}
                    className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => {
                      // Handle product selection - you can navigate to product page or add to cart
                      console.log("Selected product:", product);
                      onClose();
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={product.imageCover || "/product.png"}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                        width={40}
                        height={40}
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No products found
              </p>
            )}
          </div>
        )}

        {searchQuery === "" && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 dark:text-gray-400">
              Popular Searches
            </h3>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => setSearchQuery(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
