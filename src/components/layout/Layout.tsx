import { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
      <a
        href="https://wa.me/919789017717"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white shadow-lg transition-colors hover:bg-green-600 lg:hidden"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};
