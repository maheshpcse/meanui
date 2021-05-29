import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from '../api-services/auth-user.service';
import { BeauticianService } from '../api-services/beautician.service';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'app-beauticians-list',
  templateUrl: './beauticians-list.component.html',
  styleUrls: ['./beauticians-list.component.css']
})
export class BeauticiansListComponent implements OnInit {

  public userId: any = sessionStorage.getItem('userid');

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
  beauticians: any = [];

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public beauticianService: BeauticianService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      const start = i === 0 ? i * 3 : ((i + 1) * 3) - 3;
      const end = 3;
      const alphabits = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      const tempAlphabits = alphabits;
      const resultName = tempAlphabits.splice(start, end).join('');
      this.tempArray.push({
        name: resultName,
        exp: i
      });
    }
    this.getAllBeauticiansData();
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

  getAllBeauticiansData() {
    const beauticianPayload = {
      limit: Number(this.limit),
      page: Number(this.page),
      query: this.searchQuery,
      status: !this.statusQuery || this.statusQuery === null ? 'all' : Number(this.statusQuery)
    }
    console.log('Post payload to get all beauticians data isss', beauticianPayload);

    this.beauticianService.getAllBeauticians(beauticianPayload).subscribe((response: any) => {
      console.log('Get all beauticians response isss', response);
      if (response.success) {
        this.beauticians = response.data;
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
    this.getAllBeauticiansData();
  }

  createPager() {
    // this.pager.startCount = this.beauticians.length > 0 && Number(this.page) === 1 ? 1 : this.beauticians.length > 0 ? (Number(this.rowsOnPage) * Number(this.page - 1)) + 1 : 0;
    // this.pager.endCount = Number(this.rowsOnPage) === this.beauticians.length ? Number(this.rowsOnPage) * Number(this.page) : Number(this.count);
    // console.log(this.pager);

    let endLimit = Math.round(this.count/this.limit) === 0 ? Math.round(this.count/this.limit) : Math.round(this.count/this.limit) + 1;
    endLimit = endLimit === 0 ? 1 : endLimit;
    this.totalPages = [];
    for(let num = 1; num <= Number(endLimit); num += 1) {
      this.totalPages.push(num);
    }
    console.log('total pages isss', this.totalPages);
  }

  onSearchData() {
    // console.log('search request data isss', this.searchQuery);
    if (this.searchQuery || this.searchQuery !== '') {
      this.getAllBeauticiansData();
    }
  }

  onInputSearch() {
    if (!this.searchQuery || this.searchQuery === '') {
      this.getAllBeauticiansData();
    }
  }

  onSelectStatus() {
    this.getAllBeauticiansData();
  }

  addBookingData() {
    const bookingPayload = {
      booking_id: null,
      user_id: Number(this.userId),
      beautician_id: Number(this.viewItem.beautician_id),
      law_firm_name: this.viewItem.law_firm_name,
      date: moment(this.selectDate).format('YYYY-MM-DD'),
      time: moment(this.selectTime).format('HH:MM:ss'),
      booking_status: 1
    }
    console.log('Post payload to add booking data isss', bookingPayload);

    this.beauticianService.addBooking(bookingPayload).subscribe((response: any) => {
      console.log('Get add booking response isss', response);
      if (response.success) {
        this.toastr.successToastr(response.message);
        this.closeNav();
      } else {
        this.toastr.errorToastr(response.message);
      }
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
    });
  }

}
