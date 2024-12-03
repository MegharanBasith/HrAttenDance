import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiCallerService: ApiCallerService) { }

  createUser(model : any) {
    return this.apiCallerService.post(environment.baseUrl, environment.user.create , model);
  }

  getuserList(clientId : string, pageStartIndex : number, pageSize: number) {
    const params = {pageStartIndex, pageSize};
    return this.apiCallerService.get(environment.baseUrl, environment.user.list + clientId, params);
  }

  updateUserStatus(userId: string, status : number) {
    const model = {"UserId": userId, "UserStatus": status};
    return this.apiCallerService.put(environment.baseUrl, environment.user.updateStatus, model);
  }
}
