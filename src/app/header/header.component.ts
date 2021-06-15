import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from '../api-services/auth-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

  constructor(
    public authUserService: AuthUserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.href = this.route.snapshot.routeConfig.path;
    console.log('current page type issss ==>', this.href); 
  }

  userLogout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  onClickView(view: any) {
    console.log('Selected view isss', view);
    if (view === 'profile') {
      this.router.navigate([`/${this.role}-profile`]);
    } else if (view === 'settings') {
      this.router.navigate([`/${this.role}-settings`]);
    }
  }

}
