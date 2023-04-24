import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {TripService} from "../../services/trip.service";
import {ItenaryService} from "../../services/itinerary.service";
import {AuthServiceService} from "../../services/auth-service.service";
import {Trip} from "../../models/trip";


@Component({
  selector: 'app-update-trip',
  templateUrl: './update-trip.component.html',
  styleUrls: ['./update-trip.component.scss']
})
export class UpdateTripComponent implements OnInit{
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
  tripId:string ="";
  constructor(

    private fb: FormBuilder,
    private tripService: TripService,
    private itservice :ItenaryService,
    private authService:AuthServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.form = this.fb.group({
      tripName: ['', [Validators.required]],
      departure: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2)]],
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
        this.form.controls['tripName'].setValue(`${trip[0].tripName}`)
        this.form.controls['departure'].setValue(`${trip[0].departure}`)
        this.form.controls['returnDate'].setValue(`${trip[0].returnDate}`)
        this.form.controls['description'].setValue(`${trip[0].description}`)
    })

  }
  async onSubmit() {
    let userData;
    this.authService.getUserData().subscribe((value)=>{
      userData=value;
      if(userData){
        let trip : Trip= {
          tripId: this.tripId,
          userId:userData.uid,
          tripName: this.form.value.tripName,
          departure: this.form.value.departure,
          returnDate: this.form.value.returnDate,
          description:this.form.value.description
        }
        this.tripService.updateTrip(this.tripId, trip);
      }
    });

    this.isLoading = true;
    this.isLoading = false;
  }
  handleOk(): void {
    this.isVisible = false;
    this.router.navigate(['dashboard'])
  }

  handleCancel(): void {
    this.isVisible = false;
    this.router.navigate(['dashboard'])
  }

}
