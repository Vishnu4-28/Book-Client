import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AddBook from './Pages/AddBook/AddBook';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AddBook" element={<AddBook />} />
                <Route path="/UpdateBook/:id" element={<AddBook />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

 

