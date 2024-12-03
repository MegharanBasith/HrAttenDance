import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { Signup } from '../../models/signup';
import { environment } from 'src/app/environments/environment';
import { Login } from '../../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService  {
  baseUrl:string = environment.baseUrl;
  constructor(private apiCallerService : ApiCallerService) {}

  signup(signup :Signup){
    return this.apiCallerService.post(this.baseUrl, environment.authentication.signup, signup);
  }

  login(login :Login){
    return this.apiCallerService.post(this.baseUrl, environment.authentication.login, login);
  }

  doesEmailExist(email : string){
    const params = {email};
    return this.apiCallerService.get(this.baseUrl, environment.authentication.emailExist, params);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
