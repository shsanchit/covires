import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from './toast.service';
declare var $;

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private firestore:AngularFirestore,public tost:ToastService) { }

  readListing(dis,state){
return this.firestore.collection('listing', ref => ref.where('District', '==', dis).where('State', '==',state).orderBy('Time','desc')).snapshotChanges();
  }
  readListingByState(state){
return this.firestore.collection('listing', ref => ref.where('State', '==',state).orderBy('Time','desc')).snapshotChanges();
  }
  addListing(state,district,name,email,mobile,detail,type,time,uid,uidMobile){
    return this.firestore.collection('listing').add({
      State:state,
      District:district,
      Name:name,
      Email:email,
      Mobile:mobile,
      Detail:detail,
      Type:type,
      Time:time,
      UserId:uid,
      UserMobile:uidMobile

    }).then(()=>{
this.tost.toast("Your Information is Successfully Uploaded!")
    }).finally(()=>{
      $("#showModal").removeClass("is-active");

    });
  }


}
