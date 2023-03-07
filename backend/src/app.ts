import express, { Request, Response } from "express";
import { books } from "./books";
import { Book } from "./models/book";
import bodyparser from 'body-parser';
import { isBookDuplicated } from "./validation";

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/api/books', (req: Request, res: Response) => {
  try {
    res.send(books);
  } catch (error) {
    console.log('error: ', error);
  }
});

app.post('/api/books', (req: Request, res: Response) => {
  try {
    const book: Book = req.body;

    if (isBookDuplicated(books, book)) {
      res.status(400).send('Book already exists');
    } else {
      book.id = books.length + 1;
      books.push(book);
      res.send(book);
    }
  } catch (error) {
    console.log('error: ', error);
  }
});

app.put('/api/books/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const book: Book = req.body;
    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
      res.status(404).send('Book not found');
    } else {
      books[index] = book;
      res.send(book);
    }
  } catch (error) {
    console.log('error: ', error);
  }
});

app.delete('/api/books/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
      res.status(404).send('Book not found');
    } else {
      books.splice(index, 1);
      res.sendStatus(204);
    }
  } catch (error) {
    console.log('error: ', error);
  }
});

export default app;
