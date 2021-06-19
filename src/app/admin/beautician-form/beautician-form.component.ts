import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  profileImage: File = null;
  age: any = null;
  experience: any = null;
  rating: any = null;
  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;
  @ViewChild('beauticianForm', { static: false }) beauticianFormRef: NgForm;
  viewItem: any = {};
  SUBSERVICES: any = [];
  public viewPage: any = 'table';
  public btnType: any = 'submit';
  currentIndex: any = null;
  spinner: any = false;

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

  servicesList: any = [];
  subSerivcesObj: any = {};
  subServicesList: any = [];
  selectedServices: any = [];
  servicesSettings: any = {};
  selectedSubServices: any = [];
  subServicesSettings: any = {};
  subSettings: any = [];
  allSubServices: any = [];
  selectAll: any = [];
  serviceIds: any = [];

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public beauticianService: BeauticianService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.spinner = true;
    this.getAllBeauticiansList();
    this.getAllBeautyServicesList();
    this.servicesSettings = {
      singleSelection: false,
      text: "Select Services :",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 2
    };
    this.subServicesSettings = {
      singleSelection: false,
      text: "Select Sub Services :",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 2,
      disabled: true
    };
  }

  getAllBeautyServicesList() {
    this.beauticianService.getAllBeautyServices().subscribe(
      (response: any) => {
        console.log("Get all beauty services response isss", response);
        if (response.success) {
          this.servicesList = response.data[0];
          this.subSerivcesObj = response.data[1];
          this.allSubServices = [];
          this.selectedSubServices = [];
          this.subSettings = [];
          this.selectAll = [];
          this.serviceIds = [];
          for (const item of Object.keys(this.subSerivcesObj)) {
            this.allSubServices.push(this.subSerivcesObj[item]);
            this.selectedSubServices.push([]);
            this.subSettings.push(this.subServicesSettings);
            this.selectAll.push(false);
            this.serviceIds.push(Number(item));
          }
          console.log('all sub services isss', this.allSubServices);
          if (this.viewPage === 'form' && this.btnType === 'update') {
            this.selectedSubServices = this.viewItem.subservices;
            let id: any = 0;
            for (const item of this.selectedSubServices) {
              this.selectAll[id] = item.length !== 0 ? true : false;
              this.subSettings[id] = {
                singleSelection: false,
                text: "Select Sub Services :",
                selectAllText: "Select All",
                unSelectAllText: "UnSelect All",
                enableSearchFilter: true,
                classes: "myclass custom-class",
                badgeShowLimit: 2,
                disabled: item.length !== 0 ? false : true
              };
              id += 1;
            }
          }
        } else {
          this.toastr.errorToastr(response.message);
        }
      },
      (error: any) => {
        this.toastr.errorToastr("Network failed, Please try again.");
      }
    );
  }

  onActionBack() {
    this.router.navigate(['/services']);
  }

  onClickView(view: any) {
    console.log('Selected view isss', view);
    this.viewPage = view;
    this.resetForm();
  }

  openNav(item?: any, index?: any) {
    this.viewItem = item;
    this.currentIndex = index + 1;
    document.getElementById("mySidenav").style.width = "500px";
    document.getElementById("main").style.marginRight = "250px";
  }

  closeNav() {
    this.viewItem = {};
    this.currentIndex = null;
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }

  getAllBeauticiansList() {
    this.spinner = true;
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
          setTimeout(() => {
            this.beauticians = response.data;
            this.count = response.count;
            this.createPager();
            this.spinner = false;
          }, 5000);
        } else {
          this.toastr.errorToastr(response.message);
        }
        // this.spinner = false;
      },
      (error: any) => {
        this.toastr.errorToastr("Network failed, Please try again.");
        this.spinner = false;
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
    const tempArr = [];
    for (const item of this.viewItem.subservices) {
      tempArr.push(_.pluck(item, 'sub_service_name'));
    }
    this.SUBSERVICES = _.flatten(tempArr);
    console.log('sub services isss', this.SUBSERVICES);
    if (config === 'update') {
      this.viewPage = 'form';
      this.btnType = 'update';
      this.fullName = item.fullname;
      this.userName = item.username;
      this.emailName = item.email;
      this.passWord = item.password;
      this.mobileNumber = Number(item.mobile);
      this.profileImage = item.profile;
      this.age = Number(item.age);
      this.experience = Number(item.experience);
      this.rating = item.rating.toString();
      this.getAllBeautyServicesList();
    } else if (config === 'view') {
      this.openNav(item, id);
    }
  }

  generatePassword() {
    this.passWord = moment().format('YYYYMMDDHHMMss');
    console.log('generated password isss', this.passWord);
  }

  selectedFile(event: any) {
    console.log('Selected file isss', event.target.files[0]);
    this.profileImage = <File>event.target.files[0];
  }

  onInputAction(item: any, id: any, event: any) {
    console.log('Selected event and item and id isss', event, item, id);
    this.selectAll[id] = event;
    console.log('selected checked isss', this.selectAll);
    this.subSettings[id] = {
      singleSelection: false,
      text: "Select Sub Services :",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 2,
      disabled: !event
    };
    if (event === false) {
      this.subSettings[id] = {
        singleSelection: false,
        text: "Select Sub Services :",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        enableSearchFilter: true,
        classes: "myclass custom-class",
        badgeShowLimit: 2,
        disabled: true
      };
      this.selectedSubServices[id] = [];
    }
  }

  onCollapseBody(item: any, id: any) {
    console.log('Selected item and index isss', item, id);
    this.currentIndex = Number(id);
  }

  // select and de-select services
  onSerivceSelect(item: any) {
    console.log(item);
    this.subServicesList = [];
    this.subServicesList = this.subSerivcesObj[item.id];
    console.log(this.selectedServices);
  }
  OnSerivceDeSelect(item: any) {
    console.log(item);
    this.subServicesList = [];
    console.log(this.selectedServices);
  }
  onSelectAllSerivce(items: any) {
    console.log(items);
  }
  onDeSelectAllSerivce(items: any) {
    console.log(items);
    this.subServicesList = [];
  }

  // select and de-select sub services
  onSubServiceSelect(item: any) {
    console.log(item);
    console.log(this.selectedSubServices);
  }
  OnSubServiceDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedSubServices);
  }
  onSelectAllSubService(items: any) {
    console.log(items);
  }
  onDeSelectAllSubService(items: any) {
    console.log(items);
  }

  saveBeauticianData() {
    let id: any = 0;
    const SERVICES = [];
    for (const item of this.selectedSubServices) {
      for (const data of item) {
        SERVICES.push(data.sub_service_id);
      }
      id += 1;
    }
    console.log('all SERVICES isss', SERVICES);
    const beauticianPayload = {
      users: {
        user_id: this.btnType === 'update' ? this.viewItem.user_id : null,
        fullname: this.fullName,
        username: this.userName,
        email: this.emailName,
        password: this.passWord,
        mobile: this.mobileNumber.toString(),
        profile: null,
        role: 'beautician',
        status: 1
      },
      workers: {
        worker_id: this.btnType === 'update' ? this.viewItem.worker_id : null,
        owner_id: null,
        beautician_id: null,
        name: this.fullName,
        age: Number(this.age),
        experience: Number(this.experience),
        services: SERVICES.join(','),
        rating: Number(this.rating),
        status: 1
      }
    }
    console.log('Post payload to add/update beautician data isss', beauticianPayload);
    const formData = new FormData();
    formData.append('user_id', beauticianPayload.users.user_id);
    formData.append('fullname', this.fullName);
    formData.append('username', this.userName);
    formData.append('email', this.emailName);
    formData.append('password', this.passWord);
    formData.append('mobile', this.mobileNumber.toString());
    formData.append('profile', null);
    formData.append('role', 'beautician');
    formData.append('status', '1');
    formData.append('file', this.profileImage, this.profileImage.name);
    console.log(formData.get('file'));
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

  setDisableModal() {
    if (!this.selectAll.includes(true)) {
      return true;
    } else {
      let count: any = 0;
      for (const item of this.selectedSubServices) {
        if (item.length === 0) {
          count += 1;
        }
      }
      if (count === this.selectedSubServices.length) {
        return true;
      } else {
        return false;
      }
    }
  }

  deleteRestoreBeautician() {
    const beauticianPayload = {
      user_id: Number(this.viewItem.user_id),
      worker_id: Number(this.viewItem.worker_id),
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
    this.age = null;
    this.experience = null;
    this.rating = null;
    this.btnType = 'submit';
    if (this.viewPage === 'form') {
      this.servicesList = [];
      this.subSerivcesObj = {};
      this.allSubServices = [];
      this.selectedSubServices = [];
      this.subSettings = [];
      this.selectAll = [];
      this.serviceIds = [];
      this.getAllBeautyServicesList();
    }
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
