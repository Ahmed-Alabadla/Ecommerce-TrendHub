import Orders from "@/components/pages/Orders";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    // Redirect to home if access token is not present
    redirect("/");
  }

  return <Orders />;
}
