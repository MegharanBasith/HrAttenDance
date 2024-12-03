import { Component, OnInit } from '@angular/core';
import { Isettings } from '../settings/setting';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { routes } from 'src/app/core/core.index';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-workdayhour',
  templateUrl: './workdayhour.component.html',
  styleUrl: './workdayhour.component.scss'
})
export class WorkdayhourComponent  implements OnInit{
  
  public routes=routes;
  constructor(public emp:EmployeeService,private settingservice:SettingsService){}
  customerId:string=this.settingservice.customerId;
  employeeId:string=this.settingservice.employeeId;
  Editemployee: boolean = false;


  ngOnInit(): void {
    debugger;
    if(this.employeeId =='' || this.employeeId == null || this.employeeId == undefined|| this.employeeId == "undefined"){
      Swal.fire("Employee Id", "Notfound", "warning");
    }
    else{
      this.getempwork();
    } 
  }
 
  
settings:Isettings[]=[]  
  getempwork(){
    this.emp.GetWorkDayHourbyEmployee(this.customerId,this.employeeId).subscribe(
      (response:any)=>{
       this.settings=response.data;
      },
      (error)=>{
        console.error(error)
      }
    )
  }
}
