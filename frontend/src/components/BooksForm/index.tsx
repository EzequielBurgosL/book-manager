import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Book } from '../../types';
import './index.css'

export function BookForm() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/books/${id}`).then((response) => {
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setPublishedDate(book.publishedDate);
      });
    }
  }, [id]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const book: Book = {
      title,
      author,
      genre,
      publishedDate,
    };

    if (id) {
      const updatedBook = { ...book, id: Number(id) };
      axios.put(`http://localhost:3000/api/books/${id}`, updatedBook).then(() => {
        navigate('/');
      });
    } else {
      axios.post('http://localhost:3000/api/books', book).then(() => {
        navigate('/');
      });
    }
  }

  function handleDelete() {
    axios.delete(`http://localhost:3000/api/books/${id}`).then(() => {
      navigate('/');
    });
  }

  return (
    <div className='form-container'>
      <h2 className='form-header'>{id ? 'Edit Book' : 'New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            type="text"
            className="form-control"
            id="genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Published Date
          </label>
          <input
            type="text"
            className="form-control"
            id="publisedDate"
            value={publishedDate}
            onChange={(event) => setPublishedDate(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        {id && (
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
}