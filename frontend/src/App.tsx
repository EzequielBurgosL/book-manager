import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BooksList } from './components/BooksList/index';
import { BookForm } from './components/BooksForm/index';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/signup" element={<SignUp setAuthenticated={setAuthenticated} />} />
          <Route path='/' element={<PrivateRoute authenticated={authenticated} />}>
            <Route path='/' element={<BooksList />} />
          </Route>
          <Route path='/add-book' element={<PrivateRoute authenticated={authenticated} />}>
            <Route path="/add-book" element={<BookForm />} />
          </Route>
          <Route path='/edit-book/:id' element={<PrivateRoute authenticated={authenticated} />}>
            <Route path="/edit-book/:id" element={<BookForm />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
