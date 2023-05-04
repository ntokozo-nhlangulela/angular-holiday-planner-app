import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItineraryService} from "../../services/itinerary.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Itinerary} from "../../models/itinenary";
import {CurrencyService} from "../../services/currency.service";
import {Observable} from "rxjs";
import {Currency} from "../../models/currency";

@Component({
  selector: 'app-update-itinerary',
  templateUrl: './update-itinerary.component.html',
  styleUrls: ['./update-itinerary.component.scss']
})
export class UpdateItineraryComponent implements OnInit{
  form: FormGroup;
  itineraryId:string='';
  isVisible = false;
  currencies:Observable<Currency[]>
  constructor(
    private fb: FormBuilder,
    private itineraryService: ItineraryService,
    private currencyService : CurrencyService,
    private route: ActivatedRoute,
    private router: Router,
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
      this.itineraryId = params['itineraryId'];
    });
    this.itineraryId = this.route.snapshot.paramMap.get('itineraryId')??''
    this.itineraryService.getItenaryById(this.itineraryId).subscribe((itinerary)=>{
      if(itinerary){
        this.form.controls['itineraryName'].setValue(`${itinerary[0].itineraryName}`)
        this.form.controls['startTime'].setValue(`${itinerary[0].itineraryStartTime}`)
        this.form.controls['endTime'].setValue(`${itinerary[0].itineraryEndTime}`)
        this.form.controls['cost'].setValue(`${itinerary[0].itineraryCost}`)
        this.form.controls['startLocation'].setValue(`${itinerary[0].itineraryStartLocation}`)
        this.form.controls['endLocation'].setValue(`${itinerary[0].itineraryEndLocation}`)
        this.form.controls['tag'].setValue(`${itinerary[0].tag}`)
        this.form.controls['notes'].setValue(`${itinerary[0].notes}`)
      }
    })
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
      itineraryId: this.itineraryId,
      itineraryName: this.form.value.itineraryName,
      tag: this.form.value.tag,
      itineraryStartTime: this.form.value.startTime,
      itineraryEndTime: this.form.value.endTime,
      itineraryCost: this.form.value.cost,
      itineraryStartLocation: this.form.value.startLocation,
      itineraryEndLocation: this.form.value.endLocation,
      notes: this.form.value.notes,
    }
    this.itineraryService.updateItenary(this.itineraryId, itinerary)
    this.router.navigate(['dashboard'])
  }
  handleCancel() {
    this.isVisible = false;
    this.router.navigate(['dashboard'])
  }
}
