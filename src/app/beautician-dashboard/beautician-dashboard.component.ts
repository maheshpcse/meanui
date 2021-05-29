import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-beautician-dashboard',
  templateUrl: './beautician-dashboard.component.html',
  styleUrls: ['./beautician-dashboard.component.css']
})
export class BeauticianDashboardComponent implements OnInit {

  public userid: any = sessionStorage.getItem('userid');
  public role: any = sessionStorage.getItem('role');
  public fullName: any = sessionStorage.getItem('fullname');

  constructor() { }

  ngOnInit() {
  }

}
