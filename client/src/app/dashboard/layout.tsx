"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/main.png";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { logout } from "@/services/auth";
import { useState, useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Toggle Button (Mobile only) */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed z-50 top-4 left-4 p-2 rounded-full bg-blue-600 text-white lg:hidden"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <aside
          className={`w-64 bg-gray-100 p-4 shadow-md fixed h-full transition-transform duration-300 z-40 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-xl font-bold mb-6">
            <Link href="/">
              <Image
                src={logo}
                alt="Unicrescent | Best E-commerce platform in BD"
                width={120}
                height={60}
                className="w-full h-full"
              />
            </Link>
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/profile"
                className={`block px-4 py-2 rounded-lg ${
                  pathname === "/dashboard/profile"
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/orderHistory"
                className={`block px-4 py-2 rounded-lg ${
                  pathname === "/dashboard/orderHistory"
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                Order History
              </Link>
            </li>
          </ul>
        </aside>
      )}

      {/* Desktop Sidebar (always visible) */}
      <aside className="hidden lg:block w-64 bg-gray-100 p-4 shadow-md">
        <h2 className="text-xl font-bold mb-6">
          <Link href="/">
            <Image
              src={logo}
              alt="Unicrescent | Best E-commerce platform in BD"
              width={120}
              height={60}
              className="w-full h-full"
            />
          </Link>
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard/profile"
              className={`block px-4 py-2 rounded-lg ${
                pathname === "/dashboard/profile"
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/orderHistory"
              className={`block px-4 py-2 rounded-lg ${
                pathname === "/dashboard/orderHistory"
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              Order History
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`p-6 w-full`}>
        <div className="flex justify-between mb-4">
          <div></div>
          <div className="text-md lg:text-2xl font-bold bg-[#1F3F92] text-white rounded-lg px-2 lg:px-5 py-1 lg:py-2">
            User Dashboard
          </div>
          <div>
            <div className="flex gap-2">
              <Link href="/">
                <button
                  title="Go to Home"
                  className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition cursor-pointer"
                >
                  <FaHome className="text-xl" />
                </button>
              </Link>

              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
              >
                <FaSignOutAlt className="text-xl" />
              </button>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}