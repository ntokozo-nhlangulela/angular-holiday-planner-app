import { Component } from '@angular/core';
import {NzCalendarMode} from "ng-zorro-antd/calendar";




@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})

export class CalenderComponent {
  date = new Date(Date.now());
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
  }
}

