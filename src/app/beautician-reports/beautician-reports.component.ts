import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from '../api-services/auth-user.service';
import { BeauticianService } from '../api-services/beautician.service';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-beautician-reports',
  templateUrl: './beautician-reports.component.html',
  styleUrls: ['./beautician-reports.component.css']
})
export class BeauticianReportsComponent implements OnInit {

  public userId: any = sessionStorage.getItem('userid');
  public username: any = sessionStorage.getItem('username');
  public role: any = sessionStorage.getItem('role');

  tempArray: any = [];
  viewItem: any = {};
  currentIndex: any = null;
  selectDate: Date;
  selectTime: Date;

  rowsOnPage: any = 8;
  limit: any = 8;
  page: any = 1;
  count: any = 0;
  pager: any = {};
  totalPages: any = [];
  searchQuery: any = '';
  statusQuery: any = null;
  filterStatus: any = null;
  usersList: any = [];

  amount: any = null;
  bills: any = null;

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public beauticianService: BeauticianService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    // for (let i = 0; i < 6; i++) {
    //   this.tempArray.push({
    //     username: `user ${i+1}`,
    //     appointment_date: `2021-05-0${i+1}`,
    //     appointment_time: `0${i+1}:00 AM`
    //   });
    // }
    this.getAllUserAppointmentsData();
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
    this.amount = null;
    this.bills = null;
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginRight = '0';
  }

  getAllUserAppointmentsData() {
    const userBookingsPayload = {
      limit: Number(this.limit),
      page: Number(this.page),
      query: this.searchQuery,
      status: !this.statusQuery || this.statusQuery === null ? 'all' : Number(this.statusQuery),
      user_id: Number(this.userId)
    }
    console.log('Post payload to get all user appointments data isss', userBookingsPayload);

    this.beauticianService.getAllUserAppointments(userBookingsPayload).subscribe((response: any) => {
      console.log('Get all user appointments response isss', response);
      if (response.success) {
        this.usersList = _.filter(response.data, (e: any) => {
          return e.booking_status === 0 || e.booking_status === 1
        });
        this.count = response.count;
        this.createPager();
      } else {
        this.toastr.errorToastr(response.message);
      }
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
    });
  }

  getPage(event: any) {
    console.log('Selected page isss', event);
    this.page = Number(event);
    this.getAllUserAppointmentsData();
  }

  createPager() {
    // this.pager.startCount = this.beauticians.length > 0 && Number(this.page) === 1 ? 1 : this.beauticians.length > 0 ? (Number(this.rowsOnPage) * Number(this.page - 1)) + 1 : 0;
    // this.pager.endCount = Number(this.rowsOnPage) === this.beauticians.length ? Number(this.rowsOnPage) * Number(this.page) : Number(this.count);
    // console.log(this.pager);

    let endLimit = Math.round(this.count/this.limit) === 0 ? Math.round(this.count/this.limit) : Math.round(this.count/this.limit) + 1;
    endLimit = endLimit === 0 ? 1 : endLimit;
    console.log('end limit isss', endLimit);
    this.totalPages = [];
    for(let num = 1; num <= Number(endLimit); num += 1) {
      this.totalPages.push(num);
    }
    console.log('total pages isss', this.totalPages);
  }

  onSearchData() {
    // console.log('search request data isss', this.searchQuery);
    if (this.searchQuery || this.searchQuery !== '') {
      this.getAllUserAppointmentsData();
    }
  }

  onInputSearch() {
    if (!this.searchQuery || this.searchQuery === '') {
      this.getAllUserAppointmentsData();
    }
  }

  onSelectStatus() {
    this.getAllUserAppointmentsData();
  }

  saveUserReport() {
    const reportPayload = {
      report_id: null,
      appointment_id: Number(this.viewItem.app_id),
      user_id: Number(this.viewItem.user_id),
      date: moment().format('YYYY-MM-DD'),
      amount: this.amount,
      report: this.bills,
      issued_by: this.username,
      status: 1
    }
    console.log('Post payload to add/update user report data isss', reportPayload);

    this.beauticianService.addUpdateUserReport(reportPayload).subscribe((response: any) => {
      console.log('Get add/update user report data response isss', response);
      if (response.success) {
        this.toastr.successToastr(response.message);
        this.closeNav();
        this.getAllUserAppointmentsData();
      } else {
        this.toastr.errorToastr(response.message);
      }
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
    });
  }

}
