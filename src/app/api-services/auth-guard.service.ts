import { Injectable } from '@angular/core';
import { AuthUserService } from './auth-user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  userId: any = sessionStorage.getItem('userid');
  role: any = sessionStorage.getItem('role');

  constructor(
    private authUserService: AuthUserService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!this.authUserService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
