import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { AuthUserService } from "src/app/api-services/auth-user.service";
import { BeauticianService } from "src/app/api-services/beautician.service";
import * as _ from "underscore";
import * as moment from "moment";

@Component({
  selector: "app-beauty-parlour-form",
  templateUrl: "./beauty-parlour-form.component.html",
  styleUrls: ["./beauty-parlour-form.component.css"],
})
export class BeautyParlourFormComponent implements OnInit {
  beauticianName: any = null;
  experience: any = null;
  parlourName: any = null;
  lawFirmName: any = null;
  parlourAddress: any = null;
  rating: any = null;
  service: any = null;
  subService: any = null;
  servicesList: any = [];
  subSerivcesObj: any = {};
  subServicesList: any = [];
  usersList: any = [];
  userId: any = null;
  @ViewChild("beautyParlourForm", { static: false })
  beautyParlourFormRef: NgForm;

  selectedServices: any = [];
  servicesSettings: any = {};
  selectedSubServices: any = [];
  subServicesSettings: any = {};
  subSettings: any = [];
  allSubServices: any = [];
  currentIndex: any = null;
  selectAll: any = [];

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public beauticianService: BeauticianService,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.getAllUsersList();
    this.getAllBeautyServicesList();
    this.servicesSettings = {
      singleSelection: false,
      text: "Select Services",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 2
    };
    this.subServicesSettings = {
      singleSelection: false,
      text: "Select Sub Services",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 2,
      disabled: true
    };
  }

  getAllUsersList() {
    this.beauticianService.getAllUsers().subscribe(
      (response: any) => {
        console.log("Get all users response isss", response);
        if (response.success) {
          this.usersList = response.data;
        } else {
          this.toastr.errorToastr(response.message);
        }
      },
      (error: any) => {
        this.toastr.errorToastr("Network failed, Please try again.");
      }
    );
  }

  getAllBeautyServicesList() {
    this.beauticianService.getAllBeautyServices().subscribe(
      (response: any) => {
        console.log("Get all beauty services response isss", response);
        if (response.success) {
          this.servicesList = response.data[0];
          this.subSerivcesObj = response.data[1];
          for (const item of Object.keys(this.subSerivcesObj)) {
            this.allSubServices.push(this.subSerivcesObj[item]);
            this.selectedSubServices.push([]);
            this.subSettings.push(this.subServicesSettings);
            this.selectAll.push(false);
          }
          console.log('all sub services isss', this.allSubServices);
        } else {
          this.toastr.errorToastr(response.message);
        }
      },
      (error: any) => {
        this.toastr.errorToastr("Network failed, Please try again.");
      }
    );
  }

  onInputAction(item: any, id: any, event: any) {
    console.log('Selected event and item and id isss', event, item, id);
    this.selectAll[id] = event;
    console.log('selected checked isss', this.selectAll);
    this.subSettings[id] = {
      singleSelection: false,
      text: "Select Sub Services",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 2,
      disabled: !event
    };
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
    this.subServicesList = [];
    console.log(items);
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

  onActionBack() {
    this.router.navigate(["/services"]);
  }

  saveBeautyParlourData() {
    const beautyParlourPayload = {
      owner_id: Number(this.userId),
      beautician_name: this.beauticianName,
      experience: Number(this.experience),
      parlour_name: this.parlourName,
      law_firm_name: this.lawFirmName,
      place: this.parlourAddress,
      rating: Number(this.rating),
      status: 1,
    };
    console.log(
      "Post payload to add beauty parlour data isss",
      beautyParlourPayload
    );

    this.beauticianService.addBeautyParlour(beautyParlourPayload).subscribe(
      (response: any) => {
        console.log("Get add beauty parlour data response isss", response);
        if (response.success) {
          this.toastr.successToastr(response.message);
          this.resetForm();
        } else {
          this.toastr.errorToastr(response.message);
        }
      },
      (error: any) => {
        this.toastr.errorToastr("Network failed, Please try again.");
      }
    );
  }

  resetForm() {
    if (this.beautyParlourFormRef) {
      this.beautyParlourFormRef.reset();
    }
    this.beauticianName = null;
    this.experience = null;
    this.parlourName = null;
    this.lawFirmName = null;
    this.parlourAddress = null;
    this.rating = null;
    this.userId = null;
  }
}
