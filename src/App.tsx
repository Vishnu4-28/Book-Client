import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AddBook from './Pages/AddBook/AddBook';
import Signup from './Pages/Signup/Signup';
import SignIn from './Pages/SignIn/SignIn';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<SignIn />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/AddBook"
                    element={
                        <ProtectedRoute>
                            <AddBook />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/UpdateBook/:id"
                    element={
                        <ProtectedRoute>
                            <AddBook />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

 

