import { Injectable } from '@angular/core';
import { I_LocationLatAndLog } from './attendance';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {
  constructor() {}

    private targetLocation:I_LocationLatAndLog = { latitude: 0, longitude:0 };
 
  getCurrentLocation(): Promise<GeolocationCoordinates> {
    return new Promise<GeolocationCoordinates>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => resolve(position.coords),
          (error) => reject(error)
        );
      } else {
        reject('Geolocation not supported');
      }
    });
  }
  


  // // Method to calculate distance between two lat/lng points in kilometers
  // calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  //   const R = 6371; // Radius of the Earth in kilometers
  //   const dLat = this.deg2rad(lat2 - lat1); // Difference in latitude
  //   const dLng = this.deg2rad(lng2 - lng1); // Difference in longitude

  //   // Haversine formula
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
  //     Math.sin(dLng / 2) * Math.sin(dLng / 2);

  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance =  R * c * 1000; ; // Distance in meters
  //   return distance;
  // }

  calculateDistanceNew(currentLocation:any,targetLocation:any): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(targetLocation.lat - currentLocation.lat); // Difference in latitude
    const dLng = this.deg2rad(targetLocation.lng - currentLocation.lng); // Difference in longitude

    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(currentLocation.lat)) * Math.cos(this.deg2rad(targetLocation.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance =  R * c * 1000; ; // Distance in meters
    return distance;
  }

  isWithinDistance(userLocation: any,targetLocation:any) {
    const distance = this.calculateDistanceNew(userLocation,targetLocation,    );
    return distance ;
  }

  // Helper function to convert degrees to radians
  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
