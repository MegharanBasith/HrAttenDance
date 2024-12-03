import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey: string = 'jwtToken';

  // Save the token in localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Clear the token from localStorage
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
