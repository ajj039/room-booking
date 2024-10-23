import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "@/store/StoreProvider";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Booking Events",
  description: "Book your Events",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={font.className}>
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </StoreProvider>
  );
}
