import type { Metadata } from "next";
import "./globals.css";
import AuthLayout from "@/components/AuthLayout";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A simple task management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <AuthLayout>{children}</AuthLayout>
        <Toaster position="top-right" /> {/* Enables global notifications */}
      </body>
    </html>
  );
}
