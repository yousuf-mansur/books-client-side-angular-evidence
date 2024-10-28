import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { BookCategory } from '../../models/book-category';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-books.component.html',
  styleUrl: './view-books.component.css',
})
export class ViewBooksComponent implements OnInit {
  constructor(private service: BooksService, private router: Router) {}
  bookList: BookCategory[] = [];
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.getAllBookWithCategory().subscribe((res) => {
      this.bookList = res;
    });
  }

  deleteItem(category: BookCategory) {
    const isConfirm = confirm(
      'Are Your sure to delete this' + category.categoryName
    );
    if (isConfirm) {
      this.service
        .deleteBookWithCategory(category.bookCategoryId)
        .subscribe((res) => {
          alert('Delete Successfully');
          this.getList();
        });
    }
  }
}
