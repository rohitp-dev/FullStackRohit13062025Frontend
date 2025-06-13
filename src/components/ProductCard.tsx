"use client";

import { Product } from "@/types/product";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      {/* <CardMedia
        component="img"
        height="180"
        image={product.imageUrl}
        alt={product.name}
      /> */}
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="subtitle1" mt={1}>
          ₹{product.price.toFixed(2)}
        </Typography>
        <Button
          component={Link}
          href={`/products/${product._id}`}
          size="small"
          sx={{ mt: 1 }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
