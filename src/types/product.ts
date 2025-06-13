export type Product = {
  [x: string]: Key | null | undefined;
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  // imageUrl: string;
  stock: number;
};
