import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContantComponent } from './dashboard-contant/dashboard-contant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageAboutComponent } from './manage-about/manage-about.component';
import { ManageAnnaouncementComponent } from './manage-annaouncement/manage-annaouncement.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { ManageCountryComponent } from './manage-country/manage-country.component';
import { ManageGalleryComponent } from './manage-gallery/manage-gallery.component';
import { ManagePassportComponent } from './manage-passport/manage-passport.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { ManageReportComponent } from './manage-report/manage-report.component';
import { ManageReviewComponent } from './manage-review/manage-review.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ManageUserloginComponent } from './manage-userlogin/manage-userlogin.component';
import { ManageWebsiteComponent } from './manage-website/manage-website.component';
import { PaymantFollowUpComponent } from './paymant-follow-up/paymant-follow-up.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'',
    component:DashboardContantComponent
  },
  {
    path:'manage-testimonial',
    component:ManageTestimonialComponent
  },
  {
    path:'manage-annaouncement',
    component:ManageAnnaouncementComponent
  },
  {
    path:'manage-website',
    component:ManageWebsiteComponent
  },
  {
    path:'manage-gallery',
    component:ManageGalleryComponent
  },
  {
    path:'manage-contact',
    component:ManageContactComponent
  },
  {
    path:'manage-about',
    component:ManageAboutComponent
  },
  {
    path:'manage-role',
    component:ManageRoleComponent
  },
  {
    path:'manage-passport',
    component:ManagePassportComponent
  }
  ,
  {
    path:'manage-userlogin',
    component:ManageUserloginComponent
  },
  {
    path:'manage-profile',
    component:ManageProfileComponent
  },
  {
    path:'manage-review',
    component:ManageReviewComponent
  },
  {
    path:'manage-report',
    component:ManageReportComponent
  },
  {
    path:'manage-country',
    component:ManageCountryComponent
  },
  {
    path:'manage-paymant-Follow-up',
    component:PaymantFollowUpComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
