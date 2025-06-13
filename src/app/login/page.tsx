"use client"
import RedirectIfAuth from "@/components/RedirectIfAuth";

export default function LoginWrapper() {
  return (
    <RedirectIfAuth>
      <LoginPage />
    </RedirectIfAuth>
  );
}

import { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      router.push("/products");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box mt={2}>
          <Button type="submit" fullWidth variant="contained">
            Sign In
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
