import { Book } from "src/models/book";

export function isBookDuplicated(collection: Book[], book: Partial<Book>): boolean {
  return collection.some(b => {
    return b.title === book.title &&
      b.author === book.author &&
      b.publishedDate === book.publishedDate
  });
}