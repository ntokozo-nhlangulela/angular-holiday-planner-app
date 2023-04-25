import { Component } from '@angular/core';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-holiday-planner-app';
  constructor(private store: Store<any>) {}
}
