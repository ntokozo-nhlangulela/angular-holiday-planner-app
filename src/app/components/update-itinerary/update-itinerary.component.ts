import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {ItenaryService} from "../../services/itinerary.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Itinerary} from "../../models/itinenary";

@Component({
  selector: 'app-update-itinerary',
  templateUrl: './update-itinerary.component.html',
  styleUrls: ['./update-itinerary.component.scss']
})
export class UpdateItineraryComponent implements OnInit{
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
  itineraryId:string='';
  isVisible = false;

  constructor(

    private fb: FormBuilder,
    private itenaryService: ItenaryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      itenaryId: ['', [Validators.required]],
      itenaryName: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      startLocation: ['', [Validators.required]],
      endLocation: ['', [Validators.required]],
      Notes: ['', [Validators.required]],
    });

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.itineraryId = params['itineraryId'];
      console.log(this.itineraryId)
    });

    this.itineraryId = this.route.snapshot.paramMap.get('itineraryId')??''
    this.itenaryService.getItenaryById(this.itineraryId).subscribe((itinerary)=>{
      //console.log(trip[0].id);
      this.form.controls['itenaryName'].setValue(`${itinerary[0].itineraryName}`)
      this.form.controls['startTime'].setValue(`${itinerary[0].itineraryStartTime}`)
      this.form.controls['endTime'].setValue(`${itinerary[0].itineraryEndTime}`)
      this.form.controls['cost'].setValue(`${itinerary[0].itineraryCost}`)
      this.form.controls['startLocation'].setValue(`${itinerary[0].itineraryStartLocation}`)
      this.form.controls['endLocation'].setValue(`${itinerary[0].itineraryEndLocation}`)
      this.form.controls['tag'].setValue(`${itinerary[0].tag}`)
      this.form.controls['Notes'].setValue(`${itinerary[0].notes}`)
      console.log(itinerary)
    })
  }

  get itenaryId(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('itenaryId')!;
  }
  get itenaryName(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('itenaryName')!;
  }

  get tag(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('tag')!;
  }

  get startTime(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('startTime')!;
  }

  get endTime(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('endTime')!;
  }
  get cost(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('cost')!;
  }

  get startLocation(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('startLocation')!;
  }

  get endLocation(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('endLocation')!;
  }

  get Notes(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('Notes')!;
  }


  async onSubmit() {
    let itenary :Itinerary = {
      itineraryId: Math.random().toString(),
      itineraryName: this.form.value.itenaryName,
      tag: this.form.value.tag,
      itineraryStartTime: this.form.value.startTime,
      itineraryEndTime: this.form.value.endTime,
      itineraryCost: this.form.value.cost,
      itineraryStartLocation: this.form.value.startLocation,
      itineraryEndLocation: this.form.value.endLocation,
      notes: this.form.value.Notes,
      tripId:""
    }

    this.itenaryService.updateItenary(this.itineraryId, itenary)
    this.isLoading = true;
  }
  handleCancel() {
    this.isVisible = false;
    this.router.navigate(['dashboard'])
  }

  handleOk(): void {
    this.isVisible = false;
  }

}
