import {Component, OnInit} from '@angular/core';
import {TripService} from '../data-services/database.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.css']
})
export class AllTripsComponent implements OnInit {

  constructor(private tripService: TripService) {
  }

  public tripList: any;

  ngOnInit(): void {
    this.getTripList();
  }

  // tslint:disable-next-line:typedef
  getTripList() {
    this.tripService.getTripList().pipe(
      map(changes =>
        changes.map((c: { payload: { key: any; val: () => any; }; }) => {
            return ({key: c.payload.key, ...c.payload.val()});
          }
        ))
    ).subscribe(
      list => {
        this.tripList = list;
      });
    console.log(this.tripList);
  }

  // tslint:disable-next-line:typedef

  onSubmit($event) {
    const x = {
      name: $event.get('name').value,
      aim: $event.get('aim').value,
      startTrip: $event.get('startTrip').value,
      endTrip: $event.get('endTrip').value,
      price: $event.get('price').value,
      maxSpace: $event.get('maxSpace').value,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        ' Ut tempus mi nunc, sit amet cursus justo consequat sit amet.' +
        ' Vestibulum pretium erat euismod tortor scelerisque, eu fringilla ' +
        'nunc luctus. Donec gravida ultrices iaculis. Nam tortor arcu, lacinia ' +
        'ut consectetur nec, interdum in enim. Aliquam sed consequat arcu, nec ' +
        'auctor nisl.',
      imgURL: 'https://source.unsplash.com/600x600/?' + $event.get('aim').value
    };
  }

  // tslint:disable-next-line:typedef
  sumOfReserved() {
    let x = 0;
    for(let i = 0; i < this.tripList.length; i++) {
      x += (this.tripList[i].maxSpace - this.tripList[i].vacation);
    }
    return x;
  }

  // tslint:disable-next-line:typedef
  findMaxPrice(tab) {
    let x = 0;
    for (const i of tab) {
      if (i.price > x) {
        x = i.price;
      }
    }
    return x;
  }

  // tslint:disable-next-line:typedef
  findMinPrice(tab) {
    let x = 10000000000;
    for (const i of tab) {
      if (i.price < x) {
        x = i.price;
      }
    }
    return x;
  }

  // tslint:disable-next-line:typedef
  getBorderColor(item) {
    if (item.price === this.findMaxPrice(this.tripList)) {
      return {border: 'solid red 2px'};
    }
    if (item.price === this.findMinPrice(this.tripList)) {
      return {border: 'solid green 2px'};
    }
    return {border: 'none'};
  }


}
