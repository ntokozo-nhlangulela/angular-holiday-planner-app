import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzCalendarMode} from 'ng-zorro-antd/calendar';
import {Trip} from "../../models/trip";
import {TripService} from "../../services/trip.service";
import {AuthServiceService} from "../../services/auth-service.service";
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements  OnInit{
  userId:string='';

  trips : Trip[]=[]
  constructor(private  tripService: TripService, private authService : AuthServiceService) {
    this.authService.getUserData().subscribe((x)=>{
      console.log(x)
      this.userId= x.uid;
    });

     this.tripService.getTrips().subscribe(trips => {
       const filteredTrips =  trips.filter(trip => trip.userId === this.userId);
       this.trips = filteredTrips
    }).unsubscribe()
  }
  ngOnInit() {}


  date = new Date(2023, 4, 23);
  mode: NzCalendarMode = 'month';
  @ViewChild('cellTemplate', { static: true }) cellTemplate!: TemplateRef<void>;
  getContent(trip: Trip): TemplateRef<void> {
    return this.cellTemplate;
  }
  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
