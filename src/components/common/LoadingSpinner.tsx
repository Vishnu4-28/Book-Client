import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
    message?: string;
    size?: number;
    fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    message = 'Loading...', 
    size = 40,
    fullPage = false 
}) => {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: fullPage ? '100vh' : '200px',
                width: '100%'
            }}
        >
            <CircularProgress size={size} />
            {message && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default LoadingSpinner; 