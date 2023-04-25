import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItineraryService} from "../../services/itinerary.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Itinerary} from "../../models/itinenary";
import {CurrencyService} from "../../services/currency.service";
import {Observable} from "rxjs";
import {Currency} from "../../models/currency";
import {v4 as uuidv4} from "uuid";
@Component({
  selector: 'app-itineraries',
  templateUrl: './itineraries.component.html',
  styleUrls: ['./itineraries.component.scss']
})
export class ItinerariesComponent implements OnInit{
  form: FormGroup;
  tripId:string='';
  isVisible = false;
  currencies:Observable<Currency[]>
  constructor(
    private fb: FormBuilder,
    private currencyService : CurrencyService,
    private itenaryService: ItineraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      itineraryName: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      startTime: [''],
      endTime: [''],
      cost: ['', [Validators.required]],
      startLocation: [''],
      endLocation: [''],
      notes: [''],
    });
    this.currencies= currencyService.getCurrency()
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tripId = params['tripId'];
    });
  }
  get itineraryName(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('itineraryName')!;
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
  get notes(): AbstractControl<Itinerary, Itinerary> {
    return this.form.get('notes')!;
  }
  async onSubmit() {
    const itinerary :Itinerary = {
      //Change Id generation
      itineraryId: uuidv4.toString(),
      itineraryName: this.form.value.itineraryName,
      tag: this.form.value.tag,
      itineraryStartTime: this.form.value.startTime,
      itineraryEndTime: this.form.value.endTime,
      itineraryCost: this.form.value.cost,
      itineraryStartLocation: this.form.value.startLocation,
      itineraryEndLocation: this.form.value.endLocation,
      notes: this.form.value.notes,
      tripId:this.tripId
    }
    this.itenaryService.addItinerary(itinerary);
    this.router.navigate(['dashboard'])
  }
  handleCancel() {
    this.isVisible = false;
    this.router.navigate(['dashboard'])
  }
}
