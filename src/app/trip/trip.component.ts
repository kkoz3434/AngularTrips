import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../data-services/trip';
import {TripService} from '../data-services/database.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  constructor(private tripService: TripService) {
  }
  isMinusVisible: boolean;
  isPlusVisible: boolean;

  @Input() trip: Trip;
  @Input() borderStyle: string;

  // tslint:disable-next-line:typedef
  deleteMe() {
    this.tripService.deleteTrip(this.trip.key);
  }

  setVisibility(){
    if(this.trip.vacation>0){
      this.isPlusVisible=true;
    }
    if(this.trip.vacation==0){
      this.isPlusVisible=false;
      this.isMinusVisible=true;
    }
    if(this.trip.maxSpace-this.trip.vacation>0){
      this.isMinusVisible=true;
    }
    if(this.trip.maxSpace===this.trip.vacation){
      this.isMinusVisible=false;
    }

  }
  // tslint:disable-next-line:typedef
  decrement() {
    this.tripService.updateTrip(this.trip.key, {vacation: this.trip.vacation += 1});
    this.setVisibility();
  }

  // tslint:disable-next-line:typedef
  increment() {
    this.tripService.updateTrip(this.trip.key, {vacation: this.trip.vacation -= 1});
    this.setVisibility();
  }

  // tslint:disable-next-line:typedef
  getRate(){
    if(this.trip.tripRateAmount!=0)
    return this.trip.tripRateSum/this.trip.tripRateAmount;
    else return 0;
  }
  updateRate(x: number){
    this.tripService.updateTrip(this.trip.key,
      {tripRateSum: this.trip.tripRateSum+x,tripRateAmount: this.trip.tripRateAmount+1});
  }


  ngOnInit(): void {

  }

}
