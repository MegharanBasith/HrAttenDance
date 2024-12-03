import { Injectable } from '@angular/core';
import { Role } from '../../models/enums/role';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private userRoleKey: string = 'userRole';

  constructor() { }


  setUserRole(token: string): void {
    localStorage.setItem(this.userRoleKey, token);
  }

  private getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }

  isAdmin() {
    if (Number(this.getUserRole()) === Role.HrAdmin)
      return true;
    
    return false;
  }
}
