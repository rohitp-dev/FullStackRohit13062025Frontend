import AddToCartButton from "@/components/AddToCartButton";
import { getProductById } from "@/lib/products";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductById(params.id);
  if (!product) {
    notFound();
  }

  return (
    <Card sx={{ maxWidth: 900, mx: "auto" }}>
      {/* <CardMedia
        component="img"
        height="400"
        image={product.imageUrl}
        alt={product.name}
      /> */}
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          ₹{product?.price?.toFixed(2)}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Category: {product.category} | In stock: {product.stock}
        </Typography>

        <Box mt={3}>
          <AddToCartButton product={product} />
        </Box>
      </CardContent>
    </Card>
  );
}
