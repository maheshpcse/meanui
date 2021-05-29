import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public userid: any = sessionStorage.getItem('userid');
  public role: any = sessionStorage.getItem('role');
  public fullName: any = sessionStorage.getItem('fullname');

  constructor() { }

  ngOnInit() {
  }

}
