"use client";

import { useCart } from "@/contexts/CartContext";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Box,
  Button,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartPageClient() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const total =
    cart.length &&
    cart?.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {!cart || cart?.length === 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          Your cart is empty. Please add some products to your cart.
        </Typography>
      ) : (
        <>
          <List>
            {cart?.map((item) => (
              <ListItem key={item._id} alignItems="flex-start">
                <ListItemText
                  primary={`${item.productId.name} - ₹${item.productId.price}`}
                  secondary={
                    <Box display="flex" alignItems="center" gap={2} mt={1}>
                      <TextField
                        type="number"
                        label="Qty"
                        size="small"
                        value={item.quantity}
                        inputProps={{ min: 1 }}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                      />
                      <IconButton
                        edge="end"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" mt={3}>
            Total: ₹{total.toFixed(2)}
          </Typography>
          <Button onClick={clearCart} variant="outlined" sx={{ mt: 2 }}>
            Clear Cart
          </Button>
        </>
      )}
    </Paper>
  );
}
