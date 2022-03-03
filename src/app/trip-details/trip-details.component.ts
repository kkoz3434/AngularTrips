import {Component, OnInit} from '@angular/core';
import {TripService} from '../data-services/database.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private tripService: TripService) {
  }

  trip: any;
  routeSub: string | undefined;
  isMinusVisible: boolean;
  isPlusVisible: boolean;


  // tslint:disable-next-line:typedef
  deleteMe() {
    this.tripService.deleteTrip(this.trip.key);
  }

  setVisibility(){
    if(this.trip[0].vacation>0){
      this.isPlusVisible=true;
    }
    if(this.trip[0].vacation==0){
      this.isPlusVisible=false;
      this.isMinusVisible=true;
    }
    if(this.trip[0].maxSpace-this.trip[0].vacation>0){
      this.isMinusVisible=true;
    }
    if(this.trip[0].maxSpace===this.trip[0].vacation){
      this.isMinusVisible=false;
    }}


  // tslint:disable-next-line:typedef
  getRate() {
    if (this.trip[0].tripRateAmount != 0) {
      return (this.trip[0].tripRateSum / this.trip[0].tripRateAmount);
    } else {
      return 0;
    }
  }

  updateRate(x: number) {
    this.tripService.updateTrip(this.routeSub,
      {tripRateSum: this.trip[0].tripRateSum + x, tripRateAmount: this.trip[0].tripRateAmount + 1});
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeSub = params.id;
    });
    if (this.routeSub === undefined) {
      this.router.navigate(['/mainPage']).then(r => r);
    } else {
      this.tripService.getTripList().pipe(
        map(changes =>
          changes.map((c: { payload: { key: any; val: () => any; }; }) => {
              return ({key: c.payload.key, ...c.payload.val()});
            }
          ).filter((c: any) => c.key === this.routeSub)
            .map((c: any) => {
              return c;
            }))
      ).subscribe(list => this.trip = list);
    }
    this.setVisibility();
  }

}
