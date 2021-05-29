import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { BeauticianService } from 'src/app/api-services/beautician.service';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'app-beauty-parlour-form',
  templateUrl: './beauty-parlour-form.component.html',
  styleUrls: ['./beauty-parlour-form.component.css']
})
export class BeautyParlourFormComponent implements OnInit {

  beauticianName: any = null;
  experience: any = null;
  parlourName: any = null;
  lawFirmName: any = null;
  parlourAddress: any = null;
  rating: any = null;
  @ViewChild('beautyParlourForm', { static: false }) beautyParlourFormRef: NgForm;

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public beauticianService: BeauticianService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
  }

  onActionBack() {
    this.router.navigate(['/services']);
  }

  saveBeautyParlourData() {
    const beautyParlourPayload = {
      beautician_name: this.beauticianName,
      experience: Number(this.experience),
      parlour_name: this.parlourName,
      law_firm_name: this.lawFirmName,
      place: this.parlourAddress,
      rating: Number(this.rating),
      status: 1
    }
    console.log('Post payload to add beauty parlour data isss', beautyParlourPayload);

    this.beauticianService.addBeautyParlour(beautyParlourPayload).subscribe((response: any) => {
      console.log('Get add beauty parlour data response isss', response);
      if (response.success) {
        this.toastr.successToastr(response.message);
        this.resetForm();
      } else {
        this.toastr.errorToastr(response.message);
      }
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
    });
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
  }

}
