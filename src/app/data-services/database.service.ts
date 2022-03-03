import {Injectable} from '@angular/core';

import {Trip} from '../data-services/trip';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private db: AngularFireDatabase) {
  }

  createTrip(trip): void {
    const daneRef = this.db.list('trips');
    daneRef.push({
      name: trip.name,
      aim: trip.aim,
      startTrip: trip.startTrip,
      endTrip: trip.endTrip,
      price: trip.price,
      maxSpace: trip.maxSpace,
      vacation: trip.vacation,
      description: trip.description,
      imgURL: trip.imgURL,
      tripRateSum: 0,
      tripRateAmount: 0
    });
  }

 updateTrip(key:string,value: any) {
    const daneRef = this.db.list('trips');
    daneRef.update(key ,value);
  }

  // tslint:disable-next-line:typedef
  deleteTrip(key: string) {
    const daneRef = this.db.list('trips');
    daneRef.remove(key);
  }
  getTripList(): Observable<any[]> {
    return this.db.list('trips').snapshotChanges();
  }
}
