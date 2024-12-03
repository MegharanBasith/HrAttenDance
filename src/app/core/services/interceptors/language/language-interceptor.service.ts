import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the language from local storage or set a default
    const language = localStorage.getItem('language') || 'en'; // Default to 'en' if not set

    // Clone the request to add the new header
    const clonedRequest = req.clone({
      setHeaders: {
        'Language': language
      }
    });

    // Pass the cloned request to the next handler
    return next.handle(clonedRequest);
  } 
}
