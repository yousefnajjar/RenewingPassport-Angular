import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizationGuard } from './authorization.guard';
import { AnnouncementsComponent } from './client/announcements/announcements.component';
import { ClientModule } from './client/client.module';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { PassportTemplateComponent } from './passport-template/passport-template.component';
import { RenewPassportServiceComponent } from './renew-passport-service/renew-passport-service.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserunauthorizComponent } from './userunauthoriz/userunauthoriz.component';
const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"about",
    component: AboutusComponent
  },
  {
    path:"announcements",
    component: AnnouncementsComponent
  },
  {
    path:"testimonial",
    component:TestimonialComponent
  },
  {
    path:"contact",
    component:ContactusComponent
  },
  {
     path:"security",
     loadChildren:()=>AuthModule
  },
  {
    path:"",
    component:HomeComponent,
    
  },
  {
    path:'client',
    loadChildren:()=>ClientModule

  },
  {
    path:"userunauthoriz",
    component:UserunauthorizComponent
  },
  {
    path:"renewing-passport-service",
    component:RenewPassportServiceComponent
  },
  {
    path:"userprofile",
    component:UserprofileComponent
  },
  {
    path:"passportTemplate",
    component:PassportTemplateComponent
  },


  {
    path:'admin',
    loadChildren:()=>AdminModule,
    canActivate:[AuthorizationGuard]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
