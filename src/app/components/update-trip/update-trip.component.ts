import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TripService} from "../../services/trip.service";
import {AuthService} from "../../services/auth.service";
import {Trip} from "../../models/trip";

@Component({
  selector: 'app-update-trip',
  templateUrl: './update-trip.component.html',
  styleUrls: ['./update-trip.component.scss']
})
export class UpdateTripComponent implements OnInit{
  form: FormGroup;
  isVisible = false;
  tripId:string ="";
  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router,
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
  ngOnInit() {
      this.tripId = this.route.snapshot.paramMap.get('tripId')??''
      this.tripService.getTripById(this.tripId).subscribe((trip)=>{
        if(trip){
          this.form.controls['tripName'].setValue(`${trip[0].tripName}`)
          this.form.controls['departure'].setValue(`${trip[0].departure}`)
          this.form.controls['returnDate'].setValue(`${trip[0].returnDate}`)
          this.form.controls['description'].setValue(`${trip[0].description}`)
        }
    })
  }
  async onSubmit() {
    this.authService.getUserData().subscribe((user)=>{
      if(user){
        const trip : Trip= {
          tripId: this.tripId,
          userId:user.uid,
          tripName: this.form.value.tripName,
          departure: this.form.value.departure,
          returnDate: this.form.value.returnDate,
          description:this.form.value.description
        }
        this.tripService.updateTrip(this.tripId, trip);
        this.router.navigate(['dashboard'])
      }
    });
  }
  handleCancel(): void {
    this.isVisible = false;
    this.router.navigate(['dashboard'])
  }
}
