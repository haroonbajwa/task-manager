"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, logout } from "@/utils/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);

    // Allow access to login & register pages without authentication
    const publicRoutes = ["/login", "/register"];
    if (!token && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <>
      <nav className="flex justify-between p-4 bg-gray-800 text-white">
        <h1 className="text-xl">Task Manager</h1>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
}
