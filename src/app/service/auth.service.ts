import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
declare var $;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  otpSent: boolean;
  phoneNumber: string;
  ConfirmationResult: firebase.default.auth.ConfirmationResult;
  constructor( private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,public tost:ToastService) { }



  sendOTP(recaptchaVerifier) {
    //console.log("Opt Section")


    var Pnumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;

    this.afAuth.signInWithPhoneNumber('+91' + Pnumber, recaptchaVerifier).then((result) => {
      this.otpSent = true;
      this.phoneNumber = Pnumber;
      this.ConfirmationResult = result;
//console.log(result)
this.tost.toast("OTP Sent! Plz Wait..")

    }).catch(err => {

      alert(err);
    })
  }

  async verifyOTP() {


    var otp = (<HTMLInputElement>document.getElementById("otp")).value;
    // var email = (<HTMLInputElement>document.getElementById("email")).value;


    this.ConfirmationResult.confirm(otp).then((a) => {
      //this.router.navigateByUrl('/home')


      var user = this.afAuth.currentUser;
      this.tost.toast("Plz Wait..")

      // this.UpdateUser(a.user.uid,a.user.phoneNumber)
      /*  user.updateEmail(email).then(function() {
         // Update successful.
         alert("sucess");
      
       }).catch(function(error) {
         // An error happened.
       }); */
      //var user = firebase.auth().currentUser;



     // console.log(user)
        $("#modalShow2").removeClass("is-active");

    }).catch(err => {

      alert(err);

    })
  }
  Updateuser(usera) {
    var user = this.afAuth.currentUser;

  }
  async UpdateProfile() {
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    console.log(email)
    //  var city = (<HTMLInputElement>document.getElementById("city")).value;

    const profile = {

      email: email,
      displayName: name,
    }
    this.update((await this.afAuth.currentUser).uid, email, name)
    return (await this.afAuth.currentUser).updateProfile(profile);

  }
  update(uid, email, name) {
    return this.firestore
      .collection('Users').doc(uid)
      .set({ Email: email, Name: name }, { merge: true });
  }
}
