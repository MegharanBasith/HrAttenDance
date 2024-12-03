import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {
  constructor(private http: HttpClient) {}

  get<T>(baseUrl:string, endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<T>(`${baseUrl}/${endpoint}`, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  post<T>(baseUrl : string, endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${baseUrl}/${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  put<T>(baseUrl : string, endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${baseUrl}/${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  patch<T>(baseUrl : string, endpoint: string, body?: any): Observable<T> {
    return this.http.patch<T>(`${baseUrl}/${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  delete<T>(baseUrl: string, endpoint: string): Observable<T> {
    return this.http.delete<T>(`${baseUrl}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle error appropriately here
    console.error('An error occurred:', error.message);
    return throwError(()=> new Error(error?.error?.message ?? 'Something bad happened; please try again later.'));
  }
}
