import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'underscore';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  weekDays: any = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  days: any = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  weekNames: any = [
    {id: 1, name: 'Sunday'}, {id: 2, name: 'Monday'}, {id: 1, name: 'Tuesday'}, {id: 1, name: 'Wednesday'},
    {id: 1, name: 'Thursday'}, {id: 1, name: 'Friday'}, {id: 1, name: 'Saturday'}
  ];

  dates: any = [
    // ['00','00','00','00','00','01','02'],
    // ['03','04','05','06','07','08','09'],
    // ['10','11','12','13','14','15','16'],
    // ['17','18','19','20','21','22','23'],
    // ['24','25','26','27','28','29','30'],
    // ['31','00','00','00','00','00','00']
  ];

  currentDate: any = moment().format('DD').toString();
  currentFullMonth: any = moment().format('MMMM').toString();
  currentMonth: any = moment().format('MM').toString();
  currentYear: any = moment().format('YYYY').toString();

  tempCurrentDate: any = moment().format('DD').toString();
  tempCurrentFullMonth: any = moment().format('MMMM').toString();
  tempCurrentMonth: any = moment().format('MM').toString();
  tempCurrentYear: any = moment().format('YYYY').toString();

  selectYear: any = null;
  selectMonth: any = null;
  selectDate: any = null;

  constructor() { }

  ngOnInit() {
    this.getAllDates('');
  }

  setSundayColour(item: any, id: any) {
    if (Number(id) / 7 === 0 || Number(id) / 6 === 0) {
      return true;
    } else {
      return false;
    }
  }

  setDisableDates(item: any, id: any) {
    const firstArr = [25, 26, 27, 28, 29, 30, 31];
    const lastArr = [1, 2, 3, 4, 5, 6, 7];
    if (Number(id) === 0 && firstArr.includes(Number(item))) {
      return true;
    } else if (Number(id) === this.dates.length - 1 && lastArr.includes(Number(item))) {
      return true;
    } else {
      return false;
    }
  }

  setCurrentDateColour(item: any, id: any) {
    if (Number(item) === Number(this.currentDate)) {
      return true;
    } else {
      return false;
    }
  }

  onSearchFullDate() {
    this.currentYear = this.selectYear.toString().padStart(2, 0);
    this.currentMonth = this.selectMonth.toString().padStart(2, 0);
    this.currentFullMonth = moment(`${this.currentYear.toString()}-${this.currentMonth.toString().padStart(2, 0)}-01`).format('MMMM');
    this.currentDate = this.selectDate.toString().padStart(2, 0);
    this.getAllDates('search');
  }

  getAllDates(view: any) {
    console.log('selected view isss', view);
    let currentMonth: any = null;
    if (view !== 'search') {
      if (view === 'prev') {
        currentMonth = (Number(this.currentMonth) - 1).toString();
      } else if (view === 'next') {
        currentMonth = (Number(this.currentMonth) + 1).toString();
      } else {
        currentMonth = this.tempCurrentMonth.toString();
      }
    } else {
      currentMonth = this.currentMonth.toString().padStart(2, 0);;
    }
    console.log('current month isss', currentMonth);
    this.currentFullMonth = moment(`${this.currentYear.toString()}-${currentMonth.toString().padStart(2, 0)}-01`).format('MMMM');
    this.currentMonth = currentMonth.toString().padStart(2, 0);
    const weekDays = {
      'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6
    };
    let startDay: any = 1;
    const selectedDate = moment(`${this.currentYear.toString()}-${currentMonth.toString().padStart(2, 0)}-01`).format('dddd');
    console.log('selected date isss', selectedDate);
    const lastIndex = weekDays[selectedDate];
    const days = moment(`${this.currentYear.toString()}-${currentMonth.toString().padStart(2, 0)}-01`).daysInMonth();
    this.dates = [];
    let weekDates: any = [];
    let firstIndex: any = 0;
    while (firstIndex < lastIndex) {
      weekDates.push('00');
      firstIndex += 1;
    }
    while (startDay <= days) {
      if (weekDates.length === 7) {
        this.dates.push(weekDates);
        weekDates = [];
      }
      weekDates.push(startDay.toString().padStart(2, 0));
      startDay += 1;
    }
    while (weekDates.length !== 7) {
      weekDates.push('00');
    }
    this.dates.push(weekDates);

    console.log('dates isss', this.dates);

    const firstDates = [];
    let prevMonth: any = (Number(currentMonth) - 1).toString();
    const previousMonthFullDate = moment(`${this.currentYear.toString()}-${prevMonth.padStart(2, 0)}-01`).daysInMonth();
    console.log('previous month full date isss', previousMonthFullDate);
    let previousDays: any = previousMonthFullDate + 1;

    for (let i = 0; i < this.dates[0].length; i++) {
      if (this.dates[0][i] === '00') {
        previousDays -= 1;
        firstDates.push(previousDays.toString().padStart(2, 0));
      }
    }
    console.log('previousDays isss', firstDates);
    const tempFirstDays = firstDates.reverse();

    for (let i = 0; i < this.dates[0].length; i++) {
      if (this.dates[0][i] === '00') {
        this.dates[0][i] = tempFirstDays[i];
      }
    }

    const lastDates = [];
    let nextDays: any = 0;

    for (let i = 0; i < this.dates[this.dates.length - 1].length; i++) {
      if (this.dates[this.dates.length - 1][i] === '00') {
        nextDays += 1;
        lastDates.push(nextDays.toString().padStart(2, 0));
        this.dates[this.dates.length - 1][i] = nextDays.toString().padStart(2, 0);
      }
    }
    console.log('nextDays isss', lastDates);

    console.log('final days isss', this.dates);
  }

}
