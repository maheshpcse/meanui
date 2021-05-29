import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  tempArray: any = [
    {booking_id: 'W269N-WFGWX-YVC9B', beautician: 'ABC', date: '10-02-2021'},
    {booking_id: 'MH37W-N47XK-V7XM9', beautician: 'DEF', date: '15-02-2021'},
    {booking_id: 'F34E-RST1-OPQS', beautician: 'GHI', date: '25-02-2021'},
    {booking_id: 'NPPR9-FWDCX-D2C8J', beautician: 'JKM', date: '05-03-2021'},
    {booking_id: 'DPH2V-TTNVB-4X9Q3', beautician: 'NOP', date: '10-03-2021'}
  ];
  viewItem: any = {};
  currentIndex: any = null;

  constructor() { }

  ngOnInit() {
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

  onViewBill(item: any, index: any) {
    console.log('selected item and index issss', item, index);
    this.viewItem = item;
  }

}
