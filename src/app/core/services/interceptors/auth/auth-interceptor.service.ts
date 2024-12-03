import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../../token/token.service';
import { routes } from 'src/app/core/core.index';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  
  routes = routes;
  constructor (private tokenService: TokenService, private router : Router) {}
  
  private excludedUrls: string[] = [
    environment.authentication.login,
    environment.authentication.signup
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request URL is in the excluded list
    if (this.isExcludedUrl(req.url)) {
      return next.handle(req);
    }

    const token = this.tokenService.getToken();

    // If token is present, clone the request and add the Authorization header
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        debugger;
        if (error.status === 401) {
          this.tokenService.clearToken();
          this.router.navigate([this.routes.login]);
        }
        else if (error.status === 403) {
          this.router.navigate([this.routes.forbidenError]);
        }
        return throwError(error);
      })
    );
  }

  private isExcludedUrl(url: string): boolean {
    return this.excludedUrls.some(excludedUrl => url.includes(excludedUrl));
  }
}