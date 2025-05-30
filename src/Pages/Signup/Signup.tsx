import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Alert, Snackbar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup, type SignupData } from '../../services/authService';

interface SignupFormData extends SignupData {
    confirmPassword: string;
}

const initialFormState: SignupFormData = {
    first_Name: '',
    last_Name: '',
    date_Of_Birth: '',
    phone_Number: '',
    email: '',
    password: '',
    confirmPassword: ''
};
//  "first_Name": "string",
//   "last_Name": "string",
//   "date_Of_Birth": "2025-05-30T08:29:24.379Z",
//   "email": "string",
//   "password": "string",
//   "phone_Number": "string"
const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignupFormData>(initialFormState);
    const [errors, setErrors] = useState<Partial<SignupFormData>>({});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<SignupFormData> = {};

        if (!formData.first_Name.trim()) {
            newErrors.first_Name = 'First name is required';
        }

        if (!formData.last_Name.trim()) {
            newErrors.last_Name = 'Last name is required';
        }

        if (!formData.date_Of_Birth) {
            newErrors.date_Of_Birth = 'Date of birth is required';
        }

        if (!formData.phone_Number.trim()) {
            newErrors.phone_Number = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone_Number.replace(/\D/g, ''))) {
            newErrors.phone_Number = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
            // Remove confirmPassword before sending to API
            const { confirmPassword, ...signupData } = formData;
            await signup(signupData);
            
            // Show success message and redirect
            setErrorMessage('Account created successfully! Redirecting to login...');
            setShowError(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error: any) {
            setErrorMessage(error.message || 'Failed to create account. Please try again.');
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
                    Create Account
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="first_Name"
                        value={formData.first_Name}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.first_Name}
                        helperText={errors.first_Name}
                        required
                        disabled={isLoading}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="last_Name"
                        value={formData.last_Name}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.last_Name}
                        helperText={errors.last_Name}
                        required
                        disabled={isLoading}
                    />
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        name="date_Of_Birth"
                        type="date"
                        value={formData.date_Of_Birth}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.date_Of_Birth}
                        helperText={errors.date_Of_Birth}
                        required
                        disabled={isLoading}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone_Number"
                        value={formData.phone_Number}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.phone_Number}
                        helperText={errors.phone_Number}
                        required
                        disabled={isLoading}
                        placeholder="1234567890"
                    />
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
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
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
                                'Sign Up'
                            )}
                        </Button>
                        <Button 
                            variant="text" 
                            onClick={() => navigate('/login')}
                            fullWidth
                            disabled={isLoading}
                        >
                            Already have an account? Login
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
                        severity={errorMessage.includes('successfully') ? 'success' : 'error'} 
                        sx={{ width: '100%' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
};

export default Signup;