import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { BookCategory } from '../../models/book-category';

@Component({
  selector: 'app-edit-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-books.component.html',
  styleUrl: './edit-books.component.css',
})
export class EditBooksComponent implements OnInit {
  constructor(
    private service: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
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
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.service.getCategoryAndBookById(Number(id)).subscribe({
            next: (res) => {
              this.bookList = res.books;
              this.bookCategory = {
                bookCategoryId: res.bookCategoryId,
                categoryName: res.categoryName,
                books: this.bookList,
              };
            },
          });
        }
      },
    });
  }
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
  updateBookCategory() {
    this.service
      .updateBookAndCategory(
        this.bookCategory.bookCategoryId,
        this.bookCategory
      )
      .subscribe({
        next: () => {
          alert('Update Successfully');
          // this.route
          this.router.navigate(['/books']);
        },
      });
  }
}
