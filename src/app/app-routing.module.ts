import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './access/login/login.component';
import { SignupComponent } from './access/signup/signup.component';
import { AddFormsComponent } from './admin/add-forms/add-forms.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { BeauticianFormComponent } from './admin/beautician-form/beautician-form.component';
import { BeautyParlourFormComponent } from './admin/beauty-parlour-form/beauty-parlour-form.component';
import { BeautyServicesFormComponent } from './admin/beauty-services-form/beauty-services-form.component';
import { AuthGuardService } from './api-services/auth-guard.service';
import { BeauticianDashboardComponent } from './beautician-dashboard/beautician-dashboard.component';
import { BeauticianReportsComponent } from './beautician-reports/beautician-reports.component';
import { BeauticianUsersComponent } from './beautician-users/beautician-users.component';
import { BeauticianProfileComponent } from './beautician/beautician-profile/beautician-profile.component';
import { BeauticiansListComponent } from './beauticians-list/beauticians-list.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportsComponent } from './reports/reports.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  // USER routes
  {
    path: 'user-profile',
    canActivate: [AuthGuardService],
    component: UserProfileComponent
  },
  {
    path: 'user-dashboard',
    canActivate: [AuthGuardService],
    component: UserDashboardComponent
  },
  {
    path: 'beauticians',
    canActivate: [AuthGuardService],
    component: BeauticiansListComponent
  },
  {
    path: 'reports',
    canActivate: [AuthGuardService],
    component: ReportsComponent
  },
  // ADMIN routes
  {
    path: 'admin-profile',
    canActivate: [AuthGuardService],
    component: AdminProfileComponent
  },
  {
    path: 'admin-settings',
    canActivate: [AuthGuardService],
    component: AdminSettingsComponent
  },
  {
    path: 'admin-dashboard',
    canActivate: [AuthGuardService],
    component: AdminDashboardComponent
  },
  {
    path: 'services',
    canActivate: [AuthGuardService],
    component: AddFormsComponent
  },
  {
    path: 'add-beautician',
    canActivate: [AuthGuardService],
    component: BeauticianFormComponent
  },
  {
    path: 'add-beauty-parlour',
    canActivate: [AuthGuardService],
    component: BeautyParlourFormComponent
  },
  {
    path: 'add-beauty-services',
    canActivate: [AuthGuardService],
    component: BeautyServicesFormComponent
  },
  // BEAUTICIAN routes
  {
    path: 'beautician-profile',
    canActivate: [AuthGuardService],
    component: BeauticianProfileComponent
  },
  {
    path: 'beautician-dashboard',
    canActivate: [AuthGuardService],
    component: BeauticianDashboardComponent
  },
  {
    path: 'beautician-users',
    canActivate: [AuthGuardService],
    component: BeauticianUsersComponent
  },
  {
    path: 'beautician-reports',
    canActivate: [AuthGuardService],
    component: BeauticianReportsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
