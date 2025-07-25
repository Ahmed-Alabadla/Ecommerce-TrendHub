import Loading from "@/app/loading";
import Categories from "@/components/pages/Categories";
import { Suspense } from "react";

export default function CategoriesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Categories />
    </Suspense>
  );
}
