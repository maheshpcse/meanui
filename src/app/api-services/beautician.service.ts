import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../app-connection.service';

@Injectable({
  providedIn: 'root'
})
export class BeauticianService {

  constructor(private http: HttpClient) { }

  getAllBeauticians(data: any) {
    return this.http.post<any>(APIURL.GET_ALL_BEAUTICIANS, data);
  }

  addBooking(data: any) {
    return this.http.post<any>(APIURL.ADD_BOOKING, data);
  }

  addBeautician(data: any) {
    return this.http.post<any>(APIURL.ADD_BEAUTICIAN, data);
  }

  addBeautyParlour(data: any) {
    return this.http.post<any>(APIURL.ADD_BEAUTY_PARLOUR, data);
  }
}
