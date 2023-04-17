import { Component, OnInit } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from 'fullcalendar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import 'firebase/auth';
import { User } from 'firebase/auth';
import { ItenaryComponent } from './components/itenary/itenary.component';
import { TripComponent } from './components/trip/trip.component';
import { TripService } from './services/trip.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'angular-holiday-planner-app';
  loginModalRef!: BsModalRef;
  registerModal!: BsModalRef;
  tripModal!: BsModalRef;
  iteraryModal!: BsModalRef;
  Events: any[] = [];
  user: User;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.openInternary.bind(this)
  };
  isloggedIn = false;
  constructor(private authService: AuthService, private modalService: BsModalService, private tripService: TripService, private userService: UserService) {

  }


  ngOnInit() {

    this.tripService.getTrips().subscribe((x) => {
      this.Events = x
    })


    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     // User is signed in
    //     const displayName = user.displayName;
    //     const email = user.email;
    //     //const photoURL = user.photoURL;
    //     // ...
    //   } else {
    //     // User is signed out
    //     // ...
    //   }
    // });


    //   this.authService.SignIn("Ntokozo@gmail.com", "Ntokozo123");

    this.isloggedIn = this.authService.isLoggedIn;
    if (this.isloggedIn) {
      let userData = JSON.parse(localStorage.getItem('user')!);
      console.log(userData.email);
      this.userService.getUserByEmail(userData.email).subscribe((x) => {
        console.log(x)
      })
      this.userService.getUsers().subscribe((x) => {
        console.log(x)
        let y = x.filter((x) => x.email === userData.email);
        this.user = y[0];
        // console.log(this.user.email)
      })
    }
    console.log(this.authService.isLoggedIn)

    // setTimeout(() => {
    //   return this.httpClient
    //     .get('http://localhost:8888/event.php')
    //     .subscribe((res: any) => {
    //       this.Events.push(res);
    //       console.log(this.Events);
    //     });
    // }, 2200);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.openTripcreate.bind(this),
        events: this.Events,
      };
    }, 2500);
  }


  onDateClick(res: any) {
    this.openLoginModal();
    alert('Clicked on date : ' + res.dateStr);
  }
  openLoginModal() {
    this.loginModalRef = this.modalService.show(LoginComponent);
  }
  openTripcreate() {
    this.tripModal = this.modalService.show(TripComponent)
  }
  openInternary() {
    this.iteraryModal = this.modalService.show(ItenaryComponent)
  }
  openRegisterModal() {
    this.registerModal = this.modalService.show(RegisterComponent);
  }
  signOut() {
    this.authService.SignOut();
  }
}
