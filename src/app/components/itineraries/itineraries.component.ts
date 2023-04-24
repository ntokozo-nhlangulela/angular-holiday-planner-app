import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItenaryService} from "../../services/itinerary.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import {Itinerary} from "../../models/itinenary";
import {CurrencyService} from "../../services/currency.service";
import {Observable} from "rxjs";
import {Currency} from "../../models/currency";
@Component({
  selector: 'app-itineraries',
  templateUrl: './itineraries.component.html',
  styleUrls: ['./itineraries.component.scss']
})
export class ItinerariesComponent implements OnInit{
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
  tripId:string='';
  isVisible = false;

  currencies:Observable<Currency[]>

  constructor(

    private fb: FormBuilder,
    private currencyService : CurrencyService,
    private itenaryService: ItenaryService,
    private route: ActivatedRoute,
    private router: Router
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
    this.currencies=
currencyService.getCurrency()
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
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
    this.route.params.subscribe(params => {
      this.tripId = params['tripId'];
    });
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
      tripId:this.tripId
    }

    this.itenaryService.addItenary(itenary);
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
