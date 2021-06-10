import { environment } from '../environments/environment';

export const APIURL = {
  // user authentication & authorization API URL's
  USER_LOGIN: environment.apiUrl + '/login',
  USER_SIGNUP: environment.apiUrl + '/signup',

  // user bookings API URL's
  GET_ALL_USER_BOOKINGS: environment.apiUrl + '/get_all_user_bookings',
  GET_ALL_USER_APPOINTMENTS: environment.apiUrl + '/get_all_user_appointments',
  GET_BOOKINGS_BY_BEAUTICIAN: environment.apiUrl + '/get_bookings_by_beautician',
  GET_BOOKINGS_BY_ID: environment.apiUrl + '/get_booking_by_id',
  UPDATE_BOOKING_STATUS_BY_ID: environment.apiUrl + '/update_booking_status_by_id',
  ADD_BOOKING: environment.apiUrl + '/add_booking',
  DELETE_BOOKING: environment.apiUrl + '/delete_booking',

  // user appointments API URL's
  ADD_APPOINTMENT: environment.apiUrl + '/add_appointment',
  UPDATE_APPOINTMENT: environment.apiUrl + '/update_appointment',
  DELETE_APPOINTMENT: environment.apiUrl + '/delete_appointment',

  // user reports API URL's
  GET_CHECKUP_DETAILS: environment.apiUrl + '/get_checkup_details',
  GET_ALL_USER_REPORTS_BY_ID: environment.apiUrl + '/get_all_user_reports_by_id',
  ADD_REPORT: environment.apiUrl + '/add_report',
  UPDATE_CHECKUP: environment.apiUrl + '/update_checkup',

  // beauticians API URL's
  GET_ALL_BEAUTY_PARLOURS: environment.apiUrl + '/get_all_beauty_parlours',
  GET_ALL_USERS: environment.apiUrl + '/get_all_users',

  // admin services API URL's
  GET_ALL_BEAUTICIANS: environment.apiUrl + '/get_all_beauticians',
  GET_ALL_BEAUTY_SERVICES: environment.apiUrl + '/get_all_beauty_services',
  ADD_BEAUTICIAN: environment.apiUrl + '/add_beautician',
  DELETE_RESTORE_BEAUTICIAN_BY_ID: environment.apiUrl + '/delete_restore_beautician',
  ADD_BEAUTY_PARLOUR: environment.apiUrl + '/add_beauty_parlour',
  ADD_BEAUTY_SERVICES: environment.apiUrl + '/add_beauty_services',
}