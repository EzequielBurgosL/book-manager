import { isBookDuplicated } from '.'
import { Book } from '../models/book'

const collection: Book[] = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publishedDate: '1960-07-11'
  },
  {
    id: 2,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    publishedDate: '1937-09-21'
  },
  {
    id: 3,
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    publishedDate: '1954-07-29'
  }
];

describe('isBookDuplicated', () => {
  it('should return false when the collection is empty', () => {
    const book = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedDate: '1925-04-10'
    };

    expect(isBookDuplicated([], book)).toBe(false);
  });

  it('should return false when the book is not in the collection', () => {
    const book = {
      id: 4,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      publishedDate: '1951-07-16'
    };

    expect(isBookDuplicated(collection, book)).toBe(false);
  });

  it('should return false when the book with same title and author but different publishedDate is in the collection', () => {
    const book = {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      publishedDate: '1957-09-21'
    };

    expect(isBookDuplicated(collection, book)).toBe(false);
  });

  it('should return true when the book is in the collection', () => {
    const book = {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      publishedDate: '1937-09-21'
    };

    expect(isBookDuplicated(collection, book)).toBe(true);
  });
});
