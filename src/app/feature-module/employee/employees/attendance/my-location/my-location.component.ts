import { Component, OnInit } from '@angular/core';
import { I_Location } from './Interface.components';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-location',
  templateUrl: './my-location.component.html',
  styleUrl: './my-location.component.scss'
})
export class MyLocationComponent implements OnInit{

  constructor(private emp: EmployeeService,private settingservice:SettingsService) {}
  customerId:string=this.settingservice.customerId;
  employeeId:string=this.settingservice.employeeId;
 

  ngOnInit():void {
    if(this.employeeId =='' || this.employeeId == null || this.employeeId == undefined|| this.employeeId == "undefined" || this.employeeId == "null"){
      this.getTableData(true);
    }
    else{
      this.getTableData();
    }
  };
  myLocations:I_Location [] = []

   getTableData(getByCustomer:boolean=false){ 
    debugger;
    if (getByCustomer) {
      this.emp.GetMainLocation(this.customerId).subscribe(
        (success: any) => {
          this.myLocations.push(success.data);
        },
        (error: any) => {
          console.error(error);
        }
      )
    } else {
      this.emp.getMyLocation(this.customerId, this.employeeId).subscribe(
        (success: any) => {
          this.myLocations.push(success.data);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  };
}
