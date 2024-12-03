import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { I_Employee } from '../all-attedance/attendance';
import { I_Location } from '../my-location/Interface.components';
import { I_locationforEmployee } from '../all-location/locationforemployee';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { DataService } from 'src/app/core/core.index';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
 
@Component({
  selector: 'app-employee-location',
  templateUrl: './employee-location.component.html',
  styleUrl: './employee-location.component.scss'
})
export class EmployeeLocationComponent implements OnInit{
  employeeLocationCreatingObj:I_locationforEmployee={
    clientId: '',
    employeeERBId: '',
    locationId: 0
  };
  constructor(private  emp: EmployeeService,
    private router: Router,
    private dataService:DataService,
    private settingservice:SettingsService
  ) {}
  customerId:any=this.settingservice.customerId;
  employeeId:any=this.settingservice.employeeId;;
  ngOnInit() {
    debugger;
    // if(this.employeeId =='' || this.employeeId == null || this.employeeId == undefined|| this.employeeId == "undefined"){
    //   Swal.fire("Employee Id", "Notfound", "warning");
    // }
    this.getEmployeeLocation();
    this.GetDistinctEmployeeList();
    this.GetDistinctEmployees();
    this.customerDDL = [this.settingservice.customerId]
  };
  employeeDDL: I_Employee[] = [];
  customerDDL: any[] = [];
  allLocationList:I_Location [] = [];
  allLocationddl:I_Location [] = [];
  onUpdate: boolean = false;
 
 
  getLocationDDL(){
    this.emp.getAllLocation(this.customerId).subscribe(
      (res:any) => {
        debugger;
       this.allLocationddl = res.data;
    },
    (error:any) => {
      console.error(error);
     }
    )
  };
  getEmployeeLocation() {
    this.emp.GetAllAllowedLocations(this.customerId,this.employeeId).subscribe(
      (success:any) => {
            this.allLocationList = success.data;
    },
    (error:any) => {
      console.error(error);
    }
  );
  };
 
 
  ProjectId:any;
  GetDistinctEmployeeList() {
    debugger;
    this.ProjectId = localStorage.getItem("projectId");
    this.emp.getActiveEmployeeList(this.ProjectId).subscribe(
      (res:any)=>{
      this.employeeDDL = res.data.employeeList;
    });
  }
 
  CustomerId:any;
  LoggedCustomerEmployeeDDL:any;
  GetDistinctEmployees() {
    debugger;
    this.CustomerId = this.settingservice.customerId;
    this.emp.GetDistinctEmployees(this.CustomerId).subscribe(
      (res:any)=>{
      this.LoggedCustomerEmployeeDDL = res.data;
    });
  }
 
 
  createEmployeeLocation() {
    this.getLocationDDL();
    this.employeeLocationCreatingObj = {
      clientId: this.customerId,
      employeeERBId: this.employeeId,
      locationId: null
    }
  };
 
  deleteAllowedLocationfromData(item:any) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to Delete this data?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fe8c31',
      cancelButtonColor: '#fd7951',
      confirmButtonText: 'Delete',
     
    }).then((result) => {
      if (result.isConfirmed) {
        this.emp.deleteAllowedLocationforEmployee(item.id,item.clientId,item.erbId).subscribe(
          (success: any) => {
            this.getEmployeeLocation();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
          (error: any) => {
            this.getEmployeeLocation();
            console.error(error);
          }
        );
      }
    });
  }
 
 
  closepopup(){
    this.onUpdate=false;
    this.employeeLocationCreatingObj.employeeERBId='';
  }
 
  submitPostLocationData() {
   debugger;
    if (!(this.employeeLocationCreatingObj.clientId && this.employeeLocationCreatingObj.employeeERBId && this.employeeLocationCreatingObj.locationId)) {
      Swal.fire("Add employee Location", "fill all fields", "warning");
      return
    }
 
    this.emp.AllowedLocationforEmployee(this.employeeLocationCreatingObj).subscribe(
      (response: any) => {
        debugger;
        Swal.fire("Location", "created Successfully", "success");
        this.getEmployeeLocation();
        this.employeeLocationCreatingObj = {
          clientId: null,
          employeeERBId: null,
          locationId: null
        }
 
      },
      (error:any) => {
        debugger;
        if(error.status === 409)
          Swal.fire("Error","Location already found for the selected employee");
        if (error.status === 201) {
          Swal.fire('Success', error.error.text);
        }
        if(error.status === 500){
          Swal.fire("Error", error.error);
        }
        if(error.status === 200){
          Swal.fire("Success", error.error.text);
        }
        this.getEmployeeLocation();
        console.log(error);
      }
    )
}
 
}
