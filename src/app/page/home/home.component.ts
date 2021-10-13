import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
declare var $;
declare var TypeIt;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  state: { id: string; }[];
  selectedState: any;
  distict: any;
  allDistrict: any;
  selectedDistrict: any;
  stateSelect:boolean=false;

  constructor(private crudService:CrudService,private router:Router,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.a('aaaabccaadeeee')
    new TypeIt("#element", {
      speed: 105,
      loop: true
    }) .type("Oxygen", {delay: 2000})
    .delete(null, {delay: 2000})
    .type("Bed", {delay: 2000})
    .delete(null, {delay: 2000})
    .type("Plasma", {delay: 2000})
    .delete(null, {delay: 2000})
    .type("Blood", {delay: 2000})
    .delete(null, {delay: 2000})
    .type("Medicine", {delay: 2000})
    .delete(null, {delay: 2000})
    .type("Ventilator", {delay: 2000})
  
    .go();;
    new TypeIt("#elementM", {
      speed: 105,
      loop: true
    }) .type("Oxygen", {delay: 2000})
    .delete(null, {delay: 2000})
    .type("Bed", {delay: 2000})
    .delete(null, {delay: 2000})
    .type("Plasma", {delay: 2000})
    .delete(null, {delay: 2000})
    .type("Blood", {delay: 2000})
    .delete(null, {delay: 2000})
    .type("Medicine", {delay: 2000})
    .delete(null, {delay: 2000})
    .type("Ventilator", {delay: 2000})
  
    .go();;


     this.httpClient.get('https://api.rootnet.in/covid19-in/stats/latest').subscribe((data: any[])=>{
      // console.log(data['data'].summary.total)
     });
     this.httpClient.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=805127&date=01-05-2021     ').subscribe((data: any[])=>{
       console.log(data)
     });

    
    this.getState()
  }

  lancuchLogin(){
   // this.crudService.add();
    $(".modal").addClass("is-active");

  }
  closemodal(){
        $(".modal").removeClass("is-active");

  }
Distict(dis){
  this.crudService.getDistic(dis).subscribe(a=>{
    console.log(a.data()['district'])
    this.allDistrict=a.data()['district'];
  })

}
  getState(){
    this.crudService.getState().subscribe(a=>{
      this.state= a.map(e=>{
        return{
          id:e.payload.doc.id
        }
      })
    })
  }
 
  selecteState(e){
   // console.log(e.target.value);
    this.selectedState=e.target.value;
    this.Distict(this.selectedState)
    this.stateSelect=true
  }

  selecteDistrict(e){

    this.selectedDistrict=e.target.value;


  }
  listing(){
if(this.stateSelect!=false){
  this.router.navigate(['/list'],{ queryParams: { state:this.selectedState,district:this.selectedDistrict}})

}else{
  alert("Atleast Select State")

}
  

  }
a(res){

console.log(res);
res.forEach(e => {
  console.log(e)
  
});





}

//   encode ("aaaabccaadeeee")
// [[4,a] [1,b] [2,c] [2,a] [1,d][4,e]]


}
