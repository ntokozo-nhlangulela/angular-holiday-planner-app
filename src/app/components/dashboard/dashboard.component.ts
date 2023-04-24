import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {TripService} from "../../services/trip.service";
import {Trip} from "../../models/trip";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  userId:string="";
  userEmail: string="";
  userTrips:Trip[]=[];
  constructor(private authService:AuthServiceService,private tripservice:TripService, private router: Router
  ) {
  }
  ngOnInit() {
    this.authService.getUserData().subscribe((value)=>{
      this.userId= value.uid;
      this.userEmail=value.email

    });
    this.tripservice.getTrips().subscribe((value:Trip[])=>{
      let filteredArray = value.filter((filtered)=>filtered.userId === this.userId);
      this.userTrips=filteredArray;

    })


  }
  goToAddTrip() {
    this.router.navigate(['/trip'])
  }
  goToIt(tripId:string){
    this.router.navigate(['/itinenaryList', tripId]);
  }
  goCalender(){
    this.router.navigate(['/calender']);
  }
  updateTrip(tripId:string |undefined){
    this.router.navigate(['/updatetrip', tripId]);
  }
  deleteTrip(tripId:string|undefined){
    this.tripservice.deleteTrip(tripId)
  this.router.navigate(['/deletetrip', tripId]);
  }

}
