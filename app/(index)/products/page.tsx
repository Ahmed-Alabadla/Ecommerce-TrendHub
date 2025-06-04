import Loading from "@/app/loading";
import Products from "@/components/pages/Products";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Products />
    </Suspense>
  );
}
