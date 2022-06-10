import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from './shared/shared.module';
import {HttpClientModule, HTTP_INTERCEPTORS}from  '@angular/common/http'
import { ClientModule } from './client/client.module';
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TokenInterceptor } from './Interceptor/token.interceptor';
import { UserunauthorizComponent } from './userunauthoriz/userunauthoriz.component';
import { RenewPassportServiceComponent } from './renew-passport-service/renew-passport-service.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PassportTemplateComponent } from './passport-template/passport-template.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    TestimonialComponent,
    UserunauthorizComponent,
    RenewPassportServiceComponent,
    UserprofileComponent,
    PassportTemplateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SharedModule,
    HttpClientModule,
    ClientModule,
    ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    
   
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true    
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
