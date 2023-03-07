import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BooksList } from './components/BooksList';
import { BookForm } from './components/BookForm';
// import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
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
