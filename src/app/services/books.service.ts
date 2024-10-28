import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookCategory } from '../models/book-category';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl: string = 'https://localhost:7213/BookCategories';
  constructor(private http: HttpClient) {}
  // http=inject(HttpClient);

  getAllBookWithCategory(): Observable<BookCategory[]> {
    return this.http.get<BookCategory[]>(this.baseUrl);
  }

  deleteBookWithCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getCategoryAndBookById(cateId: number) {
    return this.http.get<BookCategory>(this.baseUrl + `/${cateId}`);
  }
  updateBookAndCategory(
    cateId: number,
    category: BookCategory
  ): Observable<BookCategory> {
    return this.http.put<BookCategory>(this.baseUrl + `/${cateId}`, category);
  }
  addBookAndCategory(category: BookCategory): Observable<BookCategory> {
    return this.http.post<BookCategory>(this.baseUrl, category);
  }
}
