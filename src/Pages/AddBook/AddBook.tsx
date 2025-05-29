import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper, Alert, Snackbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { addBook, getBook, updateBookData } from '../../store/counterSlice';
import { useSelector } from 'react-redux';

interface BookFormData {
    title: string;
    author: string;
    isbn: string;
    quantity: string;
}

interface ValidationErrors {
    Title?: string;
    Author?: string;
    ISBN?: string;
    Quantity?: string;
}

const initialBookState: BookFormData = {
    title: '',
    author: '',
    isbn: '',
    quantity: ''
};

const AddBook: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const bookState = useSelector((state: any) => state.counter.updateBookData?.data?.[0]);
    const error = useSelector((state: any) => state.counter.ErrorMsg);
    const apiStatus = useSelector((state: any) => state.counter.status);
    const isUpdateMode = location.pathname.startsWith("/UpdateBook/");
    const [bookId, setBookId] = useState<string | undefined>();
    const [book, setBook] = useState<BookFormData>(initialBookState);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (isUpdateMode) {
            const savedData = localStorage.getItem('selectedData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setBookId(parsedData?.book_Id);
                setBook(parsedData);
            } else if (bookState) {
                setBookId(bookState.book_Id);
                setBook(bookState);
                localStorage.setItem('selectedData', JSON.stringify(bookState));
            } else {
                const pathParts = location.pathname.split('/');
                const id = pathParts[pathParts.length - 1];
                if (id) {
                    setBookId(id);
                }
            }
        }
    }, [bookState, isUpdateMode, location.pathname]);

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let response;
            if (isUpdateMode && bookId) {
                response = await dispatch(updateBookData({ id: bookId, ...book }));
            } else {
                response = await dispatch(addBook(book));
            }

            if (response.meta.requestStatus === 'fulfilled') {
                await dispatch(getBook());
                localStorage.removeItem('selectedData');
                navigate('/');
            }
        } catch (error) {
            console.error('Error submitting book:', error);
        }
    };

    const handleCancel = () => {
        localStorage.removeItem('selectedData');
        navigate('/');
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    const getFieldError = (fieldName: string): string => {
        if (error?.errors) {
            const fieldKey = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
            return error.errors[fieldKey as keyof ValidationErrors] || '';
        }
        return '';
    };
    
    useEffect(()=>{
        console.log("error",error);
        
    },[error])

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                {isUpdateMode ? 'Update Book' : 'Add New Book'}
            </Typography>
            
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleCancel} 
                sx={{ mb: 2 }}
            >
                Back to Books
            </Button>

            <Snackbar 
                open={showError} 
                autoHideDuration={6000} 
                onClose={handleCloseError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {error?.message || 'An error occurred'}
                </Alert>
            </Snackbar>

            <Paper sx={{ p: 2 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!getFieldError('title')}
                        helperText={getFieldError('title')}
                    />
                    <TextField
                        fullWidth
                        label="Author"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!getFieldError('author')}
                        helperText={getFieldError('author')}
                    />
                    <TextField
                        fullWidth
                        label="ISBN"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                        margin="normal"
                        required
                        error={!!getFieldError('ISBN')}
                        helperText={getFieldError('ISBN')}
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        name="quantity"
                        value={book.quantity}
                        onChange={handleChange}
                        margin="normal"
                        required
                        type="number"
                        error={!!getFieldError('quantity')}
                        helperText={getFieldError('quantity')}
                    />
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            disabled={apiStatus === 'loading'}
                        >
                            {apiStatus === 'loading' ? 'Processing...' : isUpdateMode ? 'Update Book' : 'Add Book'}
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            onClick={handleCancel}
                            disabled={apiStatus === 'loading'}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default AddBook; 