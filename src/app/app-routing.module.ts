import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {HomeComponent} from "./components/home/home.component";
import {TripComponent} from "./components/trip/trip.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ItinerariesComponent} from "./components/itineraries/itineraries.component";
import {UpdateTripComponent} from "./components/update-trip/update-trip.component";
import {ItineraryListComponent} from "./components/itinerary-list/itinerary-list.component";
import {UpdateItineraryComponent} from "./components/update-itinerary/update-itinerary.component";
import {CalenderComponent} from "./components/calender/calender.component";

const routes: Routes = [
//  { path: 'home', component: HomeComponent },
  {

    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },

    ],
  },
  { path: '', redirectTo: '/home/sign-in', pathMatch: 'full' }, // redirect to `first-component`
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'trip', component: TripComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'updatetrip/:tripId', component: UpdateTripComponent },
  { path: 'deletetrip/:tripId', component: DashboardComponent },
  { path: 'itinenary/:tripId', component: ItinerariesComponent},
  { path: 'itinenaryList/:tripId', component: ItineraryListComponent},
  { path: 'updateitinerary/:itineraryId', component: UpdateItineraryComponent},
  { path: 'calender', component: CalenderComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
