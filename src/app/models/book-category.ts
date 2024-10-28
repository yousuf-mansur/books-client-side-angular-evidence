import { Book } from './book';

export interface BookCategory {
  bookCategoryId: number;
  categoryName: string;
  books: Book[];
}
