import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { AuthUserService } from "../api-services/auth-user.service";
import { BeauticianService } from "../api-services/beautician.service";
import * as _ from "underscore";
import * as moment from "moment";
declare var $: any;
@Component({
  selector: "app-beauticians-list",
  templateUrl: "./beauticians-list.component.html",
  styleUrls: ["./beauticians-list.component.css"],
})
export class BeauticiansListComponent implements OnInit {
  public userId: any = sessionStorage.getItem("userid");

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
  searchQuery: any = "";
  statusQuery: any = null;
  filterStatus: any = null;
  beautyParlours: any = [];

  service: any = null;
  subService: any = null;
  servicesList: any = [];
  subSerivcesObj: any = {};
  subServicesList: any = [];
  selectedServices: any = [];
  servicesSettings: any = {};
  selectedSubServices: any = [];
  subServicesSettings: any = {};
  subSettings: any = [];
  allSubServices: any = [];
  currentId: any = null;
  selectAll: any = [];

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public beauticianService: BeauticianService,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      const start = i === 0 ? i * 3 : (i + 1) * 3 - 3;
      const end = 3;
      const alphabits = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      const tempAlphabits = alphabits;
      const resultName = tempAlphabits.splice(start, end).join("");
      this.tempArray.push({
        name: resultName,
        exp: i,
      });
    }
    this.getAllBeautyParloursData();
    this.servicesSettings = {
      singleSelection: false,
      text: "Select Services :",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 2,
    };
    this.subServicesSettings = {
      singleSelection: false,
      text: "Select Sub Services :",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 2,
      disabled: true,
    };
  }

  openNav(item?: any, index?: any) {
    this.viewItem = item;
    this.currentIndex = index + 1;
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("main").style.marginRight = "250px";
  }

  closeNav() {
    this.viewItem = {};
    this.currentIndex = null;
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }

  getAllBeautyParloursData() {
    const beauticianPayload = {
      limit: Number(this.limit),
      page: Number(this.page),
      query: this.searchQuery,
      status:
        !this.statusQuery || this.statusQuery === null
          ? "all"
          : Number(this.statusQuery),
    };
    console.log(
      "Post payload to get all beauticians data isss",
      beauticianPayload
    );

    this.beauticianService.getAllBeautyParlours(beauticianPayload).subscribe(
      (response: any) => {
        console.log("Get all beauticians response isss", response);
        if (response.success) {
          this.beautyParlours = response.data;
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
    this.getAllBeautyParloursData();
  }

  createPager() {
    // this.pager.startCount = this.beautyParlours.length > 0 && Number(this.page) === 1 ? 1 : this.beautyParlours.length > 0 ? (Number(this.rowsOnPage) * Number(this.page - 1)) + 1 : 0;
    // this.pager.endCount = Number(this.rowsOnPage) === this.beautyParlours.length ? Number(this.rowsOnPage) * Number(this.page) : Number(this.count);
    // console.log(this.pager);

    let endLimit =
      Math.round(this.count / this.limit) === 0
        ? Math.round(this.count / this.limit)
        : Math.round(this.count / this.limit) + 1;
    endLimit = endLimit === 0 ? 1 : endLimit;
    console.log("end limit isss", endLimit);
    this.totalPages = [];
    for (let num = 1; num <= Number(endLimit); num += 1) {
      this.totalPages.push(num);
    }
    console.log("total pages isss", this.totalPages);
  }

  onActionBookSlot() {
    console.log("Selected item isss", this.viewItem);
    this.servicesList = Object.keys(this.viewItem.servicesList);
    this.subSerivcesObj = this.viewItem.servicesList;
    for (const item of Object.keys(this.subSerivcesObj)) {
      this.allSubServices.push(this.subSerivcesObj[item]);
      this.selectedSubServices.push([]);
      this.subSettings.push(this.subServicesSettings);
      this.selectAll.push(false);
    }
    console.log("all sub services isss", this.allSubServices);
  }

  onInputAction(item: any, id: any, event: any) {
    console.log("Selected event and item and id isss", event, item, id);
    this.selectAll[id] = event;
    console.log("selected checked isss", this.selectAll);
    this.subSettings[id] = {
      singleSelection: false,
      text: "Select Sub Services :",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 2,
      disabled: !event,
    };
  }

  onCollapseBody(item: any, id: any) {
    console.log("Selected item and index isss", item, id);
    this.currentId = Number(id);
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

  resetModal() {
    this.currentId = null;
    this.selectAll = [];
    this.servicesList = [];
    this.subServicesList = [];
    this.subSerivcesObj = {};
    this.allSubServices = [];
    this.selectedSubServices = [];
    this.subSettings = [];
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

  onSearchData() {
    // console.log('search request data isss', this.searchQuery);
    if (this.searchQuery || this.searchQuery !== "") {
      this.getAllBeautyParloursData();
    }
  }

  onInputSearch() {
    if (!this.searchQuery || this.searchQuery === "") {
      this.getAllBeautyParloursData();
    }
  }

  onSelectStatus() {
    this.getAllBeautyParloursData();
  }

  onInputEvent() {
    console.log(this.selectTime);
    console.log(moment(this.selectTime).format('LTS'));
  }

  addBookingData() {
    const SUBSERVICES: any = [];
    for (const item of this.selectedSubServices) {
      for (const data of item) {
        SUBSERVICES.push(data.sub_service_name);
      }
    }
    console.log('selected sub services isss', SUBSERVICES);
    const bookingPayload = {
      booking_id: null,
      user_id: Number(this.userId),
      beautician_id: Number(this.viewItem.beautician_id),
      owner_id: Number(this.viewItem.owner_id),
      law_firm_name: this.viewItem.law_firm_name,
      services: SUBSERVICES.join(','),
      date: moment(this.selectDate).format("YYYY-MM-DD"),
      time: moment(this.selectTime).format("HH:MM:ss"),
      booking_status: 2,
      users_limit: Number(this.viewItem.users_limit)
    };
    console.log("Post payload to add booking data isss", bookingPayload);
    
    this.beauticianService.addBooking(bookingPayload).subscribe(
      (response: any) => {
        console.log("Get add booking response isss", response);
        if (response.success) {
          this.toastr.successToastr(response.message);
          $('#bookAppModal').modal('hide');
          this.closeNav();
          this.resetModal();
          this.resetForm();
        } else {
          this.toastr.errorToastr(response.message);
          $('#bookAppModal').modal('show');
        }
      },
      (error: any) => {
        this.toastr.errorToastr("Network failed, Please try again.");
      }
    );
  }

  resetForm() {
    this.selectDate = null;
    this.selectTime = null;
  }
}
