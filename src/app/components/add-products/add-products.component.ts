import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { BookCategory } from '../../models/book-category';
import { Book } from '../../models/book';

@Component({
  selector: 'app-add-books',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-books.component.html',
  styleUrl: './add-books.component.css',
})
export class AddBooksComponent {
  constructor(private service: BooksService, private router: Router) {}

  bookObj: Book = {
    bookId: 0,
    bookName: '',
    isbnNumber: '',
    writer: '',
    standardCost: 0,
    listPrice: 0,
    edition: 0,
    pages: 0,
    bookCategoryId: 0,
  };

  bookList: Book[] = [];

  bookCategory: BookCategory = {
    categoryName: '',
    bookCategoryId: 0,
    books: [],
  };

  addBook() {
    if (this.bookObj.bookName != '' && this.bookObj.bookName != null) {
      var exp = JSON.stringify(this.bookObj);
      var obj = JSON.parse(exp);
      this.bookList.unshift(obj);

      this.bookObj = {
        bookId: 0,
        bookName: '',
        isbnNumber: '',
        writer: '',
        standardCost: 0,
        listPrice: 0,
        edition: 0,
        pages: 0,
        bookCategoryId: 0,
      };
    }
  }
  deleteBook(p: Book, array: any[]) {
    const row = array.findIndex(
      (obj) =>
        obj.bookName == p.bookName &&
        obj.writer == p.writer &&
        obj.isbnNumber == p.isbnNumber
    );
    if (row > -1) {
      array.splice(row, 1);
    }
  }
  addBookCategory() {
    const cate: BookCategory = {
      books: this.bookList,
      categoryName: this.bookCategory.categoryName,
      bookCategoryId: this.bookCategory.bookCategoryId,
    };
    this.service.addBookAndCategory(cate).subscribe({
      next: (x) => {
        this.router.navigate(['books']);
      },
    });
  }
}
