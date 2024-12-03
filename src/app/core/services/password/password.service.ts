import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private apiCallerService: ApiCallerService) { }

  resetPassword(model : any) {
    return this.apiCallerService.post(environment.baseUrl, environment.password.reset, model);
  }}
