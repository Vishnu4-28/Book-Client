import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface ValidationErrors {
    Title?: string;
    Author?: string;
    ISBN?: string;
    Quantity?: string;
}

interface ApiErrorResponse {
    statusCode: number;
    message: string;
    errors?: ValidationErrors;
}

interface BookState {
    value: number;
    updateState: boolean;
    Book: any[];
    deletedBooks: any[];
    isLoading: boolean;
    ErrorMsg: ApiErrorResponse | null;
    updateBookData: void[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    loadingStates: {
        fetchBooks: boolean;
        deleteBook: boolean;
        restoreBook: boolean;
        updateBook: boolean;
    };
}

export const getBook = createAsyncThunk(
  'Book/BookData',
  async () => {
    const response = await axios.get('https://localhost:7298/books/getAlllBooks');
    console.log("response", response.data);
    return response.data;
  }
);


export const getDeletedBook = createAsyncThunk(
  'Book/deletedBookData',
  async () => {
    const response = await axios.get('https://localhost:7298/books/getdeletedBooks');
    console.log("response", response.data);
    return response.data;
  }
);


export const addBook = createAsyncThunk(
  'counter/addBook',
  async (book: { title: string; author: string; isbn: string; quantity: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://localhost:7298/books/AddBook', book);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response?.data) {
          return rejectWithValue(axiosError.response.data);
        }
      }
      return rejectWithValue({
        statusCode: 500,
        message: 'An unexpected error occurred'
      });
    }
  }
);

export const deleteBook = createAsyncThunk(
  'counter/deleteBook',
  async (bookId: string) => {
    const response = await axios.put(`https://localhost:7298/Books/softDelete?book_id=${bookId}`);
    return response.data;
  }
);


export const RestoreBook = createAsyncThunk(
  'counter/RestoreBook',
  async (bookId: string) => {
    const response = await axios.put(`https://localhost:7298/Books/restoreBooks?book_id=${bookId}`);
    return response.data;
  }
);


export const GetBookById = createAsyncThunk(
  'counter/GetBookById',
  async (bookId: string) => {
    const response = await axios.get(`https://localhost:7298/Books/getById?book_id=${bookId}`);
    return response.data;
  }
);

export const updateBook = createAsyncThunk(
  'counter/UpdateBook',
  async (bookId: string) => {
    const response = await axios.get(`https://localhost:7298/Books/getById?book_id=${bookId}`);
    return response.data;
  }
);

export const updateBookData = createAsyncThunk(
  'counter/UpdateBookData',
  async (bookData: { id: string; title: string; author: string; isbn: string; quantity: string }) => {
    const response = await axios.put(`https://localhost:7298/Books/updateBook?book_id=${bookData.id}`, {
      title: bookData.title,
      author: bookData.author,
      isbn: bookData.isbn,
      quantity: bookData.quantity
    });
    return response.data;
  }
);









// export const restoreBook = createAsyncThunk(
//     'counter/restoreBook',
//     async (bookId: string) => {
//         const response = await axios.post(`https://localhost:7298/Books/restoreBook?book_id=${bookId}`);
//         return response.data;
//     }
// );

// export const DeleteBook = createAsyncThunk(
//   'Book/BookData',
//   async () => {
//     const response = await axios.get('https://localhost:7298/books/getAlllBooks');
//     console.log("response", response.data);
//     return response.data;
//   }
// );

const initialState: BookState = {
  value: 0,
  Book: [],
  deletedBooks: [],
  updateBookData: [],
   isLoading: false,
  updateState: false,
  ErrorMsg: null,
  status: 'idle',
  error: null,
  loadingStates: {
    fetchBooks: false,
    deleteBook: false,
    restoreBook: false,
    updateBook: false
  }
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ operation: keyof BookState['loadingStates']; isLoading: boolean }>) => {
      const { operation, isLoading } = action.payload;
      state.loadingStates[operation] = isLoading;
    }
  },


  extraReducers: (builder) => {
    builder
      // Get Books
      .addCase(getBook.pending, (state) => {
        state.status = 'loading';
        state.loadingStates.fetchBooks = true;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loadingStates.fetchBooks = false;
        state.Book = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.status = 'failed';
        state.loadingStates.fetchBooks = false;
        state.error = action.error.message || 'Failed to fetch books';
      })
      // Delete Book
      .addCase(deleteBook.pending, (state) => {
        state.loadingStates.deleteBook = true;
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.loadingStates.deleteBook = false;
        state.status = 'succeeded';
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loadingStates.deleteBook = false;
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete book';
      })
      // Restore Book
      .addCase(RestoreBook.pending, (state) => {
        state.loadingStates.restoreBook = true;
      })
      .addCase(RestoreBook.fulfilled, (state) => {
        state.loadingStates.restoreBook = false;
        state.status = 'succeeded';
      })
      .addCase(RestoreBook.rejected, (state, action) => {
        state.loadingStates.restoreBook = false;
        state.status = 'failed';
        state.error = action.error.message || 'Failed to restore book';
      })
      // Get Deleted Books
      .addCase(getDeletedBook.pending, (state) => {
        state.loadingStates.fetchBooks = true;
      })
      .addCase(getDeletedBook.fulfilled, (state, action) => {
        state.loadingStates.fetchBooks = false;
        state.status = 'succeeded';
        state.deletedBooks = action.payload;
      })
      .addCase(getDeletedBook.rejected, (state, action) => {
        state.loadingStates.fetchBooks = false;
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch deleted books';
      })
      .addCase(GetBookById.fulfilled, (state, action) => {
        state.updateState = true;
        state.updateBookData = action.payload;
        state.status = 'succeeded';
      })
      .addCase(GetBookById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete book';
      })
      .addCase(updateBookData.fulfilled, (state) => {
        state.status = 'succeeded';
        state.updateState = false;
        state.updateBookData = [];
      })
      .addCase(updateBookData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update book';
      })
      .addCase(addBook.fulfilled, (state) => {
        state.status = 'succeeded';
        state.ErrorMsg = null;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.ErrorMsg = action.payload as ApiErrorResponse;
        } else {
          state.ErrorMsg = {
            statusCode: 500,
            message: action.error.message || 'Failed to add book'
          };
        }
      });
  }
});

export const { setLoading } = bookSlice.actions;
export default bookSlice.reducer;
