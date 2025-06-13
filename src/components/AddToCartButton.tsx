"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ product }: { product: Product }) {
  const token = localStorage.getItem("token");
  const { addToCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!token) {
      router.push("/login");
      return;
    }

    addToCart(product._id, 1);  
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleAdd}
      disabled={isOutOfStock || added}
    >
      {isOutOfStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
    </Button>
  );
}
