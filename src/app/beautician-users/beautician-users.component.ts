import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from '../api-services/auth-user.service';
import { BeauticianService } from '../api-services/beautician.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-beautician-users',
  templateUrl: './beautician-users.component.html',
  styleUrls: ['./beautician-users.component.css']
})
export class BeauticianUsersComponent implements OnInit {

  public userId: any = sessionStorage.getItem('userid');
  public username: any = sessionStorage.getItem('username');
  public role: any = sessionStorage.getItem('role');

  tempArray: any = [];
  usersArray: any = [];
  viewItem: any = {};
  selectUser: any = {};
  selectStatus: any = null;
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
  pendingUsers: any = [];

  amount: any = null;
  bills: any = null;
  description: any = null;
  @ViewChild('reasonForm', { static: false }) reasonFormRef: NgForm;

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
    // for (let i = 6; i < 9; i++) {
    //   this.usersArray.push({
    //     username: `user ${i}`,
    //     appointment_date: `2021-05-0${i+1}`,
    //     appointment_time: `0${i+1}:00 AM`
    //   });
    // }
    this.getAllUserBookingsData();
  }

  openNav(item?: any, index?: any) {
    console.log('Selected item isss', item);
    this.viewItem = item;
    this.currentIndex = index + 1;
    // document.getElementById('mySidenav').style.width = '400px';
    // document.getElementById('main').style.marginRight = '250px';
  }

  closeNav() {
    this.viewItem = {};
    this.currentIndex = null;
    this.amount = null;
    this.bills = null;
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('main').style.marginRight = '0';
  }

  getAllUserBookingsData() {
    const userBookingsPayload = {
      limit: Number(this.limit),
      page: Number(this.page),
      query: this.searchQuery,
      status: !this.statusQuery || this.statusQuery === null ? 'all' : Number(this.statusQuery),
      user_id: Number(this.userId)
    }
    console.log('Post payload to get all users data isss', userBookingsPayload);

    this.beauticianService.getAllUserBookings(userBookingsPayload).subscribe((response: any) => {
      console.log('Get all users response isss', response);
      if (response.success) {
        this.usersList = _.filter(response.data, (e: any) => {
          return e.booking_status === 0 || e.booking_status === 1
        });
        this.pendingUsers = _.filter(response.data, (e: any) => {
          return e.booking_status === 2
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
    this.getAllUserBookingsData();
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
      this.getAllUserBookingsData();
    }
  }

  onInputSearch() {
    if (!this.searchQuery || this.searchQuery === '') {
      this.getAllUserBookingsData();
    }
  }

  onSelectStatus() {
    this.getAllUserBookingsData();
  }

  onSelectUser(item: any, value: any) {
    console.log('Select user isss', item);
    this.selectUser = item;
    this.selectStatus = Number(value);
  }

  addRejectUserAppointment() {
    const statusPayload = {
      booking_id: Number(this.selectUser.book_id),
      booking_status: Number(this.selectStatus),
      user_id: Number(this.selectUser.user_id),
      date: moment(this.selectUser.date).format('YYYY-MM-DD'),
      description: this.description,
      services: this.selectUser.services,
      amounts: this.selectUser.amounts,
      issued_by: this.username
    }
    console.log('Post payload to update user status isss', statusPayload);

    this.beauticianService.updateBookingStatusById(statusPayload).subscribe((response: any) => {
      console.log('Get update user status response isss', response);
      if (response.success) {
        this.toastr.successToastr(response.message);
        $('#confirmModal').modal('hide');
      } else {
        this.toastr.errorToastr(response.message);
        $('#confirmModal').modal('show');
      }
      this.getAllUserBookingsData();
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
    });
  }

  resetForm() {
    if (this.reasonFormRef) {
      this.reasonFormRef.reset();
    }
    this.description = null;
  }

}
