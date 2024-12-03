import { Injectable } from '@angular/core';
import { ApiCallerService } from '../api-caller/api-caller.service';
import { environment } from '../../../environments/environment';
import { PayGroupSubmitModel } from '../../models/payGroup/PayGroupSubmit-model';

@Injectable({
  providedIn: 'root'
})
export class PayGroupPeriodService {

  constructor(private apiCallerService: ApiCallerService) { }


  getPayGroupPeriodList(ProjectId:string, pageStartPosition: number, pageSize: number) {
    const params = {ProjectId, pageStartPosition, pageSize };
    return this.apiCallerService.get(environment.baseUrl, environment.PayGroupPeriod.payGroupPeriodList, params);
  }

  submitPayGroupPeriod(model: PayGroupSubmitModel) {
    return this.apiCallerService.post(environment.baseUrl, environment.PayGroupPeriod.payGroupPeriodSumit, model);
  }

}
