import { Injectable } from '@angular/core';
declare var toastr
@Injectable({
  providedIn: 'root'
})
export class ToastService {
 
  constructor() { 
    
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    
  } }

  toast(a){
    toastr["success"](a)

  }
}
