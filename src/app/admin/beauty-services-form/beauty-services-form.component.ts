import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { BeauticianService } from 'src/app/api-services/beautician.service';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'app-beauty-services-form',
  templateUrl: './beauty-services-form.component.html',
  styleUrls: ['./beauty-services-form.component.css']
})
export class BeautyServicesFormComponent implements OnInit {

  serviceName: any = null;
  @ViewChild('beautyServiceForm', { static: false }) beautyServiceFormRef: NgForm;
  beautySubServiceForm: FormGroup;

  constructor(
    public router: Router,
    public authUserService: AuthUserService,
    public beauticianService: BeauticianService,
    public toastr: ToastrManager,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.beautySubServiceForm = this.fb.group({
      serivcesArr: this.fb.array([this.initForm()])
    });
  }

  onActionBack() {
    this.router.navigate(['/services']);
  }

  initForm() {
    return this.fb.group({
      subServiceName: new FormControl(null, [Validators.required]),
      subServiceAmount: new FormControl(null, [Validators.required])
    });
  }

  addForm(id: any) {
    const control = this.beautySubServiceForm.controls['serivcesArr'] as FormArray;
    control.push(this.initForm());
  }

  removeForm(id: any) {
    const control = this.beautySubServiceForm.controls['serivcesArr'] as FormArray;
    control.removeAt(id);
  }

  saveBeauticianData() {
    console.log(this.beautySubServiceForm);
    const subServices = [];
    for (const item of this.beautySubServiceForm.value['serivcesArr']){
      subServices.push({
        sub_service_id: null,
        main_service_id: null,
        sub_service_name: item.subServiceName,
        service_amount: item.subServiceAmount.toString(),
        status: 1
      });
    }
    const beautyServicePayload = {
      services: {
        main_service_id: null,
        service_name: this.serviceName,
        status: 1
      },
      subservices: subServices
    }
    console.log('Post payload to add beauty services data isss', beautyServicePayload);

    this.beauticianService.addBeautyServices(beautyServicePayload).subscribe((response: any) => {
      console.log('Get add beauty services data response isss', response);
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
    if (this.beautyServiceFormRef) {
      this.beautyServiceFormRef.reset();
    }
    this.serviceName = null;
    if (this.beautySubServiceForm) {
      this.beautySubServiceForm.reset();
    }
    this.initForm();
  }

}
