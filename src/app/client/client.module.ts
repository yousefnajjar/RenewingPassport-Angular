import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementsCardComponent } from './announcements-card/announcements-card.component';
import { AnnouncementsProfileComponent } from './announcements-profile/announcements-profile.component';
import { SharedModule } from '../shared/shared.module';
import { CountryComponent } from './countrys/country.component';
import { CountryCardComponent } from './country-card/country-card.component';
import { CountryProfileComponent } from './country-profile/country-profile.component';


@NgModule({
  declarations: [
    AnnouncementsComponent,
    AnnouncementsCardComponent,
    AnnouncementsProfileComponent,
    CountryComponent,
    CountryCardComponent,
    CountryProfileComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ],
  exports:[AnnouncementsCardComponent, CountryCardComponent]
})
export class ClientModule { }
