import React, { useState, useRef, useEffect } from 'react';
import {
    Modal,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../store/store';
import { getBook, uploadBookImage } from '../../store/counterSlice';
import { useSelector } from 'react-redux';

interface ImageUploadModalProps {
    open: boolean;
    onClose: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ open, onClose }) => {
    const dispatch = useAppDispatch();
    const books = useSelector((state: any) => state.counter.Book.data);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageCaption, setImageCaption] = useState('');
    const [imageDescription, setImageDescription] = useState('');
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    // const uploadFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedBookId) {
            const timer = setTimeout(() => {
                const element = document.getElementById('upload-form-section');
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [selectedBookId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
        }
    };

    const handleBookSelect = (bookId: string) => {
        setSelectedBookId(bookId);
    };

    const handleUpload = async (bookId: string) => {
        if (!selectedFile) {
            alert('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('MyImage', selectedFile);
        formData.append('Book_id', bookId);
        formData.append('ImageCaption', imageCaption);
        formData.append('ImageDescription', imageDescription);

        try {
            const response = await dispatch(uploadBookImage(formData));
            if (response.meta.requestStatus === 'fulfilled') {
                // Reset form
                setSelectedFile(null);
                setPreviewUrl(null);
                setImageCaption('');
                setImageDescription('');
                setSelectedBookId(null);
                dispatch(getBook());
                onClose(); // Close the modal after successful upload
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="image-upload-modal"
        >
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                        Upload Book Images
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>ISBN</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books?.map((book: any) => (
                                <TableRow key={book.book_Id}>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.isbn}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleBookSelect(book.book_Id)}
                                            disabled={selectedBookId === book.book_Id}
                                        >
                                            Upload Image
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {selectedBookId && (
                    <Box 
                        id="upload-form-section"
                        sx={{ 
                            mt: 2, 
                            p: 2, 
                            border: '1px solid #ddd', 
                            borderRadius: 1,
                            backgroundColor: '#f5f5f5'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Upload Image for Selected Book
                        </Typography>
                        
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" sx={{ mb: 2 }}>
                                Select Image
                            </Button>
                        </label>

                        {previewUrl && (
                            <Box sx={{ mt: 2, mb: 2 }}>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    style={{
                                        maxWidth: '200px',
                                        maxHeight: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />
                            </Box>
                        )}

                        <TextField
                            fullWidth
                            label="Image Caption"
                            value={imageCaption}
                            onChange={(e) => setImageCaption(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Image Description"
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                            margin="normal"
                            multiline
                            rows={3}
                        />

                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleUpload(selectedBookId)}
                                disabled={!selectedFile}
                            >
                                Upload
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSelectedBookId(null);
                                    setSelectedFile(null);
                                    setPreviewUrl(null);
                                    setImageCaption('');
                                    setImageDescription('');
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default ImageUploadModal; 