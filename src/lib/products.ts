import { fetcher } from "@/utils/fetcher";
import { Product } from "../types/product";

export async function getProducts(
  page: number = 1
): Promise<{ products: Product[]; totalPages: number }> {
  try {
    const { data: response } = await fetcher.get<{
      data: {
        products: Product[];
        totalPages: number;
      };
    }>(`/products?page=${page}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch products from API:", error);
    return { products: [], totalPages: 0 };
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data: product } = await fetcher.get<Product>(`/products/${id}`);
    return product;
  } catch (error) {
    console.error("Failed to fetch product by id from API:", error);
    return null;
  }
}
