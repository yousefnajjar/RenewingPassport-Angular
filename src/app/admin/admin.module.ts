import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardContantComponent } from './dashboard-contant/dashboard-contant.component';
import { ManageAnnaouncementComponent } from './manage-annaouncement/manage-annaouncement.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { SharedModule } from '../shared/shared.module';
import { ManageWebsiteComponent } from './manage-website/manage-website.component';
import { ManageGalleryComponent } from './manage-gallery/manage-gallery.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { ManageAboutComponent } from './manage-about/manage-about.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManagePassportComponent } from './manage-passport/manage-passport.component';
import { ManageUserloginComponent } from './manage-userlogin/manage-userlogin.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { ManageReviewComponent } from './manage-review/manage-review.component';
import { ManageReportComponent } from './manage-report/manage-report.component';
import { ManageCountryComponent } from './manage-country/manage-country.component';
import { PaymantFollowUpComponent } from './paymant-follow-up/paymant-follow-up.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardContantComponent,
    ManageAnnaouncementComponent,
    ManageTestimonialComponent,
    ManageWebsiteComponent,
    ManageGalleryComponent,
    ManageContactComponent,
    ManageAboutComponent,
    ManageRoleComponent,
    ManagePassportComponent,
    ManageUserloginComponent,
    ManageProfileComponent,
    ManageReviewComponent,
    ManageReportComponent,
    ManageCountryComponent,
    PaymantFollowUpComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    
  ]
})
export class AdminModule { }
