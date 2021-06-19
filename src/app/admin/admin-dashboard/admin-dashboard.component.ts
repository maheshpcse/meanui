import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { BeauticianService } from 'src/app/api-services/beautician.service';
import { timer } from 'rxjs';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public userid: any = sessionStorage.getItem('userid');
  public role: any = sessionStorage.getItem('role');
  public fullName: any = sessionStorage.getItem('fullname');

  spinner: any = false;
  allData: any = [];

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public beauticianService: BeauticianService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.spinner = true;
    const source = timer(1000, 60000);
    const subscribe = source.subscribe(val => {
      this.spinner = true;
      setTimeout(() => {
        this.getDashboardCountsData();
      }, 5000);
    });
  }

  getDashboardCountsData() {
    this.spinner = true;
    this.beauticianService.getAllDashboardCounts().subscribe(
      (response: any) => {
        console.log("Get all dashboard counts response isss", response);
        if (response.success) {
          this.allData = response.data;
        } else {
          this.toastr.errorToastr(response.message);
        }
        clearTimeout();
        this.spinner = false;
      },
      (error: any) => {
        this.toastr.errorToastr("Network failed, Please try again.");
        this.spinner = false;
      }
    );
  }

}
