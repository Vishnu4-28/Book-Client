import { useEffect, useState } from 'react';
import { getBook, deleteBook, GetBookById, getDeletedBook, RestoreBook } from '../../store/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch} from '../../store/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RestoreIcon from '@mui/icons-material/Restore';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useLoadingState, useLoadingStates } from '../../hooks/useLoadingState';
import { encryptId } from '../../utils/encryption';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface Book {
    counter : number;
    date: string;
    book_Id : string;
    title: string;
    author : string;
    isbn : number ;
    quantity : number;   
}

function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const bookState = useSelector((state: any) => state.counter.Book.data);
    const DeletedBook = useSelector((state: any) => state.counter.deletedBooks.data);
    const loadingStates = useLoadingStates();
    const isLoading = useLoadingState();
    const [IsRestore, SetIsRestore] = useState(false);
    const navigate = useNavigate();
    
    const handleDelete = async (bookId: string) => {
        try {
            await dispatch(deleteBook(bookId));
            await dispatch(getBook());
        } catch (error) {
            console.error('Failed to delete book:', error);
        }
    };

    const handleUpdate = async (bookId: string) => {
        try {
            await dispatch(GetBookById(bookId));
            // const encryptedId = encryptId(bookId);
            navigate(`/UpdateBook/${bookId}`);
        } catch (error) {
            console.error('Failed to get book:', error);
        }
    };

    const handleNavigation = () =>{
        localStorage.removeItem('selectedData');
        navigate('/AddBook')
    }

    const handleRestoreData = async () => {
        try {
            await dispatch(getDeletedBook());
            SetIsRestore(!IsRestore);
            dispatch(getBook());
        } catch {
            console.error('Failed to get deleted data');
        }
    };

    const handleRestore = async (bookId: string) => {
        try {
            await dispatch(RestoreBook(bookId));
            dispatch(getDeletedBook());
        } catch (error) {
            console.error('Failed to restore book:', error);
        }
    };

    useEffect(() => {
        dispatch(getBook());
    }, [dispatch]);

    const contents = isLoading ? (
        <LoadingSpinner message="Loading books..." />
    ) : bookState === undefined ? (
        <Typography variant="body1">
            <em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em>
        </Typography>
    ) : (
        <TableContainer component={Paper}>
            <Table aria-labelledby="tableLabel">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>ISBN</TableCell>
                        <TableCell>Quantity</TableCell>
                        {IsRestore ? (
                            <>
                                <TableCell>Restore</TableCell>
                                <TableCell>Delete</TableCell>
                            </>
                        ) : (
                            <>
                                <TableCell>Delete</TableCell>
                                <TableCell>Update</TableCell>
                            </>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(IsRestore ? DeletedBook : bookState)?.map((Book: Book) => (
                        <TableRow key={Book.book_Id}>
                            <TableCell>{Book.title}</TableCell>
                            <TableCell>{Book.author}</TableCell>
                            <TableCell>{Book.isbn}</TableCell>
                            <TableCell>{Book.quantity}</TableCell>
                            <TableCell>
                                {IsRestore ? (
                                    <RestoreIcon 
                                        style={{cursor: "pointer"}} 
                                        onClick={() => handleRestore(Book.book_Id)}
                                        color={loadingStates.restoreBook ? "disabled" : "primary"}
                                    />
                                ) : (
                                    <DeleteIcon 
                                        style={{cursor: "pointer"}} 
                                        onClick={() => handleDelete(Book.book_Id)}
                                        color={loadingStates.deleteBook ? "disabled" : "primary"}
                                    />
                                )}
                            </TableCell>
                            <TableCell>
                                {!IsRestore && (
                                    <ModeEditIcon 
                                        style={{cursor: "pointer"}} 
                                        onClick={() => handleUpdate(Book.book_Id)}
                                        color={loadingStates.updateBook ? "disabled" : "primary"}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" id="tableLabel" gutterBottom>Book Details</Typography>
            <Typography variant="body1" paragraph>This component demonstrates fetching data from the server.</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleNavigation}
                    disabled={isLoading}
                >
                    Add New Book
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleRestoreData}
                    disabled={isLoading}
                >
                    {IsRestore ? 'View All Books' : 'View Deleted Books'}
                </Button>
            </Box>
            
            {contents}
        </Box>
    );
}

export default Home;