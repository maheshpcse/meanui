import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../api-services/auth-user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  // Name
  // Last name
  // Roll number
  // Branch -  selection
  // Section - selection
  // Student or teacher - radio
  // Phone number
  // Address
  // Pic - validate name and entered roll number are same or not

  firstName: any = null;
  lastName: any = null;
  rollNumber: any = null;
  branchName: any = null;
  sectionName: any = null;
  personType: any = null;
  mobile: any = null;
  address: any = null;
  profile: File = null;
  @ViewChild('userForm', { static: false }) userFormRef: NgForm;
  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
  }

  onSelectFile(event: any) {
    console.log('selected file event isss', event);
    this.profile = event.target.files[0] as File;
  }

  saveUserDetails() {
    if (this.setDisableForm()) {
      return this.toastr.errorToastr('Profile is invalid.');
    }
    const formData = new FormData();
    formData.append('firstName', this.firstName);
    formData.append('lastName', this.lastName);
    formData.append('rollNumber', this.rollNumber);
    formData.append('branchName', this.branchName);
    formData.append('sectionName', this.sectionName);
    formData.append('personType', this.personType);
    formData.append('mobile', this.mobile);
    formData.append('address', this.address);
    formData.append('file', this.profile, this.profile.name);
    console.log('Post payload to user registration isss', formData.get('file'));

    this.authUserService.addNewUser(formData).subscribe((response: any) => {
      console.log('Get user registration response isss', response);
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

  setDisableForm() {
    if (this.profile && this.profile !== null) {
      if (Number(this.profile.name.split('.')[0]) !== Number(this.rollNumber)) {
        return true;
      }
    } else {
      return false;
    }
  }

  resetForm() {
    if (this.userFormRef) {
      this.userFormRef.reset();
    }
    this.firstName = null;
    this.lastName = null;
    this.rollNumber = null;
    this.branchName = null;
    this.sectionName = null;
    this.personType = null;
    this.mobile = null;
    this.address = null;
    this.profile = null;
    this.fileInputRef.nativeElement.value = null;
  }
}
