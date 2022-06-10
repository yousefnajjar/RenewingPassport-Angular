import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/Services/announcements.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ContactService } from 'src/app/Services/contact.service';
import { PassportService } from 'src/app/Services/passport.service';
import { ReviewService } from 'src/app/Services/review.service';
import { TestimonialService } from 'src/app/Services/testimonial.service';
import { WebsiteService } from 'src/app/Services/website.service';

@Component({
  selector: 'app-dashboard-contant',
  templateUrl: './dashboard-contant.component.html',
  styleUrls: ['./dashboard-contant.component.css']
})
export class DashboardContantComponent implements OnInit {


  constructor(
    public annaouncement: AnnouncementsService, public Contact: ContactService,
    public passport: PassportService, public testimonial: TestimonialService,
    public auth: AuthService, public review: ReviewService, public website:WebsiteService
  ) { }

  
  contactLength: any
  passportoveralllLength: any

  authLength: any
  reviewAvarage: number = 0
  ngOnInit(): void {
    this.Contact.get()
    this.passport.get()
    this.auth.get()
    this.review.getavrage()
    this.website.get()
    setTimeout(() => {
      this.contactLength = this.Contact.ContactData.length
      this.passportoveralllLength = this.passport.passportData.length
      this.authLength = this.auth.userData.length
      this.reviewAvarage = this.review.avragwData
    //  this.carc(this.review.reviewData)
    }, 2000);

  }

  // total = 0;
  
  // carc(arr:any) {
  //   for (var i = 0; i < this.review.reviewData.length; i++) {
  //     this.total += this.review.reviewData[i];
  //   }
  //   return this.total/this.review.reviewData.length
  // }



}
