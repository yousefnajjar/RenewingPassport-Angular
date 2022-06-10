import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymantService } from 'src/app/Services/paymant.service';
import { ProfileService } from 'src/app/Services/profile.service';
import { WebsiteService } from 'src/app/Services/website.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private spinner: NgxSpinnerService,
    public profiles: ProfileService, public website: WebsiteService,public paymant:PaymantService) { }

    @Input() toggle: boolean=true;
    ngOnInit(): void {
    this.profiles.get()
    this.website.get()
    this.paymant.getSum()
  }


  // dashcontant(){
  //   this.router.navigate(['admin/dashboard']);
  // }

  manageTestimonial() {
    this.toggle = false;
    this.router.navigate(['admin/manage-testimonial']);

  }

  manageAnnaouncement() {
    this.toggle = false;
    this.router.navigate(['admin/manage-annaouncement']);
  }
  manageWebsite() {
    this.toggle = false;
    this.router.navigate(['admin/manage-website']);

  }

  managegallary() {
    this.toggle = false;
    this.router.navigate(['admin/manage-gallery']);

  }
  managecontact() {
    this.toggle = false;
    this.router.navigate(['admin/manage-contact']);

  }

  manageAbout() {
    this.toggle = false;
    this.router.navigate(['admin/manage-about']);
  }
  manageRole() {
    this.toggle = false;
    this.router.navigate(['admin/manage-role']);
  }
  managePassport() {
    this.toggle = false;
    this.router.navigate(['admin/manage-passport']);
  }
  manageUser() {
    this.toggle = false;
    this.router.navigate(['admin/manage-userlogin']);
  }
  logout() {
    this.router.navigate(['security/login'])
    localStorage.clear();
  }

  profile() {
    this.toggle = false;
    this.router.navigate(['admin/manage-profile']);
  }

  managereport(){
    this.toggle = false;
    this.router.navigate(['admin/manage-report']);
  }

  manageReview() {
    this.toggle = false;
    this.router.navigate(['admin/manage-review']);
  }
  managecountry(){
    this.toggle = false;
    this.router.navigate(['admin/manage-country']);
  }
  managePaymant(){
    this.toggle=false
    this.router.navigate(['admin/manage-paymant-Follow-up']);
  }
  
}
