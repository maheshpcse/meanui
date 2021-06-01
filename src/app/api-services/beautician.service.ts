import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../app-connection.service';

@Injectable({
  providedIn: 'root'
})
export class BeauticianService {

  constructor(private http: HttpClient) { }

  // user API services
  getAllBeauticians(data: any) {
    return this.http.post<any>(APIURL.GET_ALL_BEAUTICIANS, data);
  }

  addBooking(data: any) {
    return this.http.post<any>(APIURL.ADD_BOOKING, data);
  }

  // admin API services
  getAllUsers() {
    return this.http.get<any>(APIURL.GET_ALL_USERS);
  }

  getAllBeautyServices() {
    return this.http.get<any>(APIURL.GET_ALL_BEAUTY_SERVICES);
  }

  addBeautician(data: any) {
    return this.http.post<any>(APIURL.ADD_BEAUTICIAN, data);
  }

  addBeautyParlour(data: any) {
    return this.http.post<any>(APIURL.ADD_BEAUTY_PARLOUR, data);
  }

  // beautician API Services
  getAllUserBookings(data: any) {
    return this.http.post<any>(APIURL.GET_ALL_USER_BOOKINGS, data);
  }

  getAllUserAppointments(data: any) {
    return this.http.post<any>(APIURL.GET_ALL_USER_APPOINTMENTS, data);
  }

  updateBookingStatusById(id: any) {
    return this.http.post<any>(APIURL.UPDATE_BOOKING_STATUS_BY_ID, id);
  }

  addUpdateUserReport(data: any) {
    return this.http.post<any>(APIURL.ADD_REPORT, data);
  }
}
