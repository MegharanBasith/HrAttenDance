import { Component, OnDestroy, OnInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { I_LocationLatAndLog, IAttendance } from './attendance';
import { DistanceService } from './distance.service';
import { I_Location } from '../my-location/Interface.components';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-attendance',
  templateUrl: './my-attendance.component.html',
  styleUrl: './my-attendance.component.scss'
})
export class MyAttendanceComponent implements OnInit,OnDestroy {

punchstatus:any;
punchActivitystatus:any;
  public routes = routes;
  selectedyear:number=0;
  selectedmonth:number=0;
  years: number[] = [2019, 2020, 2021, 2022, 2023,2024];
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2},
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
  

  isVisible: boolean = false;
  distance: number | undefined;


  constructor(public emp:EmployeeService,private settingservice:SettingsService, private empdistance:DistanceService){}
  customerId:string=this.settingservice.customerId;
employeeId:string=this.settingservice.employeeId;
  ngOnInit() {
    debugger;
      if (
      this.employeeId == '' ||
      this.employeeId == null ||
      this.employeeId == "null" ||
      this.employeeId == undefined ||
      this.employeeId == 'undefined'
    ) {
      Swal.fire('Employee Id', 'Notfound', 'warning');
    }
    else{
      this.getCurrentLocation();
      this.setCurrentDate();
      this.getEmployeeList();
      this.putPunchStatus();
      this.getMyLocation();
      this.punchActivity();
    }   
  }
  
  attendances:IAttendance[]=[];
  myLocation:I_Location | any = null;
  customerLocation : I_LocationLatAndLog = {
    latitude: 0,
    longitude: 0
  };
  ispunchout:boolean=false;
  punchout:any;

  addEmployeeattendanceIn(){

    this.emp.punchIn(this.customerId,this.employeeId).subscribe(
     (response : any) => {
        if(response )
        {
          this.putPunchStatus();
         this.punchActivity();
         
        }
     },
     (error) => {
       console.error(error);
     }
   )
 }

 addEmployeeattendanceout(){
  this.emp.punchOut(this.customerId,this.employeeId).subscribe(
   (response : any) => {
      if(response)
      {
        this.putPunchStatus();
       this.punchActivity();
      //  this.calculateDistance();
      }
   },
   (error) => {
     console.error(error);
   }
 )
}
getEmployeeList(){
  this.emp.getAttList(this.selectedyear,this.selectedmonth,this.employeeId, this.customerId).subscribe(
    (response:any)=>{
     this.attendances=response.data;
    },
    (error)=>{
      console.error(error)
    }
  )
}
putPunchStatus(){
  this.emp.punchstatus(this.employeeId).subscribe(
    (response:any)=>{
      this.punchstatus=response.data;
      this.ispunchout = this.punchstatus?.isPunchIn;
      this.startTimer();
      this.getEmployeeList();
    },
    (error)=>{
      console.error(error)
    }
  )
}
punchActivity(){
  this.emp.getPunchActivity(this.employeeId).subscribe(
    (response: any) => {
      this.punchActivitystatus = response.data.sort((a:any, b:any) => {
        if (a.id > b.id) {
          return -1;
        }
        if (a.id < b.id) {
          return 1;
        }
        return 0;
      });
    },
    (error)=>{
      console.error(error)
    }
  )
}





getMyLocation() {
  this.emp.getMyLocation(this.customerId,this.employeeId).subscribe(
    (success:any) => {
      debugger;
    this.myLocation = success.data;
    let _latandLog = this.myLocation?.latLong;
    if(_latandLog) {
      this.targetLocation.lat = parseFloat((_latandLog.split(",")[0]));
      this.targetLocation.lng = parseFloat(_latandLog.split(",")[1]);
    }

    this.distanceBwLocation  = this.empdistance.isWithinDistance(this.userLocation,this.targetLocation);
    
    if(this.distanceBwLocation <= this.myLocation?.distance){
      this.isVisible = true
    }else{
      this.isVisible=false
    }

  },
  (error:any) => {
    console.error(error);
  }
);
};
setCurrentDate() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); 
  const currentYear = currentDate.getFullYear(); 

  this.selectedmonth = this.months[currentMonth].value; 
  this.selectedyear = this.years.find(year => year === currentYear)|| this.years[0];

}

private timerInterval: any; 
startTimer(): void {

  this.updateElapsedTime(this.punchstatus?.punchTime); // Update the timer initially

  // Update the timer every second
  this.timerInterval = setInterval(() => {
    this.updateElapsedTime(this.punchstatus?.punchTime);
  }, 1000); // Call this every second
}
stopTimer(): void {
  if (this.timerInterval) {
    clearInterval(this.timerInterval);
  }
}
elapsedTime: string = '00:00:00';
updateElapsedTime(punchInTime:string):void {
  
  const now = new Date();
  const Milliseconds = now.getTime() - new Date(punchInTime).getTime();


  const hours = Math.floor(Milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((Milliseconds / (1000 * 60)) % 60);
  const seconds = Math.floor((Milliseconds / 1000) % 60);


  this.elapsedTime =  `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
}
formatTime(value: number): string {
  return value < 10 ? '0' + value : value.toString();
}

ngOnDestroy(): void {
  this.stopTimer(); // Stop the timer when the component is destroyed
}
display:any;
  center:google.maps.LatLngLiteral={
    lat:0,
    lng:0
  };
  userLocation:  google.maps.LatLngLiteral | any = { lat:0, lng: 0};
  targetLocation: google.maps.LatLngLiteral | any = { lat:0, lng: 0}; 
  zoom=6;
  moveMap(event:google.maps.MapMouseEvent){
    if(event.latLng !=null)this.center=(event.latLng.toJSON());
  }
  move(event:google.maps.MapMouseEvent){
    if(event.latLng != null)this.display=event.latLng.toJSON();
  }
  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.zoom = 12; 
          this.userLocation =this.center; 
        },
        (error) => {
          console.error('Error getting location: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  distanceBwLocation:number=0;
  
}