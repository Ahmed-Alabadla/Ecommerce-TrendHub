import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { ReactNode } from "react";

interface IndexLayoutProps {
  children: ReactNode;
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
