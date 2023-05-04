import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
import {Router} from "@angular/router";
import {Trip} from "../../models/trip";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent {
  form: FormGroup;
  isVisible = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tripService: TripService,
    private authService:AuthService
  ) {
    this.form = this.fb.group({
      tripName: ['', [Validators.required]],
      departure: [''],
      returnDate: [''],
      description: [''],
    });
  }
  get tripName(): AbstractControl<Trip, Trip> {
    return this.form.get('tripName')!;
  }

  get departure(): AbstractControl<Trip, Trip> {
    return this.form.get('departure')!;
  }

  get returnDate(): AbstractControl<Trip, Trip> {
    return this.form.get('returnDate')!;
  }

  get description(): AbstractControl<Trip, Trip> {
    return this.form.get('description')!;
  }
  async onSubmit() {
    this.authService.getUserData().subscribe((user: User)=>{
      if(user){
        const trip: Trip = {
          tripId: uuidv4.toString(),
          userId:user.uid,
          tripName: this.form.value.tripName,
          departure: this.form.value.departure,
          returnDate: this.form.value.returnDate,
          description:this.form.value.description
        }
         this.tripService.addTrip(trip);
        this.router.navigate(['dashboard'])
      }
    });
  }
  handleCancel() {
    this.isVisible = false;
    this.router.navigate(['dashboard'])
  }
}
