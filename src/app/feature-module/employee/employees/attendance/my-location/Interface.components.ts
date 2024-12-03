export interface I_Location{
    id: number,
    createdOn:string ,
    createdBy: string,
    updatedOn: string,
    updatedBy: string,
    ClientId?: string,
    locationId: string,
    latLong: string,
    mapLink: string,
    description: string,
    employeeId?:string,
    distance?:number,
    employeeNumber?:string,
    isMain?:boolean
  }