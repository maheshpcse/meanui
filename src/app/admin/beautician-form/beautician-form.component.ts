import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { BeauticianService } from 'src/app/api-services/beautician.service';
import * as _ from 'underscore';
import * as moment from 'moment';
// import cryptoRandomString from 'crypto-random-string';
declare var $: any;

@Component({
  selector: 'app-beautician-form',
  templateUrl: './beautician-form.component.html',
  styleUrls: ['./beautician-form.component.css']
})
export class BeauticianFormComponent implements OnInit {

  public userId: any = sessionStorage.getItem('userid');
  public role: any = sessionStorage.getItem('role');

  fullName: any = null;
  userName: any = null;
  emailName: any = null;
  passWord: any = null;
  mobileNumber: any = null;
  profileImage: any = null;
  @ViewChild('beauticianForm', { static: false }) beauticianFormRef: NgForm;
  viewItem: any = {};
  public viewPage: any = 'table';
  public btnType: any = 'submit';

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
  beauticians: any = [];

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public beauticianService: BeauticianService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.getAllBeauticiansList();
  }

  onActionBack() {
    this.router.navigate(['/services']);
  }

  onClickView(view: any) {
    console.log('Selected view isss', view);
    this.viewPage = view;
    this.resetForm();
  }

  getAllBeauticiansList() {
    const beauticiansPayload = {
      limit: Number(this.limit),
      page: Number(this.page),
      query: this.searchQuery,
      status:
        !this.statusQuery || this.statusQuery === null
          ? "all"
          : Number(this.statusQuery)
    };
    console.log(
      "Post payload to get all beauticians data isss",
      beauticiansPayload
    );

    this.beauticianService.getAllBeauticiansList(beauticiansPayload).subscribe(
      (response: any) => {
        console.log("Get all beauticians response isss", response);
        if (response.success) {
          this.beauticians = response.data;
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
    this.getAllBeauticiansList();
  }

  createPager() {
    // this.pager.startCount = this.beauticians.length > 0 && Number(this.page) === 1 ? 1 : this.beauticians.length > 0 ? (Number(this.rowsOnPage) * Number(this.page - 1)) + 1 : 0;
    // this.pager.endCount = Number(this.rowsOnPage) === this.beauticians.length ? Number(this.rowsOnPage) * Number(this.page) : Number(this.count);
    // console.log(this.pager);

    // let endLimit: any =
    //   Math.round(this.count / this.limit) === 0
    //     ? Math.round(this.count / this.limit)
    //     : Math.round(this.count / this.limit) + 1;
    // endLimit = endLimit === 0 ? 1 : endLimit;
    // console.log("end limit isss", endLimit);
    
    let endLimit: any = 0;
    const totalNum = Number(this.count / this.limit);
    if (totalNum <= Math.round(Number(this.count / this.limit))) {
      endLimit = Math.round(totalNum);
    } else if (totalNum > Math.round(Number(this.count / this.limit))) {
      endLimit = Math.round(totalNum) + 1;
    }
    console.log('end limit isss', endLimit);
    this.totalPages = [];
    this.temptotalPages = [];
    this.totalPages.push('Prev');
    for (let num = 1; num <= Number(endLimit); num += 1) {
      this.totalPages.push(num);
      this.temptotalPages.push(num);
    }
    this.totalPages.push('Next');
    console.log('total pages isss', this.totalPages);
  }

  onSearchData() {
    // console.log('search request data isss', this.searchQuery);
    if (this.searchQuery || this.searchQuery !== "") {
      this.getAllBeauticiansList();
    }
  }

  onInputSearch() {
    if (!this.searchQuery || this.searchQuery === "") {
      this.getAllBeauticiansList();
    }
  }

  onSelectStatus() {
    this.getAllBeauticiansList();
  }

  onClickAction(item: any, id: any, config: any) {
    console.log('Selected item and id and config isss', item, id, config);
    this.viewItem = item;
    if (config === 'update') {
      this.viewPage = 'form';
      this.btnType = 'update';
      this.fullName = item.fullname;
      this.userName = item.username;
      this.emailName = item.email;
      this.passWord = item.password;
      this.mobileNumber = Number(item.mobile);
      this.profileImage = item.profile;
    }
  }

  generatePassword() {
    this.passWord = moment().format('YYYYMMDDHHMMss');
    console.log('generated password isss', this.passWord);
  }

  saveBeauticianData() {
    const beauticianPayload = {
      user_id: this.btnType === 'update' ? this.viewItem.user_id : null,
      fullname: this.fullName,
      username: this.userName,
      email: this.emailName,
      password: this.passWord,
      mobile: this.mobileNumber.toString(),
      profile: null,
      role: 'beautician',
      status: 1
    }
    console.log('Post payload to add/update beautician data isss', beauticianPayload);

    this.beauticianService.addBeautician(beauticianPayload).subscribe((response: any) => {
      console.log('Get add/update beautician data response isss', response);
      if (response.success) {
        this.toastr.successToastr(response.message);
        this.viewPage = 'table';
        this.resetForm();
      } else {
        this.toastr.errorToastr(response.message);
      }
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
    });
  }

  deleteRestoreBeautician() {
    const beauticianPayload = {
      user_id: Number(this.viewItem.user_id),
      status: Number(this.viewItem.status) === 1 ? 0 : 1
    }
    console.log('Post payload to delete/restore beautician data isss', beauticianPayload);

    this.beauticianService.deleteRestoreBeauticianById(beauticianPayload).subscribe((response: any) => {
      console.log('Get delete/restore beautician data response isss', response);
      if (response.success) {
        this.toastr.successToastr(response.message);
        $('#deleteRestore').modal('hide');
        this.viewPage = 'table';
        this.resetForm();
      } else {
        this.toastr.errorToastr(response.message);
      }
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
    });
  }

  resetForm() {
    if (this.beauticianFormRef) {
      this.beauticianFormRef.reset();
    }
    this.fullName = null;
    this.userName = null;
    this.emailName = null;
    this.passWord = null;
    this.mobileNumber = null;
    this.profileImage = null;
    this.btnType = 'submit';
    if (this.viewPage === 'table') {
      this.rowsOnPage = 10;
      this.limit = 10;
      this.page = 1;
      this.count = 0;
      this.pager = {};
      this.totalPages = [];
      this.temptotalPages = [];
      this.searchQuery = "";
      this.statusQuery = null;
      this.filterStatus = null;
      this.beauticians = [];
      this.getAllBeauticiansList();
    }
  }

}
