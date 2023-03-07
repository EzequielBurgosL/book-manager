import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Book } from '../types';

export function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/books').then((response) => {
      console.log('response: ', response);
      setBooks(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Books List</h2>
      <Link to="/add-book" className="btn btn-primary mb-3">
        Add Book
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>
                <Link
                  to={`/edit-book/${book.id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  Edit
                </Link>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
