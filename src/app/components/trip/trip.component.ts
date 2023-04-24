import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, UntypedFormGroup, Validators} from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
import {Router} from "@angular/router";
import {Trip} from "../../models/trip";
import {ItenaryService} from "../../services/itinerary.service";
import {AuthServiceService} from "../../services/auth-service.service";
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements  OnInit{
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  form: FormGroup;
  isLoading: boolean = false;
  isVisible = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tripService: TripService,
    private itservice :ItenaryService,
    private authService:AuthServiceService
  ) {

    this.form = this.fb.group({
      tripName: ['', [Validators.required]],
      departure: ['', [Validators.required]],
      returnDate: [''],
      description: [''],
    });
  }
ngOnInit() {

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
    let userData;
    this.authService.getUserData().subscribe((value)=>{
      userData=value;
      if(userData){
        let trip = {
          tripId: Math.random().toString(),
          userId:userData.uid,
          tripName: this.form.value.tripName,
          departure: this.form.value.departure,
          returnDate: this.form.value.returnDate,
          description:this.form.value.description
        }
         this.tripService.addTrip(trip);
      }
    });

    this.isLoading = true;
    this.isLoading = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.router.navigate(['dashboard'])
  }

  handleOk(): void {
    this.isVisible = false;
  }


}
