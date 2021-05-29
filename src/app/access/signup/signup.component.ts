import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  fullName: any = null;
  email: any = null;
  username: any = null;
  mobileNumber: any = null;
  password: any = null;
  confirmPassword: any = null;
  @ViewChild('signupForm', { static: false }) signupFormRef: NgForm;

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
  }

  signupUser() {
    if (!this.fullName && !this.email && !this.username && !this.mobileNumber && !this.password && !this.confirmPassword) {
      return this.toastr.errorToastr('Required fields are empty.');
    }
    if (!this.fullName) {
      return this.toastr.errorToastr('Fullname is required.');
    }
    if (!this.email) {
      return this.toastr.errorToastr('Email is required.');
    }
    if (!this.username) {
      return this.toastr.errorToastr('Username is required.');
    }
    if (!this.mobileNumber) {
      return this.toastr.errorToastr('Mobile Number is required.');
    }
    if (!this.password) {
      return this.toastr.errorToastr('Password is required.');
    }
    if (!this.confirmPassword) {
      return this.toastr.errorToastr('Confirm Password is required.');
    }
    if (this.password !== this.confirmPassword) {
      return this.toastr.errorToastr('Passwords are not matched.');
    }

    const userSignupPayload = {
      fullname: this.fullName,
      email: this.email,
      username: this.username,
      mobile: this.mobileNumber.toString(),
      password: this.password,
      profile: null,
      role: 'user',
      status: 1
    }
    console.log('Post payload to user login isss', userSignupPayload);

    this.authUserService.userSignup(userSignupPayload).subscribe((response: any) => {
      console.log('User signup response isss', response);
      if (response.success) {
        this.toastr.successToastr(response.message);
        this.router.navigate(['/login']);
        this.resetForm();
      } else {
        this.toastr.errorToastr(response.message);
        this.resetForm();
      }
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
      this.resetForm();
    });
  }

  resetForm() {
    if (this.signupFormRef) {
      this.signupFormRef.reset();
    }
    this.fullName = null;
    this.email = null;
    this.username = null;
    this.mobileNumber = null;
    this.password = null;
    this.confirmPassword = null;
  }

}
