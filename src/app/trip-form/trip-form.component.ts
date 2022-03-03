import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TripService} from '../data-services/database.service';


@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private tripService: TripService) {
  }
  // tslint:disable-next-line:typedef
  get f() {
    return this.tripForm.controls;
  }
  tripForm: FormGroup;
  submitted = false;

  private validationAlerts = {
    name: {
      required: 'name is required!'
    },
    aim: {
      required: 'aim is required!',
    },
    startTrip: {
      required: 'name is required!',
      pattern: 'invalid data'
    },
    endTrip: {
      required: 'name is required!',
      pattern: 'invalid data'
    },
    price: {
      max: 'too high price. I\'m poor student'
    },
    maxSpace: {
      max: 'Bus is too small for this amount'
    }
  };

  ngOnInit(): void {
    this.tripForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      aim: new FormControl('', Validators.required),
      startTrip: new FormControl('',  Validators.required),
      endTrip: new FormControl('',  Validators.required),
      price: new FormControl('', Validators.max(5000)),
      maxSpace: new FormControl('', Validators.max(50)),
      description: new FormControl(''),
      imgURL: new FormControl(''),
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    if (this.tripForm.invalid){
      console.log('zlee');
      return;
    }
    else {
      const x = {
        name: this.tripForm.get('name').value,
        aim: this.tripForm.get('aim').value,
        startTrip: this.tripForm.get('startTrip').value,
        endTrip: this.tripForm.get('endTrip').value,
        price: this.tripForm.get('price').value,
        maxSpace: this.tripForm.get('maxSpace').value,
        vacation: this.tripForm.get('maxSpace').value,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus mi nunc, sit amet cursus justo consequat sit amet. Vestibulum pretium erat euismod tortor scelerisque, eu fringilla nunc luctus. Donec gravida ultrices iaculis. Nam tortor arcu, lacinia ut consectetur nec, interdum in enim. Aliquam sed consequat arcu, nec auctor nisl.',
        imgURL: 'https://source.unsplash.com/600x600/?' + this.tripForm.get('aim').value.toLowerCase(),
        tripRateSum: 0,
        tripRateAmount: 0
      };
      this.tripService.createTrip(x);
      this.tripForm.reset();
      this.submitted = true;
    }
   }

}

/*
<label>Country: </label><input  formControlName="aim"><br>
  <label>StartTrip: </label><input formControlName="startTrip"><br>
  <label>EndTrip: </label><input  formControlName="endTrip"><br>
  <label>Price: </label><input formControlName="price"><br>
  <label>Vacation left: </label><input formControlName="maxSpace"><br>
 */
