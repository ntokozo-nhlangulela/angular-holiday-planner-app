import {Component, OnInit} from '@angular/core';
import {ItineraryService} from "../../services/itinerary.service";
import {Trip} from "../../models/trip";
import {Itinerary} from "../../models/itinenary";
import {ActivatedRoute, Router} from "@angular/router";
import {TripService} from "../../services/trip.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.scss']
})
export class ItineraryListComponent implements OnInit{
  itenaries$: Observable<Itinerary[]>;
  tripId:string='';
   tripDetails: Trip = {} as Trip ;
  constructor(private iternaryService:ItineraryService, private route: ActivatedRoute, private router: Router, private tripService:TripService) {
    this.itenaries$ = this.iternaryService.getItenaries().pipe(map((itenaries)=>itenaries
      .filter((itinerary)=>itinerary.tripId === this.tripId)))
   }
   ngOnInit() {
     this.tripId = this.route.snapshot.paramMap.get('tripId')??''
      this.tripService.getTripById(this.tripId).subscribe((trips)=>{
        if(trips){
          this.tripDetails=trips[0];
        }
      })
   }
  goToAddItinerary(tripId:string){
    this.router.navigate(['/itinenary', tripId]);
  }
  updateItinerary(itineraryId:string |undefined){
    this.router.navigate(['/updateitinerary', itineraryId]);
  }
  deleteItinerary(itineraryId:string|undefined){
    this.iternaryService.deleteItinerary(itineraryId)
  }
  trackById(index: number, itinerary: Itinerary): string | undefined {
    return itinerary.id;
  }
}
