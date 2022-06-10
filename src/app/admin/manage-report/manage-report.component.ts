import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/Services/announcements.service';
import { AuthService } from 'src/app/Services/auth.service';
import { ContactService } from 'src/app/Services/contact.service';
import { PassportService } from 'src/app/Services/passport.service';
import { ReviewService } from 'src/app/Services/review.service';
import { TestimonialService } from 'src/app/Services/testimonial.service';
import { WebsiteService } from 'src/app/Services/website.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.css']
})
export class ManageReportComponent implements OnInit {

  constructor(public annaouncement: AnnouncementsService, public Contact: ContactService,
    public passport: PassportService, public testimonial: TestimonialService,
    public auth: AuthService, public review: ReviewService, public website: WebsiteService) { }

  annaouncementLength: any
  contactLength: any
  passportPindingLength: any
  passportoveralllLength: any
  testimonialLength: any
  authLength: any
  reviewAvarage: number = 0
  ngOnInit(): void {
    this.annaouncement.getAllAnnouncement()
    this.Contact.get()
    this.passport.get()
    this.passport.getnull()
    this.testimonial.getAllTestimonial()
    this.auth.get()
    this.review.get()
    this.website.get()
    setTimeout(() => {
      this.annaouncementLength = this.annaouncement.announcementsData.length
      this.contactLength = this.Contact.ContactData.length
      this.passportPindingLength = this.passport.passportpindingData.length
      this.passportoveralllLength = this.passport.passportData.length
      this.testimonialLength = this.testimonial.testimonialData.length
      this.authLength = this.auth.userData.length
      this.reviewAvarage = this.review.reviewData.length
    }, 2000);
  }


  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 210;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Report.pdf');
      
    });
  }



  DateForm :FormGroup =new FormGroup({
    startDate:new FormControl(),
    endDate:new FormControl()   
  })

  getdate(){
    this.passport.getByDate(this.DateForm.value)
  }

  refresh(){
    window.location.reload()
  }

}
