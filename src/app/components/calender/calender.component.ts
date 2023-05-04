import {Component} from '@angular/core';
import {Trip} from "../../models/trip";
import {TripService} from "../../services/trip.service";
import {AuthService} from "../../services/auth.service";
import {map, Observable} from "rxjs";
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent{
  userId:string='';
  trips$: Observable<Trip[]>;
  constructor(private  tripService: TripService, private authService : AuthService) {
    this.authService.getUserData().subscribe((user)=>{
      this.userId= user.uid;
    });
    this.trips$ = this.tripService.getItineraries().pipe(map((trips)=>trips.filter((trip)=>trip.userId===this.userId)))
  }
  trackById(index: number, trip: Trip): string | undefined {
    return trip.id;
  }
}
