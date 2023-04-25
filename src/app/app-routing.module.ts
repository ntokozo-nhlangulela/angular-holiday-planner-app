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
import {AuthGuard} from "./shared/auth-guard";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
  { path: '', redirectTo: '/home/sign-in', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'trip', component: TripComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'updatetrip/:tripId', component: UpdateTripComponent , canActivate: [AuthGuard]},
  { path: 'deletetrip/:tripId', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'itinenary/:tripId', component: ItinerariesComponent, canActivate: [AuthGuard]},
  { path: 'itinenaryList/:tripId', component: ItineraryListComponent, canActivate: [AuthGuard]},
  { path: 'updateitinerary/:itineraryId', component: UpdateItineraryComponent, canActivate: [AuthGuard]},
  { path: 'calender', component: CalenderComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
