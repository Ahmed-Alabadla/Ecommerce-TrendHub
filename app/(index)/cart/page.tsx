import Cart from "@/components/pages/Cart";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/");
  }
  return <Cart />;
}
