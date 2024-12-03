export interface IAttendance{
  id: number,
createdOn: string,
createdBy:string,
updatedOn: string,
updatedBy: string,
customer: string,
employeeId: string,
employeeNumber: string,
date: string,
inLocation: string,
inTime: string,
outLocation: string,
outTime: string,
totalHours: number,
overTime: number,
workingHours: number,
punchTime:string,
location:string,
isPunchIn:boolean,
distance:number
}





export interface I_LocationLatAndLog {
latitude:number;
longitude:number;
}