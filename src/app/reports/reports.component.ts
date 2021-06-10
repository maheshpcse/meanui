import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { AuthUserService } from "../api-services/auth-user.service";
import { BeauticianService } from "../api-services/beautician.service";
import * as _ from "underscore";
import * as moment from "moment";
declare var $: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public userId: any = sessionStorage.getItem('userid');
  public role: any = sessionStorage.getItem('role');

  tempArray: any = [
    {booking_id: 'W269N-WFGWX-YVC9B', beautician: 'ABC', date: '10-02-2021'},
    {booking_id: 'MH37W-N47XK-V7XM9', beautician: 'DEF', date: '15-02-2021'},
    {booking_id: 'F34E-RST1-OPQS', beautician: 'GHI', date: '25-02-2021'},
    {booking_id: 'NPPR9-FWDCX-D2C8J', beautician: 'JKM', date: '05-03-2021'},
    {booking_id: 'DPH2V-TTNVB-4X9Q3', beautician: 'NOP', date: '10-03-2021'}
  ];
  viewItem: any = {};
  services: any = [];
  currentIndex: any = null;

  rowsOnPage: any = 10;
  limit: any = 10;
  page: any = 1;
  count: any = 0;
  pager: any = {};
  totalPages: any = [];
  temptotalPages: any = [];
  searchQuery: any = "";
  statusQuery: any = null;
  filterStatus: any = null;
  reports: any = [];

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public beauticianService: BeauticianService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.getAllUserReports();
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
    this.services = [];
    const tempArr = item.services.split(',');
    for (const item of tempArr) {
      this.services.push({
        name: item,
        amount: ''
      });
    }
  }

  getAllUserReports() {
    const userReportsPayload = {
      limit: Number(this.limit),
      page: Number(this.page),
      query: this.searchQuery,
      status:
        !this.statusQuery || this.statusQuery === null
          ? "all"
          : Number(this.statusQuery),
      user_id: Number(this.userId)
    };
    console.log(
      "Post payload to get all user reports data isss",
      userReportsPayload
    );

    this.beauticianService.getAllUserReportsById(userReportsPayload).subscribe(
      (response: any) => {
        console.log("Get all user reports by id response isss", response);
        if (response.success) {
          this.reports = response.data;
          this.count = response.count;
          this.createPager();
        } else {
          this.toastr.errorToastr(response.message);
        }
      },
      (error: any) => {
        this.toastr.errorToastr("Network failed, Please try again.");
      }
    );
  }

  getPage(event: any) {
    console.log("Selected page isss", event);
    this.page = Number(event);
    this.getAllUserReports();
  }

  createPager() {
    // this.pager.startCount = this.beauticians.length > 0 && Number(this.page) === 1 ? 1 : this.beauticians.length > 0 ? (Number(this.rowsOnPage) * Number(this.page - 1)) + 1 : 0;
    // this.pager.endCount = Number(this.rowsOnPage) === this.beauticians.length ? Number(this.rowsOnPage) * Number(this.page) : Number(this.count);
    // console.log(this.pager);

    let endLimit =
      Math.round(this.count / this.limit) === 0
        ? Math.round(this.count / this.limit)
        : Math.round(this.count / this.limit) + 1;
    endLimit = endLimit === 0 ? 1 : endLimit;
    console.log("end limit isss", endLimit);
    this.totalPages = [];
    this.temptotalPages = [];
    this.totalPages.push('Prev');
    for (let num = 1; num <= Number(endLimit); num += 1) {
      this.totalPages.push(num);
      this.temptotalPages.push(num);
    }
    this.totalPages.push('Next');
    console.log("total pages isss", this.totalPages);
  }

  onSearchData() {
    // console.log('search request data isss', this.searchQuery);
    if (this.searchQuery || this.searchQuery !== "") {
      this.getAllUserReports();
    }
  }

  onInputSearch() {
    if (!this.searchQuery || this.searchQuery === "") {
      this.getAllUserReports();
    }
  }

  onSelectStatus() {
    this.getAllUserReports();
  }

}
