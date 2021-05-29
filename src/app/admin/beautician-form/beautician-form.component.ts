import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { BeauticianService } from 'src/app/api-services/beautician.service';
import * as _ from 'underscore';
import * as moment from 'moment';
// import cryptoRandomString from 'crypto-random-string';

@Component({
  selector: 'app-beautician-form',
  templateUrl: './beautician-form.component.html',
  styleUrls: ['./beautician-form.component.css']
})
export class BeauticianFormComponent implements OnInit {

  fullName: any = null;
  userName: any = null;
  emailName: any = null;
  passWord: any = null;
  mobileNumber: any = null;
  profileImage: any = null;
  @ViewChild('beauticianForm', { static: false }) beauticianFormRef: NgForm;

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

  generatePassword() {
    this.passWord = moment().format('YYYYMMDDHHMMss');
    console.log('generated password isss', this.passWord);
  }

  saveBeauticianData() {
    const beauticianPayload = {
      fullname: this.fullName,
      username: this.userName,
      email: this.emailName,
      password: this.passWord,
      mobile: this.mobileNumber.toString(),
      profile: null,
      role: 'beautician',
      status: 1
    }
    console.log('Post payload to add beautician data isss', beauticianPayload);

    this.beauticianService.addBeautician(beauticianPayload).subscribe((response: any) => {
      console.log('Get add beautician data response isss', response);
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
    if (this.beauticianFormRef) {
      this.beauticianFormRef.reset();
    }
    this.fullName = null;
    this.userName = null;
    this.emailName = null;
    this.passWord = null;
    this.mobileNumber = null;
    this.profileImage = null;
  }

}
