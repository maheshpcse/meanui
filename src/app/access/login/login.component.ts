import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userInput: any = null;
  password: any = null;
  @ViewChild('loginForm', { static: false }) loginFormRef: NgForm;

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
  }

  loginUser() {
    if (!this.userInput || !this.password) {
      return this.toastr.errorToastr('Please enter required fields.');
    }
    if (!this.userInput) {
      return this.toastr.errorToastr('Email is required.');
    }
    if (!this.password) {
      return this.toastr.errorToastr('Password is required.');
    }

    const userLoginPayload = {
      userinput: this.userInput,
      password: this.password
    }
    console.log('Post payload to user login isss', userLoginPayload);

    this.authUserService.userLogin(userLoginPayload).subscribe((response: any) => {
      console.log('User login response isss', response);
      if (response.success) {
        this.toastr.successToastr(response.message);
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userid', response.data.user_id);
        sessionStorage.setItem('fullname', response.data.fullname);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('email', response.data.email);
        sessionStorage.setItem('mobile', response.data.mobile);
        sessionStorage.setItem('profile', response.data.profile);
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem('status', response.data.status);
        sessionStorage.setItem('created_at', moment(response.data.created_at).format('YYYY-MM-DD HH:mm:ss'));
        sessionStorage.setItem('updated_at', moment(response.data.updated_at).format('YYYY-MM-DD HH:mm:ss'));
        if (response.data.role === 'user') {
          this.router.navigate(['/user-dashboard']);
        } else if (response.data.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (response.data.role === 'beautician') {
          this.router.navigate(['/beautician-dashboard']);
        }
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
    if (this.loginFormRef) {
      this.loginFormRef.reset();
    }
    this.userInput = null;
    this.password = null;
  }

}
