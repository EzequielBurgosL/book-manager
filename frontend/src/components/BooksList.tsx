import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Book } from '../types';

export function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/books').then((response) => {
      setBooks(response.data);
    });
  }, []);

  function handleDelete(id?: number) {
    if (!id) return console.log('unable to delete book, missing book "id"');

    axios.delete(`http://localhost:3000/api/books/${id}`).then(() => {
      const filteredBookList = books.filter(book => book.id !== id);
      setBooks(filteredBookList);
    });
  }

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
          {books.map((book, index) => (
            <tr key={`${book.id}-${index}`}>
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
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
