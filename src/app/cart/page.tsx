import RequireAuth from "@/components/RequireAuth";
import CartPageClient from "./CartPageClient";
import { fetcher } from "@/utils/fetcher";
import { CartItem } from "@/contexts/CartContext";

export default async function CartPage() {

  return (
    <RequireAuth>
      <CartProvider>
        <CartPageClient />
      </CartProvider>
    </RequireAuth>
  );
}

import { CartProvider } from "@/contexts/CartContext";
