import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-beautician-users',
  templateUrl: './beautician-users.component.html',
  styleUrls: ['./beautician-users.component.css']
})
export class BeauticianUsersComponent implements OnInit {

  tempArray: any = [];
  usersArray: any = [];
  viewItem: any = {};
  currentIndex: any = null;
  selectDate: Date;
  selectTime: Date;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      this.tempArray.push({
        username: `user ${i+1}`,
        appointment_date: `2021-05-0${i+1}`,
        appointment_time: `0${i+1}:00 AM`
      });
    }
    for (let i = 6; i < 9; i++) {
      this.usersArray.push({
        username: `user ${i}`,
        appointment_date: `2021-05-0${i+1}`,
        appointment_time: `0${i+1}:00 AM`
      });
    }
  }

  openNav(item?: any, index?: any) {
    this.viewItem = item;
    this.currentIndex = index + 1;
    document.getElementById('mySidenav').style.width = '400px';
    document.getElementById('main').style.marginRight = '250px';
  }

  closeNav() {
    this.viewItem = {};
    this.currentIndex = null;
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginRight = '0';
  }

}
