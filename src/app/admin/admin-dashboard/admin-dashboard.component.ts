import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public userid: any = sessionStorage.getItem('userid');
  public role: any = sessionStorage.getItem('role');
  public fullName: any = sessionStorage.getItem('fullname');

  constructor() { }

  ngOnInit() {
  }

}
