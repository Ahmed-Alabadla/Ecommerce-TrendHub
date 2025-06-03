import Loading from "@/app/loading";
import Profile from "@/components/pages/Profile";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Profile />
    </Suspense>
  );
}
