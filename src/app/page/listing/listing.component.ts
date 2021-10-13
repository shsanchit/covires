import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from 'src/app/service/listing.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  state: any;
  district: any;
  lisiting: { id: string; name: any; district: any; state: any; Mobile: any; Email: any; Type: any; Detail: any; Time:any; }[];
  listLen: number;

  constructor(private route: ActivatedRoute,private listingService:ListingService,private router:Router) {}
  ngOnInit() {
      // Capture the token  if available s

      this.state = this.route.snapshot.queryParams['state']
      this.district = this.route.snapshot.queryParams['district']
      console.log(this.route.snapshot.queryParams['state'])
      this.listByDistic()
  }
listByDistic(){

  if(this.district!=null){  
    console.log('ds')
this.listingService.readListing(this.district,this.state).subscribe(a=>{
  this.listLen=a.length

  this.lisiting = a.map(e=>{
    return{
      id:e.payload.doc.id,
      name:e.payload.doc.data()['Name'],
      district:e.payload.doc.data()['District'],
      state:e.payload.doc.data()['State'],
      Mobile:e.payload.doc.data()['Mobile'],
      Email:e.payload.doc.data()['Email'],
      Type:e.payload.doc.data()['Type'],
      Detail:e.payload.doc.data()['Detail'],
      Time:e.payload.doc.data()['Time'],
      
    }

  })
})
}else{
  console.log('else')
  this.listingService.readListingByState(this.state).subscribe(a=>{
    this.listLen=a.length
  
    this.lisiting = a.map(e=>{
      return{
        id:e.payload.doc.id,
        name:e.payload.doc.data()['Name'],
        district:e.payload.doc.data()['District'],
        state:e.payload.doc.data()['State'],
        Mobile:e.payload.doc.data()['Mobile'],
        Email:e.payload.doc.data()['Email'],
        Type:e.payload.doc.data()['Type'],
        Detail:e.payload.doc.data()['Detail'],
        Time:e.payload.doc.data()['Time'],
        
      }
  
    })
  })
}
}
whatsapp(mobile){
  window.location.href = 'https://wa.me/'+'+91'+mobile+'/?text=Hello,',
  '_blank' 
}
call(mobile){
  window.location.href = 'tel://' + '+91'+mobile,
  '_blank' ;
}
}
