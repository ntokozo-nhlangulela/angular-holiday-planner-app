import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TripService} from "../../services/trip.service";
import {Trip} from "../../models/trip";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {map, Observable} from "rxjs";
import {TripsState} from "../../store/trip.reducers";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  userId:string="";
  userEmail: string="";
  userTrips$: Observable<Trip[]>;
  constructor(private authService:AuthService,protected tripStore: Store<TripsState>, private tripService:TripService, private router: Router
  ) {

    this.userTrips$ = this.tripService.getItineraries()
      .pipe(map((trips)=>
        trips.filter((trip)=>
          trip.userId===this.userId)))
  }
  ngOnInit() {
    this.authService.getUserData().subscribe((user: User) =>{
      this.userId= user.uid;
      this.userEmail=user.email
    });
  }
  goToAddTrip() {
    this.router.navigate(['/trip'])
  }
  goToItineraries(tripId:string){
    this.router.navigate(['/itinenaryList', tripId]);
  }
  goCalender(){
    this.router.navigate(['/calender']);
  }
  updateTrip(tripId:string |undefined){
    this.router.navigate(['/updatetrip', tripId]);
  }
  deleteTrip(tripId:string|undefined){
    this.tripService.deleteTrip(tripId)
    this.router.navigate(['/deletetrip', tripId]);
  }
  trackById(index: number, trip: Trip): string | undefined {
    return trip.id;
  }
}
