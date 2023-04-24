import {Component, OnInit} from '@angular/core';
import {ItenaryService} from "../../services/itinerary.service";
import {Trip} from "../../models/trip";
import {Itinerary} from "../../models/itinenary";
import {ActivatedRoute, Router} from "@angular/router";
import {TripService} from "../../services/trip.service";

@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.scss']
})
export class ItineraryListComponent implements OnInit{
  itenaries:Itinerary[]=[];
  tripId:string='';
   tripDetails: Trip = {} as Trip ;

  constructor(private iternaryService:ItenaryService, private route: ActivatedRoute,private router: Router, private tripService:TripService) {
   }
   ngOnInit() {
     this.tripId = this.route.snapshot.paramMap.get('tripId')??''
     this.iternaryService.getItenaries().subscribe((x:Itinerary[])=>{
       console.log(x)
       let y = x.filter((x)=>x.tripId === this.tripId);
       this.itenaries=y;
       console.log(this.itenaries);
     });
      this.tripService.getTripById(this.tripId).subscribe((value)=>{
        this.tripDetails=value[0];
      })
   }
  goToAddItinerary(tripId:string){
    this.router.navigate(['/itinenary', tripId]);
  }
  addItinerary(tripId:string){
    this.router.navigate(['/itinenary', tripId]);
  }
  updateItinerary(itineraryId:string |undefined){
    this.router.navigate(['/updateitinerary', itineraryId]);
  }
  deleteItinerary(itineraryId:string|undefined){
    this.iternaryService.deleteItinerary(itineraryId)
    //  this.router.navigate(['/deletetrip', tripId]);
  }



}
