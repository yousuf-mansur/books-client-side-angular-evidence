import { Routes } from '@angular/router';
import { ViewBooksComponent } from './components/view-products/view-books.component';
import { AddBooksComponent } from './components/add-products/add-products.component';
import { EditBooksComponent } from './components/edit-products/edit-products.component';

export const routes: Routes = [
  { path: '', component: ViewBooksComponent },
  { path: 'books', component: ViewBooksComponent },
  { path: 'addBook', component: AddBooksComponent },
  { path: 'addBook/edit/:id', component: EditBooksComponent },
];
