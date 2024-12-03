import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  constructor(private apiCallerService : ApiCallerService) { }

  getContractAlowances(){
    return this.apiCallerService.get(environment.baseUrl, environment.static.getContractAlowances);
  }

  getProfessions(){
    return this.apiCallerService.get(environment.baseUrl, environment.static.getProfessions);
  }

  getNationalities(){
    return this.apiCallerService.get(environment.baseUrl, environment.static.getNationalities);
  }

  getRoles(){
    return this.apiCallerService.get(environment.baseUrl, environment.static.getRoles);
  }

  getAnnualLeaveTypes(){
    return this.apiCallerService.get(environment.baseUrl, environment.static.getAnnualLeaveTypes);
  }
}
