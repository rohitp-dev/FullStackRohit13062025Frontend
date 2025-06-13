"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function RedirectIfAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");  

  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace("/products");
    }
  }, [token, router]);

  return <>{!token && children}</>;
}
