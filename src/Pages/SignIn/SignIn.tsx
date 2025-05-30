import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Alert, Snackbar, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, type LoginData } from '../../services/authService';

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Partial<LoginData>>({});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<LoginData> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            await login(formData);
            
            // Get the redirect path from location state or default to home
            const from = (location.state as any)?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (error: any) {
            setErrorMessage(error.message || 'Failed to sign in. Please try again.');
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Sign In
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        disabled={isLoading}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                        required
                        disabled={isLoading}
                    />
                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                            size="large"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                        <Button 
                            variant="text" 
                            onClick={() => navigate('/signup')}
                            fullWidth
                            disabled={isLoading}
                        >
                            Don't have an account? Sign Up
                        </Button>
                    </Box>
                </form>

                <Snackbar 
                    open={showError} 
                    autoHideDuration={6000} 
                    onClose={handleCloseError}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert 
                        onClose={handleCloseError} 
                        severity="error" 
                        sx={{ width: '100%' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default SignIn;