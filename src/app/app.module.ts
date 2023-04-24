import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import  {AuthServiceService} from "./services/auth-service.service";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './components/home/home.component';
import { TripComponent } from './components/trip/trip.component'
import {NzModalModule} from "ng-zorro-antd/modal";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItinerariesComponent } from './components/itineraries/itineraries.component';
import { UpdateTripComponent } from './components/update-trip/update-trip.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";

import { ItineraryListComponent } from './components/itinerary-list/itinerary-list.component';
import { UpdateItineraryComponent } from './components/update-itinerary/update-itinerary.component';
import { CalenderComponent } from './components/calender/calender.component';
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzLayoutModule} from "ng-zorro-antd/layout";

registerLocaleData(en);

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AppComponent,
    HomeComponent,
    TripComponent,
    DashboardComponent,
    ItinerariesComponent,
    UpdateTripComponent,
    ItineraryListComponent,
    UpdateItineraryComponent,
    CalenderComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzButtonModule,
        NzFormModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        NzModalModule,
        NzInputModule,
        NzSelectModule,
        NzCalendarModule,
        NzBadgeModule,
        NzLayoutModule,
    ],
  providers: [
    {
      provide: FIREBASE_OPTIONS, useValue: environment.firebase
    },
    AuthServiceService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
