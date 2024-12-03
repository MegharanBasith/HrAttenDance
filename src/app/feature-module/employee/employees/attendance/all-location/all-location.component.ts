import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { I_Location } from '../my-location/Interface.components';
import { Validators } from 'ngx-editor';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
 
@Component({
  selector: 'app-all-location',
  templateUrl: './all-location.component.html',
  styleUrl: './all-location.component.scss',
})
export class AllLocationComponent implements OnInit {
  constructor(private  emp: EmployeeService,private router: Router,private settingservice:SettingsService) {}
  customerId:any=this.settingservice.customerId;
  employeeId:string=this.settingservice.employeeId
  ngOnInit() {
    debugger;
    this.getTableData();
    this.customerDDL = [this.settingservice.customerId]
  };
 
  customerDDL: any[] = [];
  allLocationList:I_Location [] = []
  onUpdate: boolean = false;
 
 
  createFromlocation: FormGroup = new FormGroup({
    id: new FormControl(0),
    createdOn: new FormControl(new Date),
    createdBy: new FormControl(null),
    updatedOn: new FormControl(null),
    updatedBy: new FormControl(null),
    customer: new FormControl([null, [Validators.required]]),
    locationId: new FormControl(null),
    latLong: new FormControl(null),
    mapLink: new FormControl(null),
    description: new FormControl(null),
    distance:new FormControl(null),
    isMain:new FormControl(null)
  });
 
  getTableData(){
    this.emp.getAllLocation(this.customerId).subscribe(
      (res:any) => {
       this.allLocationList = res.data;
    },
    (error:any) => {
      console.error(error);
     }
    )
  };
 
  getCustomerLocation(){
      this.getTableData();
  }
 
  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if(position?.coords?.latitude ){
          let latlog = position.coords.latitude + "," + position.coords.longitude;
          if (latlog)
            this.createFromlocation.get('latLong')?.setValue(latlog);
        }
        },
        (error) => {
          console.error('Error getting location: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
 
 
 
  openCreateLocation() {
    this.createFromlocation.reset();
    this.getCurrentLocation();
    this.createFromlocation.get('customer')?.setValue(this.customerId);
  };
 
 
  setDefultValue() {
    let createOnValue = new Date();
    let updateOnvalue = new Date();
 
    this.createFromlocation.get('locationId')?.setValue('001');
    this.createFromlocation.get('createdBy')?.setValue('admin');
    this.createFromlocation.get('createdOn')?.setValue(createOnValue);
    this.createFromlocation.get('id')?.setValue(0);
    this.createFromlocation.get('updatedOn')?.setValue(updateOnvalue);
    this.createFromlocation.get('updatedBy')?.setValue('admin');
    this.createFromlocation.get('mapLink')?.setValue('mapLink');
  };
 
 
 
  submitPostLocationData() {
   debugger;
    this.setDefultValue();
    let fromValues:any ={
      clientId : this.createFromlocation.value.customer,
      latLong : this.createFromlocation.value.latLong,
      mapLink : this.createFromlocation.value.mapLink,
      description : this.createFromlocation.value.description,
      locationId: this.createFromlocation.value.locationId,
      createdBy:this.createFromlocation.value.createdBy,
      distance:this.createFromlocation.value.distance,
      isMain:this.createFromlocation.value.isMain?? false
    };
   
    this.emp.UpsertLocation(fromValues).subscribe(
      (success: any) => {
        this.getTableData();
        //this.postAddLocation(success)
        Swal.fire({
          title: 'Location',
          text: 'Created Successfully.',
        });
      },
      (error: any) => {
        console.error(error);
        Swal.fire({ title: 'Location', text: 'Created is Error!' });
      }
    );
    this.createFromlocation.reset();
  };
 
  // postAddLocation(data:I_Location){
  //   this.emp.postAddLocation(data).subscribe(
  //     (success:any)=>{
  //       this.allLocationList=success
  //     }
  //   )
  // }


  editFromData(value: any) {
    debugger;
    this.createFromlocation.patchValue({
      id: value.id,
      createdOn: value.createdOn,
      createdBy: value.createdBy,
      updatedOn: value.updatedOn,
      updatedBy: value.updatedBy,
      customer: value.clientId,
      locationId: value.locationId,
      latLong: value.latLong,
      mapLink: value.mapLink,
      description: value.description,
      distance:value.distance,
      isMain:value.isMain
    });
    this.onUpdate = true;
  };
 
  updateFromData() {
    debugger;
    let fromValues:any ={
      id: this.createFromlocation.value.id,
      clientId : this.createFromlocation.value.customer,
      latLong : this.createFromlocation.value.latLong,
      mapLink : this.createFromlocation.value.mapLink,
      description : this.createFromlocation.value.description,
      createdBy:this.createFromlocation.value.createdBy,
      distance:this.createFromlocation.value.distance,
      updatedOn: this.createFromlocation.value.updatedOn,
      updatedBy: this.createFromlocation.value.updatedBy,
      createdOn: this.createFromlocation.value.createdOn,
      isMain:this.createFromlocation.value.isMain
    };
    let id:any =this.createFromlocation.value.id;
    this.emp.UpsertLocation(fromValues).subscribe((success:any) => {
      this.getTableData();
      Swal.fire({
        title: 'Location',
        text: 'Update is Success.',
      });
    },
    (error:any) => {
      console.error(error);
      Swal.fire({ title: 'Location', text: 'Update has Error!' });
    }
    );
    this.createFromlocation.reset();
    this.onUpdate = false;  
  }
 
  deleteFromData(id: number,isMain : boolean| undefined) {
    debugger;
    if(isMain===true){
      Swal.fire({ title: 'Location', text: 'You can not delete Main Location' });
      return  
    }
    
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to Delete this data?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fe8c31',
      cancelButtonColor: '#fd7951',
      confirmButtonText: 'Delete',
     
    }).then((result) => {
      if (result.isConfirmed && id) {
        this.emp.deleteAllLocation(id).subscribe(
          (success: any) => {
            this.getTableData();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
          (error: any) => {
            console.error(error);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been error to delete.',
              icon: 'warning',
            });
          }
        );
      }
    });
  }
 
  closepopup(){
    this.createFromlocation.reset();
    this.onUpdate=false;
  }
 
 
 
}