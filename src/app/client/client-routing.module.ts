import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsProfileComponent } from './announcements-profile/announcements-profile.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CountryCardComponent } from './country-card/country-card.component';
import { CountryProfileComponent } from './country-profile/country-profile.component';
import { CountryComponent } from './countrys/country.component';

const routes: Routes = [
{
  path:'announcements',
  component:AnnouncementsComponent
},
{
  path:'announcements-profile',
  component:AnnouncementsProfileComponent
},
{
  path:'countrys',
  component:CountryComponent
},
{
  path:'country-profile',
  component:CountryProfileComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
