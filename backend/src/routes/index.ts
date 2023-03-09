import express, { Request, Response } from "express";
import { books } from "../db/books";
import { Book } from "../models/book";
import { isBookDuplicated } from "../validation";
import { Authentication, generateBookId } from "../utils";
const fs = require('fs');

const app = express();
const auth = new Authentication();
const isAuthenticated = auth.isAuthenticated.bind(auth);

app.get('/api/books', isAuthenticated, (req: Request, res: Response) => {
  try {
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/books/:id', isAuthenticated, (req: Request, res: Response) => {
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

app.post('/api/books', isAuthenticated, (req: Request, res: Response) => {
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

app.put('/api/books/:id', isAuthenticated, (req: Request, res: Response) => {
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

app.delete('/api/books/:id', isAuthenticated, (req: Request, res: Response) => {
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

// handle sign-up requests
app.post('/api/signup', (req: Request, res: Response) => {
  const usersFile = 'users.json';
  const { username, password } = req.body;

  // check if username already exists
  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find((user: { username: string }) => {
    return user.username === username;
  });

  if (user && Object.keys(user).length) {
    res.status(409).json({ error: 'Username already exists' });
  } else {
    // add new user to the users file
    users.push({ username, password });
    fs.writeFileSync(usersFile, JSON.stringify(users));

    // send success response
    auth.isUserAuthenticated = true;
    res.status(200).json({ success: true });
  }
});

export default app;