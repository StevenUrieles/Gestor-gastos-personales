import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Expense, CategoryEnum } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:8080/api/expenses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  getByCategory(category: CategoryEnum): Observable<Expense[]> {
    return this.http
      .get<Expense[]>(`${this.apiUrl}/category/${category}`)
      .pipe(catchError(this.handleError));
  }

  getByDate(date: string): Observable<Expense[]> {
    return this.http
      .get<Expense[]>(`${this.apiUrl}/date/${date}`)
      .pipe(catchError(this.handleError));
  }

  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense).pipe(catchError(this.handleError));
  }

  update(id: number, expense: Partial<Expense>): Observable<Expense> {
    return this.http
      .put<Expense>(`${this.apiUrl}/${id}`, expense)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Ocurrió un error inesperado.';
    if (error.status === 0) {
      message = 'No se puede conectar al servidor. Verifica que el backend esté activo.';
    } else if (error.status === 404) {
      message = 'Recurso no encontrado.';
    } else if (error.status === 400) {
      message = 'Datos inválidos. Verifica el formulario.';
    }
    return throwError(() => new Error(message));
  }
}
