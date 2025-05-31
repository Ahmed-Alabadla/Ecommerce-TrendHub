import Header from "@/components/shared/Header";
import { ReactNode } from "react";

interface IndexLayoutProps {
  children: ReactNode;
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}
