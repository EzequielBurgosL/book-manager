import express, { Request, Response } from "express";
import bodyparser from 'body-parser';
import { books } from "./books";
import { Book } from "./models/book";
import { isBookDuplicated } from "./validation";
import { generateBookId } from "./utils";
const cors = require('cors');

const app = express();
app.use(cors()) // enable all CORS requests
app.use(bodyparser.json()); // parse application/json
app.use(bodyparser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.get('/api/books', (req: Request, res: Response) => {
  try {
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/books/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
      res.status(404).send({});
    } else {
      res.send(books[index]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/books', (req: Request, res: Response) => {
  try {
    const book: Book = req.body;

    if (isBookDuplicated(books, book)) {
      res.status(400).send('Book already exists');
    } else {
      book.id = generateBookId();
      books.push(book);
      res.send(book);
    }
  } catch (error) {
    res.status(500).send(error);
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
    res.status(500).send(error);
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
    res.status(500).send(error);
  }
});

export default app;
