import { Book } from "../models/book";
import request from 'supertest';
import app from '../app';
import server from '../server';

const bookId = 1;

jest.mock('../utils', () => ({
  __esModule: true,
  ...jest.requireActual('../utils'),
  generateBookId: jest.fn(() => bookId),
}));

describe('Books API endpoints', () => {
  let book: Book;

  beforeAll(() => {
    // Set up a book object for testing
    book = {
      id: bookId,
      title: 'Test Book',
      author: 'Test Author',
      publishedDate: '2022-01-01',
    };
  });

  afterAll(() => {
    server.close();
  })

  describe('GET /api/books', () => {
    it('should return all books', async () => {
      const res = await request(app).get('/api/books');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe('POST /api/books', () => {
    it('should add a new book', async () => {
      const res = await request(app)
        .post('/api/books')
        .send(book);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });

    it('should return an error if book already exists', async () => {
      const res = await request(app)
        .post('/api/books')
        .send(book);

      expect(res.statusCode).toEqual(400);
      expect(res.text).toEqual('Book already exists');
    });
  });

  describe('GET /api/books/:id', () => {
    it('should return a book', async () => {
      const res = await request(app).get(`/api/books/${book.id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(book);
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update an existing book', async () => {
      book.title = 'New Title';
      const res = await request(app)
        .put(`/api/books/${book.id}`)
        .send(book);

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual('New Title');
    });

    it('should return an error if book not found', async () => {
      const res = await request(app)
        .put('/api/books/999')
        .send(book);

      expect(res.statusCode).toEqual(404);
      expect(res.text).toEqual('Book not found');
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete an existing book', async () => {
      const res = await request(app).delete(`/api/books/${book.id}`);

      expect(res.statusCode).toEqual(204);
    });

    it('should return an error if book not found', async () => {
      const res = await request(app).delete('/api/books/999');

      expect(res.statusCode).toEqual(404);
      expect(res.text).toEqual('Book not found');
    });
  });
});