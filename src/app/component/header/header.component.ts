import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
declare var $;
import * as firebase from 'firebase';
import { CrudService } from 'src/app/service/crud.service';
import { ListingService } from 'src/app/service/listing.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public recaptchaVerifier: firebase.default.auth.RecaptchaVerifier;
  allDistrict: any;
  state: { id: string; }[];
  selectedState: any;
  selectedDistrict: any;
  selectedHelpType: any;
  LoggedIn: boolean = false;
  mobile: string;
  isSubmitted = false;

  constructor(public fb: FormBuilder,private authService: AuthService, private crudService: CrudService, private listingService: ListingService, private afAuth: AngularFireAuth,private router:Router) { }
 
  ngOnInit(): void {
   

    $(document).ready(function () {

      // Check for click events on the navbar burger icon
      $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

      });
    });
    this.afAuth.authState.subscribe(data => {

      if (data.uid != null) {
        this.LoggedIn = true;
        this.mobile = data.phoneNumber
      }
    })

    this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        'size': 'invisible',

      }
    );
  }

  registrationForm = this.fb.group({
    states: ['', [Validators.required]],
    district: ['', [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required,Validators.email]],
    // mobileno: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
    mobileno: ['', [Validators.required]],
    detail: ['', [Validators.required]],
    type: ['', [Validators.required]],
  })

  get states() {
    return this.registrationForm.get('states');
  }
  get name() {
    return this.registrationForm.get('name');
  }
  get mobileno() {
    return this.registrationForm.get('mobileno');
  }
  get detail() {
    return this.registrationForm.get('detail');
  }
  get type() {
    return this.registrationForm.get('type');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get district() {
    return this.registrationForm.get('district');
  }
  lancuchLogin() {
    console.log('sds')
    // this.crudService.add();
    $("#modalShow2").addClass("is-active");
    $("#closeModal1").click(function () {
      $(".modal").removeClass("is-active");
    });
    this.getState()

  }
  lancuchForm() {
    // this.crudService.add();
    // $(".m1").addClass("is-active");
    this.afAuth.authState.subscribe(data => {
      
      if(data){
    $("#showModal").addClass("is-active");
    
    $("#closeModal").click(function () {
      $(".modal").removeClass("is-active");
    });
    this.getState()
  } else{
    this.lancuchLogin();

  }
})
  }

  sendOtp() {
    this.authService.sendOTP(this.recaptchaVerifier);
    $('#otpbtn').fadeOut();
   // $("#phoneNumber").addClass("is-loading");

    $('#enterotp').removeAttr('hidden');
    $('#phoneNumber').attr('disabled',true);

  }
  verifyOtp() {

    this.authService.verifyOTP();

  }
  Distict(dis) {
    this.crudService.getDistic(dis).subscribe(a => {
      console.log(a.data()['district'])
      this.allDistrict = a.data()['district'];
    })

  }
  getState() {
    this.crudService.getState().subscribe(a => {
      this.state = a.map(e => {
        return {
          id: e.payload.doc.id
        }
      })
    })
  }
  selecteState(e) {
    // console.log(e.target.value);
    this.selectedState = e.target.value;
    this.Distict(this.selectedState)
  }

  selecteDistrict(e) {

    this.selectedDistrict = e.target.value;


  }
  selecteHelpType(e) {
    this.selectedHelpType = e.target.value;

  }

  addRecord() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      alert("Select All the Details");
      return false;

    } else {
    this.afAuth.authState.subscribe(data => {
      
      if(data){
        console.log('je')
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var mobile = (<HTMLInputElement>document.getElementById("mob")).value;
    var detail = (<HTMLInputElement>document.getElementById("detail")).value;
    var time = Date.now();
    this.listingService.addListing(this.selectedState, this.selectedDistrict, name, email, mobile, detail, this.selectedHelpType, time,data.uid,data.phoneNumber);

  }else{
    this.lancuchLogin();

  }
})
    }
  }

  logout() {
    this.afAuth.signOut();

    //   this.ngxLoader.start()
    setTimeout(() => {
      //     this.ngxLoader.stop();
this.router.navigateByUrl('/')

      
    }, 1000);


  }
}
