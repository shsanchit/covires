import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './page/about/about.component';
import { HomeComponent } from './page/home/home.component';
import { ListingComponent } from './page/listing/listing.component';

const routes: Routes = [

  { path: 'list', component: ListingComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent ,  pathMatch: 'full',},
  { path: "*",redirectTo:''},
  { path: "**",redirectTo:''}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
