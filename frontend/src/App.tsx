import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BooksList } from './components/BooksList/index';
import { BookForm } from './components/BooksForm/index';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<BooksList/>} />
          <Route path="/add-book" element={<BookForm/>} />
          <Route path="/edit-book/:id" element={<BookForm/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
