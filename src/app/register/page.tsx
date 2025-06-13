'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { fetcher } from '@/utils/fetcher';

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    if (!name) {
      setError('Name is required');
      return;
    }

    try {
      if (email && password.length >= 6) {
        await fetcher.post('/auth/register', { name, email, password });
        const success = await login(email, password);
        if (success) {
          router.push('/products');
        } else {
          setError('Auto-login failed after registration');
        }
      } else {
        setError('Password must be at least 6 characters');
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box mt={2}>
          <Button type="submit" fullWidth variant="contained">
            Register
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
