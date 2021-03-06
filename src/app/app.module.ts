import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReportsComponent } from './reports/reports.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoginComponent } from './access/login/login.component';
import { SignupComponent } from './access/signup/signup.component';
import { AuthUserService } from './api-services/auth-user.service';
import { AuthGuardService } from './api-services/auth-guard.service';
import { AuthInterceptorService } from './api-services/auth-interceptor.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { BeauticianService } from './api-services/beautician.service';
import { BeauticianFormComponent } from './admin/beautician-form/beautician-form.component';
import { BeautyParlourFormComponent } from './admin/beauty-parlour-form/beauty-parlour-form.component';
import { AddFormsComponent } from './admin/add-forms/add-forms.component';
import { BeauticianDashboardComponent } from './beautician-dashboard/beautician-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BeauticiansListComponent } from './beauticians-list/beauticians-list.component';
import { BeauticianUsersComponent } from './beautician-users/beautician-users.component';
import { BeauticianReportsComponent } from './beautician-reports/beautician-reports.component';
import { BeautyServicesFormComponent } from './admin/beauty-services-form/beauty-services-form.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { BeauticianProfileComponent } from './beautician/beautician-profile/beautician-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { GamesListComponent } from './common-pages/games-list/games-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ReportsComponent,
    UserDashboardComponent,
    LoginComponent,
    SignupComponent,
    BeauticianFormComponent,
    BeautyParlourFormComponent,
    AddFormsComponent,
    BeauticianDashboardComponent,
    AdminDashboardComponent,
    NotFoundComponent,
    BeauticiansListComponent,
    BeauticianUsersComponent,
    BeauticianReportsComponent,
    BeautyServicesFormComponent,
    AdminProfileComponent,
    AdminSettingsComponent,
    UserProfileComponent,
    BeauticianProfileComponent,
    UserFormComponent,
    GamesListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    CalendarModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    AngularMultiSelectModule
  ],
  providers: [
    AuthUserService,
    AuthGuardService,
    BeauticianService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
