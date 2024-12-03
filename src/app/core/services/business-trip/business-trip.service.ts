import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessTripService {
 baseUrl:string = environment.baseUrl;
  constructor(private apiCallerService : ApiCallerService) { }

  getRequestList(projId : string, startIndex: number, pageSize : number) {
    const params = {startIndex, pageSize};
    return this.apiCallerService.get(this.baseUrl, environment.businessTrip.requestList + projId, params);
  }

  createRequest(model : any) {
    return this.apiCallerService.post(this.baseUrl, environment.businessTrip.create, model);
  }

  editRequest(id:string, model : any) {
    return this.apiCallerService.put(this.baseUrl, environment.businessTrip.edit + id, model);
  }
  
  getRequestDestinationList(id : string) {
    return this.apiCallerService.get(this.baseUrl, environment.businessTrip.requestDestinations + id);
  }

  getDestinationList() {
    return this.apiCallerService.get(this.baseUrl, environment.businessTrip.destinations);
  }

  deleteBusinessTrip(id : string){
    return this.apiCallerService.delete(this.baseUrl, environment.businessTrip.delete + id);
  }
}
