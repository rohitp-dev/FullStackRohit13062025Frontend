import type { ReactNode } from "react";
import ThemeRegistry from "@/components/ThemeRegistry";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import NavbarWrapperClient from "@/components/NavbarWrapperClient";

export const metadata = {
  title: "E-Commerce App",
  description: "Next.js + MUI + App Router",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <CartProvider>
              <NavbarWrapperClient />
              <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                {children}
              </main>
            </CartProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
