import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from '../api-services/auth-user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
import * as _ from 'underscore';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  navItems: any = [
    {name: 'Home', path: '/user-dashboard'},
    {name: 'Beauticians', path: '/beauticians'},
    {name: 'Reports', path: '/reports'},
    {name: 'Home', path: '/admin-dashboard'},
    {name: 'Services', path: '/services'},
    {name: 'Home', path: '/beautician-dashboard'},
    {name: 'Appointments', path: '/beautician-users'},
    {name: 'Reports', path: '/beautician-reports'},
    {name: 'Login', path: '/login'},
    {name: 'Signup', path: '/signup'},
    {name: 'Logout', path: '/login'}
  ];

  public href: any = '';
  public userid: any = sessionStorage.getItem('userid');
  public fullName: any = sessionStorage.getItem('fullname');
  public userName: any = sessionStorage.getItem('username');
  public role: any = sessionStorage.getItem('role');

  showTime: any = moment(moment().format('YYYY-MM-DD') + ' 00:01:00').format('mm:ss');
  seconds: any = moment(moment().format('YYYY-MM-DD') + ' 00:00:59').format('ss');
  openModal: any = null;
  showPopup: any = null;

  constructor(
    public authUserService: AuthUserService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.href = this.route.snapshot.routeConfig.path;
    console.log('current page type issss ==>', this.href);
    if (this.authUserService.isLoggedIn()) {
      console.log('session start time:', moment().format('hh:mm:ss'));
      this.openLogoutModal();
    }
  }

  onClickView(view: any) {
    console.log('Selected view isss', view);
    if (view === 'profile') {
      this.router.navigate([`/${this.role}-profile`]);
    } else if (view === 'settings') {
      this.router.navigate([`/${this.role}-settings`]);
    }
  }

  openLogoutModal() {
    console.log('seconds isss', this.seconds);
    if (this.authUserService.isLoggedIn()) {
      this.openModal = setTimeout(() => {
        $('#autoLogoutModal').modal('show');
        console.log('session end time:', moment().format('hh:mm:ss'));
        this.showPopup = setInterval(() => {
          this.seconds -= 1;
          this.showTime = moment(moment().format('YYYY-MM-DD') + ` 00:00:${this.seconds.toString().padStart(2, 0)}`).format('mm:ss');
          if (this.showTime === '00:00') {
            this.userLogout();
          }
        }, 1000);
      }, 1740000);
    }
  }

  userReLogIn() {
    const token = sessionStorage.getItem('token');
    const userTokenPayload = JSON.parse(atob(token.split('.')[1]));
    delete userTokenPayload.exp;
    delete userTokenPayload.iat;
    console.log('Post payload to user re-signin isss', userTokenPayload);
    this.authUserService.userReSignIn(userTokenPayload).subscribe((response: any) => {
      console.log('User login response isss', response);
      if (response.success) {
        sessionStorage.setItem('token', response.data.token);
        $('#autoLogoutModal').modal('hide');
        this.seconds = moment(moment().format('YYYY-MM-DD') + ' 00:00:59').format('ss');
        this.openLogoutModal();
      } else {
        this.toastr.errorToastr(response.message);
        $('#autoLogoutModal').modal('show');
      }
    }, (error: any) => {
      this.toastr.errorToastr('Network failed, Please try again.');
      $('#autoLogoutModal').modal('show');
    });
  }

  userLogout() {
    clearInterval(this.showPopup);
    clearTimeout(this.openModal);
    $('#autoLogoutModal').modal('hide');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    console.log('Header component is destroyed');
    clearInterval(this.showPopup);
    clearTimeout(this.openModal);
  }

}
