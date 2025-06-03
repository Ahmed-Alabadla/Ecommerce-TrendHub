import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <Card className="p-0 overflow-hidden dark:shadow-gray-700">
      <div className="relative">
        <Skeleton className="w-full h-48" />
        <div className="absolute bottom-4 left-4">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="p-6">
        <Skeleton className="h-4 w-40 mb-3" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-18 rounded-full" />
        </div>
      </div>
    </Card>
  );
}
